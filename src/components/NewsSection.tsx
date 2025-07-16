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
    <section id="news-section" className="py-12 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-right">
          <span className="text-white">TIN TỨC</span>
          <span className="text-[#03bb65]"> & SỰ KIỆN</span>
        </h2>
        <div className="flex justify-end">
          <p className="text-base md:text-lg text-white/80 mb-6 font-medium max-w-xl text-right">
            Cập nhật những tin tức - ưu đãi miễn phí nhanh nhất.
          </p>
        </div>

        {/* Bố cục: Tin lớn bên trái, 3 tin nhỏ bên phải */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[420px] lg:h-[480px]">
          {/* Tin chính bên trái */}
          <div className="w-full lg:w-[62%] h-full flex flex-col">
            <div className="rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col h-full bg-white">
              <Image
                src={newsList[0].image}
                alt={newsList[0].title}
                className="w-full object-contain bg-white"
                width={800}
                height={260}
                priority
                style={{ height: "260px" }}
              />
              <div className="p-6 flex-1 flex flex-col justify-between min-h-0">
                <div>
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
          </div>

          {/* 3 tin phụ bên phải */}
          <div className="w-full lg:w-[38%] flex flex-col gap-4 h-full min-h-0">
            {newsList.slice(1, 4).map((news, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border shadow flex-1 flex flex-col min-h-0 bg-white"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  className="w-full object-contain bg-white"
                  width={400}
                  height={70}
                  style={{ height: "70px" }}
                />
                <div className="p-3 flex-1 flex flex-col justify-between min-h-0">
                  <p className="text-xs text-gray-500">{news.date}</p>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {news.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* Phần giải thưởng */}
      <div className="w-full bg-white py-10 mt-16 border-t-2 border-[#03bb65]">
        <h3 className="text-center text-[#03bb65] text-3xl font-bold mb-8 drop-shadow-lg">
          Đối tác & Khách hàng
        </h3>
        <div className="max-w-5xl mx-auto">
          <div
            ref={ref => {
              sliderRef.current = ref;
              sliderInstanceRef(ref);
            }}
            className="keen-slider"
          >
            {awards.map((award, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col items-center justify-center px-4"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center border border-[#03bb65] w-40 h-40">
                  <Image
                    width={120}
                    height={120}
                    src={award}
                    alt={`Đối tác ${index + 1}`}
                    className="object-contain max-h-28 max-w-28"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
