// File: src/app/page.tsx
// ✅ Đường dẫn: src/app/page.tsx

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import CarModelsSection from "@/components/CarModelsSection";
import NewsSection from "@/components/NewsSection";
import AboutCTA from "@/components/AboutCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <ProductSection />
        <CarModelsSection />
        <AboutCTA />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
