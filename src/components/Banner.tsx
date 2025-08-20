// File: src/components/Banner.tsx
// ✅ Đường dẫn: src/components/Banner.tsx

"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Fallback banner images if API fails
const fallbackBannerImages = [
  "/images/banners/4324cbee-9e95-4436-b19b-efa823de9278.png",
  "/images/banners/67f3c6c1-fc32-4e1d-9771-59dd377777a4.png",
  "/images/banners/83da159c-7624-4915-84d2-3c30f9afbc89.png",
];

interface BannerImage {
  _id: string;
  url: string;
  title: string;
  description: string;
}

export default function Banner() {
  const sliderRef = useRef<any>(null);
  const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch banner images from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        console.log("Fetching banners from API...");
        // Sử dụng cấu trúc route types mới
        const res = await fetch("/api/images/types/banner", {
          cache: "no-store", // Tránh cache để luôn lấy dữ liệu mới nhất
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        
        const data = await res.json();
        console.log("Banner API response:", data);
        
        if (res.ok && Array.isArray(data.data) && data.data.length > 0) {
          console.log(`Loaded ${data.data.length} banner images:`, data.data);
          setBannerImages(data.data);
        } else {
          console.warn("No banner images found or invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);
  
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

  // Use fallback images if no banners found
  const displayImages = bannerImages.length > 0 
    ? bannerImages 
    : fallbackBannerImages.map((url, index) => ({ 
        _id: `fallback-${index}`, 
        url, 
        title: `Banner ${index + 1}`, 
        description: '' 
      }));

  return (
    <section id="banner" className="w-full h-[60vw] min-h-[320px] max-h-[100vh] md:h-screen md:w-screen relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b8001c]"></div>
        </div>
      )}
    
      {/* Custom navigation buttons */}
      <button
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-blue-500 hover:text-white text-blue-600 rounded-full p-2 shadow-lg transition-all"
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="Previous slide"
        disabled={isLoading}
      >
        <ChevronLeft size={32} />
      </button>
      <button
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-blue-500 hover:text-white text-blue-600 rounded-full p-2 shadow-lg transition-all"
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="Next slide"
        disabled={isLoading}
      >
        <ChevronRight size={32} />
      </button>
      {/* Slider component */}
      <Slider ref={sliderRef} {...settings}>
        {displayImages.map((image, index) => (
          <div key={image._id}>
            <Image
              src={image.url}
              alt={image.title || `Slide ${index + 1}`}
              className="w-full h-[60vw] min-h-[320px] max-h-[100vh] md:w-screen md:h-screen object-cover"
              width={1920}
              height={1080}
              priority={index === 0}
              onError={(e) => {
                console.error(`Error loading image: ${image.url}`);
                // Hiển thị ảnh dự phòng khi ảnh chính không tải được
                const target = e.currentTarget;
                if (target.src !== fallbackBannerImages[0]) {
                  target.src = fallbackBannerImages[0];
                }
              }}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
