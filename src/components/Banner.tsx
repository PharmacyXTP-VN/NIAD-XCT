// File: src/components/Banner.tsx
// ✅ Đường dẫn: src/components/Banner.tsx

"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const bannerImages = [
  "/images/banners/xepajero1.png",
  "/images/banners/isuzu.png",
  "/images/banners/isuzu2.png",
  "/images/banners/test2.png",
  "/images/banners/test2.png",
];

export default function Banner() {
  const sliderRef = useRef<any>(null);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <section id="banner" className="w-full h-[60vw] min-h-[320px] max-h-[100vh] md:h-screen md:w-screen relative overflow-hidden">
      {/* Custom navigation buttons */}
      <button
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-blue-500 hover:text-white text-blue-600 rounded-full p-2 shadow-lg transition-all"
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-blue-500 hover:text-white text-blue-600 rounded-full p-2 shadow-lg transition-all"
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>
      {/* Slider component */}
      <Slider ref={sliderRef} {...settings}>
        {bannerImages.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[60vw] min-h-[320px] max-h-[100vh] md:w-screen md:h-screen object-cover"
              width={1920}
              height={1080}
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
