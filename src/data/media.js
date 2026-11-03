/**
 * media.js — the photo and video gallery.
 *
 * HOW TO ADD A PHOTO
 *   1. Save it as WebP in public/images/gallery/ with a descriptive name, plus a small copy ending in -sm:
 *        public/images/gallery/school-visit-nisargavedh.webp      (max 1920 px wide)
 *        public/images/gallery/school-visit-nisargavedh-sm.webp   (800 px wide)
 *      (scripts/prepare-media.py does this for you.)
 *   2. Add a line to `photos` below. `src` is written WITHOUT ".webp".
 *
 * HOW TO ADD A VIDEO
 *   Short clips (< 30 MB after compression): put the .mp4 + -poster.jpg in public/videos/ and add to `videos`.
 *   Long films: upload to YouTube and use  { youtube: "VIDEO_ID", ... }  instead of `file`.
 *
 * `added` = the date the video was put on the website (used by Google video search).
 * Categories drive the gallery filter buttons. Project slugs link items to project pages.
 */

export const galleryCategories = ["All", "Restoration", "Water & Soil", "Nursery", "Education", "Drone"];

export const photos = [
  { src: "/images/forest/aerial-view-native-plantation-trenches", w: 1024, h: 572, category: "Restoration", project: "nisargavedh", alt: "Aerial view of young native trees and soil-moisture trenches", caption: "Young native trees and soil-moisture trenches, seen from above." },
  { src: "/images/forest/native-saplings-drip-irrigation-rows", w: 1600, h: 1200, category: "Restoration", project: "nisargavedh", alt: "Native saplings in rows with drip irrigation lines", caption: "Native saplings established with drip irrigation." },
  { src: "/images/forest/native-sapling-with-stake-drip-line", w: 768, h: 1024, category: "Restoration", project: "nisargavedh", alt: "A native sapling supported by a stake next to a drip line", caption: "Each sapling staked and watered at the root zone." },
  { src: "/images/forest/sunset-over-restored-plantation-nagpur", w: 1500, h: 2000, category: "Restoration", project: "nisargavedh", alt: "Sunset over a restored plantation with young trees and drip lines", caption: "Evening over the plantation." },
  { src: "/images/projects/gabion-structure-forest-drainage-line", w: 1024, h: 935, category: "Water & Soil", project: "nisargavedh", alt: "Stone gabion structure across a forest drainage line", caption: "Gabion structure: slows runoff and traps silt." },
  { src: "/images/projects/check-dam-overflow-water-conservation", w: 575, h: 1024, category: "Water & Soil", project: null, alt: "Water flowing over a restored check dam", caption: "Pond / check-dam restoration: store and recharge water." },
  { src: "/images/projects/drip-irrigation-mainline-trench", w: 768, h: 1024, category: "Water & Soil", project: null, alt: "Drip irrigation mainline pipes laid in a trench", caption: "Irrigation mainline laid before planting." },
  { src: "/images/projects/nursery-shade-net-frame-footings-nagpur", w: 960, h: 1280, category: "Nursery", project: null, alt: "Nursery frame poles set in concrete footings", caption: "Nursery development: frame poles set in footings." },
  { src: "/images/projects/nursery-site-before", w: 400, h: 445, category: "Nursery", project: null, alt: "Nursery site before work, with trenches and pipes on bare ground", caption: "Nursery site — before." },
  { src: "/images/projects/nursery-site-after-shade-net", w: 400, h: 445, category: "Nursery", project: null, alt: "Completed shade-net nursery", caption: "Nursery site — after: shade-net nursery complete." },
  { src: "/images/gallery/nature-education-session-lined-pond", w: 960, h: 1280, category: "Education", project: null, alt: "Students gathered around a lined pond during a nature education session", caption: "A field session at a lined farm pond." },
  { src: "/images/gallery/volunteers-building-gabion-structure", w: 576, h: 1024, category: "Education", project: null, alt: "Volunteers building a stone gabion structure together", caption: "Learning by doing: volunteers build a gabion." },
];

export const videos = [
  { file: "nisargavedh-drone-gabion-to-plantation", category: "Drone", project: "nisargavedh", title: "From gabion to plantation", added: "2026-11-03", caption: "Drone flight at Project Nisargavedh: from a gabion structure up over rows of native trees and soil-moisture pits.", duration: "2:29" },
  // TODO: confirm which site this footage shows, then set `project` (e.g. "ret-conservation-park")
  { file: "drone-overhead-planned-park-layout", category: "Drone", project: null, title: "A planned landscape from above", added: "2026-11-03", caption: "Overhead drone view of a planned landscape layout with planting beds and a central circle.", duration: "0:27" },
];
