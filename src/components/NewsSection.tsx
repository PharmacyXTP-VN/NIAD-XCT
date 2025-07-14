"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef, useEffect } from "react";

const newsList = [
  {
    title: "Ra mắt xe chở tiền chống đạn phiên bản 2025",
    description: "Dòng xe mới đạt tiêu chuẩn EN1063 cấp độ B6 chống đạn.",
    image: "/images/news/test2.png",
    date: "12/05/2025",
  },
  {
    title: "Ký kết hợp tác với ngân hàng quốc tế",
    description: "Cung cấp 50 xe vận chuyển tiền cho hệ thống ATM toàn quốc.",
    image: "/images/news/test2.png",
    date: "05/05/2025",
  },
  {
    title: "Hội thảo “An ninh vận chuyển tài chính 4.0”",
    description: "Giải pháp tích hợp GPS, camera AI và cảnh báo xâm nhập.",
    image: "/images/news/test2.png",
    date: "25/04/2025",
  },
  {
    title: "Tăng cường bảo mật xe vận chuyển tiền",
    description: "Trang bị khóa sinh trắc học và mã hóa dữ liệu đường truyền.",
    image: "/images/news/test2.png",
    date: "20/04/2025",
  },
];

const awards = [
  "/images/award1.jpg",
  "/images/award1.jpg",
  "/images/award1.jpg",
  "/images/award1.jpg",
  "/images/award1.jpg",
  "/images/award1.jpg",
];

export default function NewsSection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
        },
      },
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (slider.current) {
      interval = setInterval(() => {
        slider.current?.next();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section id="news" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          📰 Tin tức & Sự kiện
        </h2>

        {/* Bố cục: Tin lớn bên trái, 3 tin nhỏ bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tin chính bên trái */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow">
              <img
                src={newsList[0].image}
                alt={newsList[0].title}
                className="w-full h-96 object-cover"
              />
              <div className="bg-white p-6">
                <p className="text-sm text-gray-500">{newsList[0].date}</p>
                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  {newsList[0].title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {newsList[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* 3 tin phụ bên phải */}
          <div className="space-y-4">
            {newsList.slice(1, 4).map((news, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border shadow"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-28 object-cover"
                />
                <div className="bg-white p-3">
                  <p className="text-xs text-gray-500">{news.date}</p>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {news.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phần giải thưởng */}
        <h3 className="text-center text-green-700 text-xl font-semibold mt-12 mb-4">
          Ghi nhận của cộng đồng dành cho BIC
        </h3>

        <div
          ref={(ref) => {
            sliderRef.current = ref;
            sliderInstanceRef(ref);
          }}
          className="keen-slider"
        >
          {awards.map((award, index) => (
            <div
              key={index}
              className="keen-slider__slide flex justify-center items-center"
            >
              <Image
                width={200}
                height={200}
                src={award}
                alt={`Award ${index + 1}`}
                className="h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
