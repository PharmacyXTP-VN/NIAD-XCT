// File: src/components/Banner.tsx
// ✅ Đường dẫn: src/components/Banner.tsx

"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  "/images/banners/xepajero1.png",
  "/images/banners/isuzu.png",
  "/images/banners/isuzu2.png",
  "/images/banners/test2.png",
  "/images/banners/test2.png",
];

export default function Banner() {
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
    <section id="banner" className="w-screen h-screen relative overflow-hidden">
      <Slider {...settings}>
        {bannerImages.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-screen h-screen object-cover"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
