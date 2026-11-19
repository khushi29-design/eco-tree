# EcoTree Logics — Website

**EcoTree Logics Private Limited** · *Ecological Intelligence. Practical Restoration. Lasting Impact.*

A multi-page corporate website with a cinematic, scroll-driven homepage, built with the Scroll Site Generator approach:

- a full-screen cinematic brand-film hero
- real drone footage that "plays" as you scroll
- an interactive ridge-to-valley water model
- 18 content pages, 25 product pages, galleries and the EcoBot chatbot

The site is built as plain static files (HTML, CSS and JS). The same code runs in three places with no edits:

- **on your computer:** double-click `Open Website.bat`
- **on Hostinger:** any plan, at the domain root
- **on GitHub Pages:** free, at `https://<username>.github.io/<repo-name>/`

---

## Contents
1. [What's inside](#1-whats-inside)
2. [Install and run on your computer](#2-install-and-run-on-your-computer)
3. [Where to edit things](#3-where-to-edit-things)
4. [Add images, videos and products](#4-add-images-videos-and-products)
5. [SEO, Google Analytics and Search Console](#5-seo-google-analytics-and-search-console)
6. [EcoBot chatbot](#6-ecobot-chatbot)
7. [Enquiry forms](#7-enquiry-forms)
8. [GitHub workflow in VS Code](#8-github-workflow-in-vs-code)
9. [Deploy to Hostinger](#9-deploy-to-hostinger)
10. [Publish on GitHub Pages](#10-publish-on-github-pages)
11. [Items to supply or confirm](#11-items-to-supply-or-confirm)

---

## 1. What's inside

| Page | Address |
|---|---|
| Home (brand-film hero + scroll film) | `/` |
| About Us | `/about/` |
| Our Capabilities | `/capabilities/` |
| 8 capability pages (one shared template) | `/capabilities/restoration-afforestation/`, `/conservation-engineering-water/`, `/biodiversity-habitats/`, `/nature-education-interpretation/`, `/carbon-sustainability-consultancy/`, `/digital-technology/`, `/nature-experiences-learning-play/`, `/field-equipment-eco-products/` |
| Products Catalogue (search + filters) | `/products/` and 25 product pages `/products/<item>/` |
| Projects | `/projects/` |
| Project Nisargavedh | `/projects/nisargavedh/` |
| RET Conservation Park | `/projects/ret-conservation-park/` |
| Our Impact | `/impact/` |
| Gallery (photos + videos) | `/gallery/` |
| Contact Us (4 enquiry types) | `/contact/` |

**Folder structure**

```
ecotree-logics/
├── public/                  files served as-is
│   ├── images/              logo/ forest/ projects/ products/ gallery/ og/   (optimised WebP)
│   ├── videos/              compressed drone videos + poster images
│   ├── frames/              scroll-film frames (restore/, evidence/)
│   ├── favicon/  favicon.ico  site.webmanifest
│   ├── api/contact.php      form handler (runs on Hostinger)
│   └── .htaccess            HTTPS, clean URLs, caching, 404 (Hostinger)
├── src/
│   ├── pages/               one file per page (Next.js routes)
│   ├── sections/            big page blocks (hero, film chapters, galleries…)
│   ├── components/          small reusable parts (header, footer, form, counters…)
│   ├── animations/          frame scrubber, smooth scroll, reveal hooks
│   ├── chatbot/             EcoBot: EcoBot.jsx (look) · engine.js (logic) · knowledge.js (answers)
│   ├── data/                ALL WORDS, NUMBERS, PRODUCTS, MEDIA  ← edit here
│   ├── styles/              tokens.css (colours/fonts) · globals.css · components.css · home.css
│   └── utils/               schema.js (Google structured data) · links.js (WhatsApp/email)
├── scripts/
│   ├── prepare-media.py     turns raw photos/videos into web files and scroll frames
│   └── generate-sitemap.mjs writes sitemap.xml + robots.txt after each build
├── .github/workflows/
│   ├── deploy-hostinger.yml      automatic upload to Hostinger (skips until FTP secrets are added)
│   └── deploy-github-pages.yml   automatic publish to GitHub Pages
├── Open Website.bat         double-click to build and open the site locally (Windows)
├── .env.example  .gitignore  package.json  next.config.mjs
```

**Stack:** Next.js 15 (static export), React 19, GSAP + ScrollTrigger, Lenis, and plain CSS. Fonts (Fraunces and Manrope) are self-hosted, so the site makes no Google Fonts calls.

---

## 2. Install and run on your computer

You need **Node.js 20 or newer** (from nodejs.org, LTS) installed once.

### Easiest: double-click
Double-click **`Open Website.bat`** in the project folder. It installs the libraries the first time, builds your latest version, and opens **http://localhost:4000** in your browser. Close the black window to stop it.

> **Why not just double-click `out/index.html`?** Browsers block a website opened straight from a folder (`file://…`): the hero film, scroll film, page links and forms don't work there. The site must be opened through a small local web server. `Open Website.bat` and `npm run preview` start one for you.

### While editing (VS Code)

```bash
# in VS Code: File → Open Folder → ecotree-logics, then Terminal → New Terminal
npm install          # first time only (downloads libraries into node_modules/)
npm run dev          # start the local site → open http://localhost:3000
```
Edits appear in the browser as soon as you save. Press `Ctrl + C` in the terminal to stop.

```bash
npm run build        # builds the real website into the folder  out/
npm run preview      # preview the built site → http://localhost:4000
```
Always check `npm run preview` before uploading. That preview is exactly what visitors will get.
`npm start` runs build and preview together.

Optional settings: copy `.env.example` to `.env.local` and fill in values. `.env.local` is never uploaded to GitHub.

---

## 3. Where to edit things

All content lives in **`src/data/`**. You rarely need to touch the components.

| To change… | Edit |
|---|---|
| Tagline, vision, mission, philosophy (ECO·TREE·LOGICS), problem statistics, method steps, engagement models, clients, contact details, social links | `src/data/company.js` |
| The 8 capabilities (each page's "what it is / why it matters / what we provide / benefits"), water logic, carbon terms, learning-through-play, destinations, GALMOBILE | `src/data/capabilities.js` |
| Products and categories | `src/data/products.js` |
| Projects, their figures and infrastructure | `src/data/projects.js` |
| Gallery photos and videos | `src/data/media.js` |
| Page titles and Google descriptions | `src/data/seo.js` |
| Menu links | `src/data/navigation.js` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Homepage film captions | `src/pages/index.js` (look for `captions={[ … ]}`) |

**File paths in code:** write image, video and file paths from the root (`"/images/..."`). In data files that's all you need. If you add a *new* `<img>`, `<video>` or `fetch()` in a component, wrap the path in `asset(...)` from `src/utils/asset.js`, so it also works in the GitHub Pages sub-folder. `<Link href="/about/">` links don't need it.

**Rule used throughout:** no invented facts, prices, certifications or clients. Every figure comes from the corporate presentation, and national statistics show their source.

---

## 4. Add images, videos and products

### Photos
1. Put the original photo in `media-source/photos/`. This folder is *not* uploaded to GitHub because originals are large.
2. Open `scripts/prepare-media.py` and add a line to `PHOTOS`, for example:
   `"school-visit.jpg": ("gallery", "school-visit-nisargavedh-2026"),`
   Use the second value as a descriptive, hyphenated name. It becomes the filename, which helps SEO.
3. Run `python3 scripts/prepare-media.py photos`. This needs `pip install pillow`.
   It creates `public/images/gallery/school-visit-nisargavedh-2026.webp` and a `-sm.webp` phone version.
4. Add it to `photos` in `src/data/media.js` with `alt` text (what the image shows) and a `caption`.

### Videos
- **Short clips:** put the original in `media-source/videos/`, add it to `VIDEOS` in `prepare-media.py`, run `python3 scripts/prepare-media.py videos` (needs ffmpeg) and add an entry to `videos` in `media.js`. The script compresses to 540p and makes a poster image.
- **Long films:** upload to YouTube and add `{ youtube: "VIDEO_ID", title, caption }` to `videos`. Don't put very large files in the website.
- **Homepage scroll film:** chapters are listed in `FILM` in `prepare-media.py`, given as start and end seconds. After changing them, run `python3 scripts/prepare-media.py frames`.

### Homepage hero film
The original is `homepage.mp4` in the project folder (kept out of GitHub; too large). To replace the film, put the new file there and run, from the project folder:
```bash
ffmpeg -i homepage.mp4 -an -c:v libx264 -preset slower -crf 28 -pix_fmt yuv420p -vf "scale=1920:-2" -movflags +faststart public/videos/homepage-hero-1080.mp4
ffmpeg -i homepage.mp4 -an -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -vf "scale=960:-2" -movflags +faststart public/videos/homepage-hero-540.mp4
ffmpeg -ss 1.2 -i homepage.mp4 -frames:v 1 -vf "scale=1920:-2" -quality 66 public/videos/homepage-hero-poster.webp
ffmpeg -ss 1.2 -i homepage.mp4 -frames:v 1 -vf "scale=960:-2" -quality 66 public/videos/homepage-hero-poster-sm.webp
```
`-ss 1.2` is the second the poster is taken from. Pick a frame that isn't a plain white title card, and set the same number as `POSTER_TIME` in `HeroFilm.jsx`.

### Products
Open `src/data/products.js`. The instructions are at the top of the file:
1. Save a square photo (at least 1200 px) as `public/images/products/<name>.webp`.
2. Copy a product line, then change the `slug`, `name`, `category`, `summary`, `uses` and `image`.
3. Fill `specs` **only** with confirmed specifications.

The catalogue, filters, search, product page, sitemap and Google product data all update automatically.

---

## 5. SEO, Google Analytics and Search Console

**Already built in:**
- unique title, description and canonical URL on every page
- Open Graph and Twitter cards, plus a social share image (`public/images/og/`)
- Schema.org data: Organization, WebSite, Service (each capability), Product (no prices), BreadcrumbList, Article, VideoObject, ItemList and ContactPage
- `sitemap.xml` and `robots.txt`, generated on every build
- one H1 per page, semantic HTML, alt text, lazy-loaded WebP images, descriptive filenames, breadcrumbs and internal links

LocalBusiness markup is deliberately left out until a street address is published. Edit page text for search in `src/data/seo.js`, plus `seoTitle` and `seoDescription` in the capability, project and product data.

**After the site is live (checklist):**
- [ ] **Search Console:** go to search.google.com/search-console → Add property → URL prefix `https://www.ecotreelogics.com`.
  - Verify by DNS (in Hostinger hPanel → DNS), *or* choose "HTML tag", copy only the `content="…"` value into `NEXT_PUBLIC_GSC_VERIFICATION`, then rebuild and upload.
  - Then go to Sitemaps → submit `sitemap.xml`.
- [ ] **Google Analytics 4:** analytics.google.com → create a property → Web stream → copy the ID (`G-…`) into `NEXT_PUBLIC_GA4_ID`, then rebuild and upload.
- [ ] **Google Business Profile:** only if the company has a public address or service area. Once created, add its link to `company.social` in `company.js`.
- [ ] Add real social-media links to `company.social`. They appear in the footer and in the Organization schema.
- [ ] Use Search Console → URL Inspection on the home page and one capability page, and request indexing.
- [ ] Run PageSpeed Insights (pagespeed.web.dev) on the live homepage.

---

## 6. EcoBot chatbot

EcoBot runs **in the visitor's browser**, with no AI service, no API key and no cost.

- It answers only from `src/chatbot/knowledge.js`. Capabilities and products are added to its knowledge automatically from the data files.
- Questions outside EcoTree Logics get a polite "I can only help with EcoTree Logics" reply.
- Questions it can't answer get an honest "I don't have that information", with email and WhatsApp options.

**To update it:** in `knowledge.js`, edit an `answer`, add words visitors might type to `keywords`, or copy a block to add a new topic.

**Optional AI version (not built):** it would need a server-side endpoint (for example a PHP file on Hostinger) that holds the AI API key, restricts answers to this knowledge, and applies rate limits. The key must never go into front-end code or GitHub.

---

## 7. Enquiry forms

There are four form types: general, service, product and project. All of them use `src/components/EnquiryForm.jsx`. Links such as `/contact/?type=product&subject=Seed%20Pens` open the right form already filled in.

**Default: `public/api/contact.php` on Hostinger (needs PHP, which every Hostinger web plan has).**
1. In hPanel → Emails, create a mailbox on your domain, for example `website@ecotreelogics.com`.
2. Put it in `FROM_EMAIL` at the top of `contact.php`. Mail "from" a Gmail address is usually rejected.
3. Send a test enquiry on the live site and check the inbox, including the spam folder.

**Built-in protections:**
- validation in the browser and on the server
- a hidden honeypot field and a minimum fill time against bots
- a same-site check and a per-IP rate limit (5 messages per 10 minutes)
- protection against header injection

The visitor sees "sent" **only** when the server confirms the mail was sent. Otherwise they get an error plus direct email and WhatsApp links.

**Without PHP:** create a free key at web3forms.com, then set `NEXT_PUBLIC_FORM_PROVIDER=web3forms` and `NEXT_PUBLIC_WEB3FORMS_KEY=…` in `.env.local` and rebuild.

---

## 8. GitHub workflow in VS Code

**First time:**
```bash
git init                                   # start version control (skip if already done)
git add .
git commit -m "EcoTree Logics website"
# on github.com: New repository → name it ecotree-logics → do NOT add a README → Create
git branch -M main
git remote add origin https://github.com/<your-username>/ecotree-logics.git
git push -u origin main
```

**Every time you make changes:**
```bash
git pull                                   # get the latest version first
# … edit files, check with  npm run dev …
git add .
git commit -m "Describe what you changed"
git push
```

`.gitignore` already keeps `node_modules/`, `out/`, `.env*` files and raw media (`media-source/`) out of GitHub. **Never commit passwords or API keys.**

---

## 9. Deploy to Hostinger

First, in hPanel: connect the domain to the hosting plan, and turn on **SSL** (Security → SSL). The site needs HTTPS.

### Method A — automatic deploy on every `git push`
1. hPanel → Files → **FTP Accounts**: note the FTP server, username and password.
2. GitHub → your repo → Settings → Secrets and variables → Actions → **New repository secret**. Add `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`.
3. Push to `main`. The workflow `.github/workflows/deploy-hostinger.yml` builds the site and uploads `out/` into `public_html/`. Watch it under the **Actions** tab.

### Method B — build locally and upload
```bash
npm run build
```
1. Open the `out/` folder. Select **everything inside it**, including the hidden `.htaccess`, and zip it.
2. hPanel → **File Manager** → `public_html` → Upload the zip → right-click → Extract.
3. Make sure `index.html` sits directly inside `public_html/`, not in a sub-folder.

FTP (FileZilla) also works: upload the *contents* of `out/` into `public_html/`.

**After each update:** commit and push (Method A uploads automatically), or rebuild and upload `out/` again (Method B).

**After uploading, check:**
- `https://www.ecotreelogics.com/about/` opens directly (proves direct URLs work)
- a wrong address shows the custom 404 page
- the contact form sends
- `/sitemap.xml` loads

---

## 10. Publish on GitHub Pages

GitHub Pages hosts the same site free at `https://<your-username>.github.io/<repo-name>/`. This is handy as a preview link to share before (or alongside) Hostinger.

**One-time setup:**
1. Push the project to GitHub (section 8).
2. GitHub → your repo → **Settings → Pages** → *Build and deployment* → Source: **GitHub Actions**.
3. Push to `main`, or go to Actions → *Deploy to GitHub Pages* → **Run workflow**. After 2–3 minutes, the Actions run shows the live link.

The workflow `.github/workflows/deploy-github-pages.yml` detects the `/<repo-name>/` sub-folder automatically and builds the site for it. Images, videos, the scroll film and links all work there. Nothing needs editing.

**Good to know:**
- **Contact form:** GitHub Pages can't run PHP. Visitors there see the email/WhatsApp fallback. To make the form send from GitHub Pages too, get a free key at web3forms.com, then add repository **variables** (Settings → Secrets and variables → Actions → *Variables*): `NEXT_PUBLIC_FORM_PROVIDER` = `web3forms` and `NEXT_PUBLIC_WEB3FORMS_KEY` = your key.
- **SEO:** once the Hostinger site is live, add the variable `NEXT_PUBLIC_SITE_URL` = `https://www.ecotreelogics.com`. Google then treats Hostinger as the main site and the GitHub copy as a duplicate.
- **Both at once:** pushing to `main` updates GitHub Pages and (once the FTP secrets exist) Hostinger at the same time. Until those secrets are added, the Hostinger workflow skips without failing.
- **Test the sub-folder build locally (optional):** `NEXT_PUBLIC_BASE_PATH=/ecotree-logics npm run build`. In Git Bash, put `MSYS_NO_PATHCONV=1` in front. Run `npm run build` again afterwards, before uploading to Hostinger.

---

## 11. Items to supply or confirm

These are clearly marked on the site, not filled with invented content:

- **Product photos** for all 25 catalogue items. Cards currently show "Photo coming soon".
- **GALMOBILE vehicle image**, with the manufacturer's permission, and confirmation of EcoTree Logics' supply arrangement.
- **Figure labels** for the project numbers. The presentation says each number is labelled *target / estimate / completed output / independently verified*. Set `figureLabel` in `projects.js`; it currently reads "Reported project figures".
- **DJI_0192 drone video:** which site does it show? Once confirmed, set its `project` in `media.js` so it appears on that project page. Currently it is used only as general footage.
- **CHIP Nagpur:** confirm it is fine to name CHIP Nagpur (as in the presentation) and to use photos that carry the chipnagpur.org mark.
- **Photos** of the RET Conservation Park (nursery, signage), trails and safaris.
- **Social media links**, a downloadable PDF catalogue (if one exists), and a WhatsApp Business number if it differs from the phone number.
- **`FROM_EMAIL`** mailbox for the contact form (see section 7).

### Notes on the visuals
- **Homepage hero film** (`src/sections/home/HeroFilm.jsx`): your brand film fills the screen with nothing laid over it. It opens from an inset window and recedes into a rounded card as you scroll. On portrait phones the whole film is shown over a blurred glow of itself, so its captions are never cut. A pause button and progress line sit at the bottom. The poster image appears instantly and stays as the fallback. Reduced-motion and data-saver visitors see the poster only. The page headline stays in the code as a hidden H1 for Google and screen readers.
- The scroll film uses **your real drone footage** (Gabion.mp4 and DJI_0192.MP4), not AI-generated video. AI-generated stills or clips can be added later through the Scroll Site Generator's Higgsfield pipeline if a key is configured. Label any such footage as illustrative.
