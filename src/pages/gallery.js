/** Gallery — all photos (filterable, full-screen viewer) and drone videos. Add media in src/data/media.js */
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import VideoPlayer from "@/components/VideoPlayer";
import { Reveal, SplitWords } from "@/components/Reveal";
import GalleryGrid from "@/sections/GalleryGrid";
import CtaBand from "@/sections/CtaBand";
import { photos, videos, galleryCategories } from "@/data/media";
import { pageSeo, SITE_URL } from "@/data/seo";
import { breadcrumbSchema } from "@/utils/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery/" }];
const videoSchema = videos.map((v) => ({
  "@context": "https://schema.org", "@type": "VideoObject", name: v.title, description: v.caption,
  thumbnailUrl: `${SITE_URL}/videos/${v.file}-poster.jpg`, contentUrl: `${SITE_URL}/videos/${v.file}.mp4`, uploadDate: v.added,
}));

export default function Gallery() {
  return (
    <>
      <Seo title={pageSeo.gallery.title} description={pageSeo.gallery.description} path="/gallery/" schema={[breadcrumbSchema(crumbs), ...videoSchema]} />
      <PageHero crumbs={crumbs} short eyebrow="Gallery" title="From the field" intro="Restoration, water and soil work, nurseries and learning on site — photographed and filmed on our projects."
        image="/images/projects/check-dam-overflow-water-conservation" imageAlt="Water flowing over a restored check dam" />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Videos</Reveal>
            <SplitWords as="h2" text="Drone footage" />
          </div>
          <div className="grid grid-2">{videos.map((v) => <Reveal key={v.file}><VideoPlayer {...v} /></Reveal>)}</div>
        </div>
      </section>
      <section className="section section--light">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Photographs</Reveal>
            <SplitWords as="h2" text="On the ground" />
          </div>
          <GalleryGrid items={photos} categories={galleryCategories} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
