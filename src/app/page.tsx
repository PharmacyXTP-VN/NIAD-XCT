// File: src/app/page.tsx
// ✅ Đường dẫn: src/app/page.tsx

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import CarModelsSection from "@/components/CarModelsSection";
import NewsSection from "@/components/NewsSection";
import AboutCTA from "@/components/AboutCTA";
import MoneyTruckAccordion from "@/components/MoneyTruckAccordion";
import Footer from "@/components/Footer";
import FollowUs from "@/components/FollowUs";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <AboutCTA />
        <MoneyTruckAccordion />
        <ProductSection />
        <CarModelsSection />
        <FollowUs />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
