import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { Marquee, ScrollProgress } from "@/components/Motion";
import Packages from "@/components/Packages";
import BriefForm from "@/components/BriefForm";
import { Faq, Footer, Payment, Process } from "@/components/Sections";
import { site, allServices } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    areaServed: ["PK", "Worldwide"],
    address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Graphic design services",
      itemListElement: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary },
        priceSpecification: { "@type": "PriceSpecification", minPrice: s.fromPkr, priceCurrency: "PKR" },
      })),
    },
  };

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Process />
        <Packages />
        <Payment />
        <Faq />
        <BriefForm />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
