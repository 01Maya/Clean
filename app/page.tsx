import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Preloader, ScrollProgress, BackToTop } from "@/components/effects";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Posts } from "@/components/sections/posts";
import { Faq } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { Quote } from "@/components/sections/quote";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

const businessId = new URL("/#business", siteUrl).toString();
const siteRoot = new URL("/", siteUrl).toString();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "CleaningService"],
      "@id": businessId,
      name: siteName,
      url: siteRoot,
      description: siteDescription,
      image: new URL("/images/hero.jpg", siteUrl).toString(),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Cleaning services",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Home cleaning",
            itemListElement: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home cleaning",
                serviceType: "Home cleaning",
                provider: { "@id": businessId },
              },
            },
          },
          {
            "@type": "OfferCatalog",
            name: "Office cleaning",
            itemListElement: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Office cleaning",
                serviceType: "Office cleaning",
                provider: { "@id": businessId },
              },
            },
          },
          {
            "@type": "OfferCatalog",
            name: "Deep cleaning",
            itemListElement: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deep cleaning",
                serviceType: "Deep cleaning",
                provider: { "@id": businessId },
              },
            },
          },
          {
            "@type": "OfferCatalog",
            name: "Move-in/out cleaning",
            itemListElement: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Move-in/out cleaning",
                serviceType: "Move-in/out cleaning",
                provider: { "@id": businessId },
              },
            },
          },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main id="top">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Posts />
        <Pricing />
        <Faq />
        <Quote />
      </main>
      <Footer />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
