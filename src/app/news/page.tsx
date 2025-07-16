"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";

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

export default function NewsPage() {
  return (
    <DefaultLayout>
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
            Tin tức & Ưu đãi
          </h1>
          <p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
            Cập nhật những tin tức mới nhất, ưu đãi hấp dẫn và sự kiện nổi bật từ NIAD.
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-[#f0f2f5]">
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8 min-h-[420px] lg:h-[480px]">
            {/* Tin chính bên trái */}
            <div className="w-full lg:w-[62%] h-full flex flex-col">
              <div className="rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col h-full bg-white hover:shadow-2xl transition-shadow duration-300">
                <div className="w-full" style={{ aspectRatio: '16/7', background: '#fff' }}>
                  <Image
                    src={newsList[0].image}
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
                    <p className="text-sm text-gray-500 mb-1">{newsList[0].date}</p>
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2 leading-tight">
                      {newsList[0].title}
                    </h3>
                    <p className="text-base text-[#6e6e73]">
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
                  className="rounded-2xl overflow-hidden shadow flex-1 flex flex-row bg-white hover:shadow-lg transition-shadow duration-300 min-h-[120px]"
                >
                  <div className="w-[120px] h-full flex items-center justify-center bg-gray-50">
                    <Image
                      src={news.image}
                      alt={news.title}
                      className="object-cover rounded-xl"
                      width={100}
                      height={100}
                      style={{ maxHeight: '80px', maxWidth: '100px' }}
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <p className="text-xs text-gray-500 mb-1">{news.date}</p>
                    <h4 className="text-base font-semibold text-[#1d1d1f] mb-1 leading-tight">
                      {news.title}
                    </h4>
                    <p className="text-sm text-[#6e6e73]">
                      {news.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
