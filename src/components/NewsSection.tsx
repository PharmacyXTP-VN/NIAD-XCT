"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function NewsSection() {
  const [newsList, setNewsList] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/news/list?limit=4")
      .then(res => res.json())
      .then(data => {
        setNewsList(Array.isArray(data.data) ? data.data : []);
      });
  }, []);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 5,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 8,
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

  const awards = [
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
    "/images/award1.jpg",
  ];

  return (
    <section className="py-12 bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-right">
          <span className="text-[#1d1d1f]">TIN TỨC</span>
          <span className="text-[#03bb65]"> & SỰ KIỆN</span>
        </h2>
        <div className="flex justify-end">
          <p className="text-base md:text-lg text-[#6e6e73] mb-6 font-medium max-w-xl text-right">
            Cập nhật những tin tức - ưu đãi miễn phí nhanh nhất.
          </p>
        </div>

        {/* Bố cục: Tin lớn bên trái, 3 tin nhỏ bên phải */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[420px] lg:h-[480px]">
          {/* Tin chính bên trái */}
          <div className="w-full lg:w-[62%] h-full flex flex-col">
            {newsList.length > 0 && (
              <Link href={`/news/${newsList[0]._id}`} className="rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col h-full bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                <div className="w-full" style={{ aspectRatio: '16/7', background: '#fff' }}>
                  <Image
                    src={newsList[0].thumbnail}
                    alt={newsList[0].title}
                    className="w-full h-full object-contain bg-white"
                    width={800}
                    height={350}
                    priority
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-end min-h-0">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{newsList[0].publishedAt ? new Date(newsList[0].publishedAt).toLocaleDateString() : ""}</p>
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2 leading-tight">
                      {newsList[0].title}
                    </h3>
                    <p className="text-base text-[#6e6e73]">
                      {newsList[0].summary}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* 3 tin phụ bên phải */}
          <div className="w-full lg:w-[38%] flex flex-col gap-4 h-full min-h-0">
            {newsList.slice(1, 4).map((news, idx) => (
              <Link
                href={`/news/${news._id}`}
                key={news._id || idx}
                className="rounded-2xl overflow-hidden shadow flex-1 flex flex-row bg-white hover:shadow-lg transition-shadow duration-300 min-h-[120px] cursor-pointer"
              >
                <div className="w-[120px] h-full flex items-center justify-center bg-gray-50">
                  <Image
                    src={news.thumbnail}
                    alt={news.title}
                    className="object-cover rounded-xl"
                    width={100}
                    height={100}
                    style={{ maxHeight: "80px", maxWidth: "100px" }}
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <p className="text-xs text-gray-500 mb-1">{news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ""}</p>
                  <h4 className="text-base font-semibold text-[#1d1d1f] mb-1 leading-tight">
                    {news.title}
                  </h4>
                  <p className="text-sm text-[#6e6e73]">
                    {news.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        
      </div>

      {/* Phần giải thưởng */}
      <div className="w-full bg-[#f0f2f5] py-10 mt-16">
        <h2 className="text-center font-bold text-4xl md:text-5xl text-[#1d1d1f] mb-4 mt-8 tracking-tight drop-shadow-lg">
        ĐỐI TÁC &
        <span className="text-[#03bb65]"> KHÁCH HÀNG </span>
        </h2>
        <p className="text-center text-[#6e6e73] text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">
        NIAD tự hào đồng hành cùng các ngân hàng, tổ chức tài chính và doanh nghiệp lớn trên toàn quốc. Chúng tôi cam kết mang đến giải pháp vận chuyển an toàn, hiện đại và chuyên nghiệp cho mọi đối tác, khách hàng.
        </p>
        <div className="max-w-7xl mx-auto px-4">
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
                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center w-40 h-40">
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
