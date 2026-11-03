<?php
/**
 * contact.php — receives the website's enquiry forms and emails them to the company.
 * Lives at  https://www.ecotreelogics.com/api/contact.php  (copied from /public/api by `npm run build`).
 *
 * Works on Hostinger shared / Business / Cloud hosting (PHP 8+). No database needed.
 *
 * SET UP (once):
 *   1. In Hostinger hPanel → Emails, create a mailbox on your domain, e.g. website@ecotreelogics.com
 *      (mail "From" a Gmail address is usually rejected — it must be your own domain).
 *   2. Put that address in FROM_EMAIL below.
 *   3. Submit a test enquiry from the live site and check the inbox (and spam folder).
 *
 * Security: JSON only, POST only, same-site origin check, honeypot, minimum fill time,
 * simple per-IP rate limit (5 per 10 minutes), header-injection-safe, all output escaped.
 */

const TO_EMAIL   = 'ecotreelogicsprivatelimited@gmail.com';
const FROM_EMAIL = 'website@ecotreelogics.com';   // ← must be a mailbox on YOUR domain
const SITE_HOSTS = ['ecotreelogics.com', 'www.ecotreelogics.com', 'localhost'];
const RATE_LIMIT = 5;      // max submissions …
const RATE_WINDOW = 600;   // … per IP per 10 minutes
const MIN_FILL_MS = 3000;  // humans take longer than 3 s to fill a form

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// same-site check (blocks other websites posting into your form)
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST) ?: '';
    if (!in_array($host, SITE_HOSTS, true)) {
        respond(403, ['ok' => false, 'error' => 'Forbidden origin']);
    }
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}

// spam checks — pretend success to bots so they do not retry, but send nothing
if (!empty($data['website']) || (int)($data['elapsed'] ?? 0) < MIN_FILL_MS) {
    respond(200, ['ok' => true]);
}

// rate limit per IP (stored in the server temp folder)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/etl_rl_' . md5($ip);
$hits = array_filter(
    json_decode(@file_get_contents($bucket) ?: '[]', true) ?: [],
    fn($t) => $t > time() - RATE_WINDOW
);
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'Too many messages — please try again in a few minutes']);
}

// clean + validate
$clean = function ($v, $max = 200) {
    $v = trim((string)$v);
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);     // no header injection
    return mb_substr($v, 0, $max);
};
$name    = $clean($data['name'] ?? '', 120);
$email   = filter_var(trim((string)($data['email'] ?? '')), FILTER_VALIDATE_EMAIL) ?: '';
$phone   = $clean($data['phone'] ?? '', 30);
$org     = $clean($data['organisation'] ?? '', 160);
$orgType = $clean($data['orgType'] ?? '', 80);
$type    = $clean($data['enquiryType'] ?? 'General enquiry', 60);
$subject = $clean($data['subject'] ?? '', 160);
$loc     = $clean($data['location'] ?? '', 200);
$page    = $clean($data['page'] ?? '', 200);
$message = mb_substr(trim((string)($data['message'] ?? '')), 0, 5000);

if ($name === '' || $email === '' || mb_strlen($message) < 10 || empty($data['consent'])) {
    respond(422, ['ok' => false, 'error' => 'Please complete the required fields']);
}

$body = "New enquiry from the EcoTree Logics website\n"
      . "--------------------------------------------\n"
      . "Type:          $type\n"
      . "Subject:       $subject\n"
      . "Name:          $name\n"
      . "Email:         $email\n"
      . "Phone:         $phone\n"
      . "Organisation:  $org\n"
      . "Organisation type: $orgType\n"
      . ($loc !== '' ? "Site location: $loc\n" : '')
      . "Sent from page: $page\n\n"
      . "Message:\n$message\n";

$headers = [
    'From: EcoTree Logics Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,   // only the validated address — never free text in a header
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
$mailSubject = '=?UTF-8?B?' . base64_encode("Website $type" . ($subject ? ": $subject" : '') . " — $name") . '?=';

$sent = @mail(TO_EMAIL, $mailSubject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (!$sent) {
    respond(502, ['ok' => false, 'error' => 'Mail server did not accept the message']);
}

$hits[] = time();
@file_put_contents($bucket, json_encode(array_values($hits)));
respond(200, ['ok' => true]);
