"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { useState } from "react";
import TabDacDiemNoiBat from "@/components/product-detail/TabDacDiemNoiBat";
import TabNgoaiThat from "@/components/product-detail/TabNgoaiThat";
import TabNoiThat from "@/components/product-detail/TabNoiThat";
import TabVanHanh from "@/components/product-detail/TabVanHanh";
import TabAnToan from "@/components/product-detail/TabAnToan";

const product = {
  name: "New Carnival 2.2D Luxury",
  price: "1.299.000.000 VNĐ",
  image: "/images/cars/test2-removebg-preview.png",
  gallery: [
    "/images/cars/test2-removebg-preview.png",
    "/images/cars/test2.png",
    "/images/cars/test3.png",
    "/images/cars/test2-removebg-preview.png",
  ],
  highlights: [
    "Kiểu dáng đậm chất SUV",
    "Kiểu dáng đèn hậu nổi xe",
    "Mặt sau",
    "Hệ thống đèn LED trước kiểu Starmap",
    "Mặt ca lăng",
  ],
  interior: [
    "Không gian sang trọng - tiện nghi đẳng cấp",
    "Cụm màn hình cong Panoramic",
    "Hệ thống điều hòa 3 vùng độc lập",
    "Hệ thống loa Bose 12 thanh vòm cao cấp",
    "Phiên bản nội thất sang trọng",
  ],
  performance: [
    "Di chuyển đa dạng các loại địa hình & tiết kiệm nhiên liệu",
    "Tùy chọn 4 chế độ lái linh hoạt",
  ],
  safety: [
    "Cảnh báo & hỗ trợ phòng tránh va chạm phía sau BCA",
    "Cảnh báo & hỗ trợ phòng tránh va chạm phương tiện cắt ngang phía sau RCCA",
    "Đèn pha chiếu xa tự động HBA",
  ],
  versions: [
    {
      name: "New Carnival 2.2D Luxury 8S",
      price: "1.299.000.000 VNĐ",
      highlights: ["Ngoại thất: Đèn LED, Mâm 19 inch", "Nội thất: Ghế da, điều hòa tự động 3 vùng"],
    },
    {
      name: "New Carnival 2.2D Premium 7S",
      price: "1.479.000.000 VNĐ",
      highlights: ["Ngoại thất: Đèn LED, Mâm 19 inch", "Nội thất: Ghế da, điều hòa tự động 3 vùng"],
    },
    {
      name: "New Carnival 2.2D Premium 8S",
      price: "1.519.000.000 VNĐ",
      highlights: ["Ngoại thất: Đèn LED, Mâm 19 inch", "Nội thất: Ghế da, điều hòa tự động 3 vùng"],
    },
    {
      name: "New Carnival 2.2D Signature 7S",
      price: "1.589.000.000 VNĐ",
      highlights: ["Ngoại thất: Đèn LED, Mâm 19 inch", "Nội thất: Ghế da, điều hòa tự động 3 vùng"],
    },
  ],
};

export default function ProductDetailPage() {
  const tabList = [
    "Đặc điểm nổi bật",
    "Thông số kỹ thuật",
    "Hình ảnh",
  ];
  const [activeTab, setActiveTab] = useState(tabList[0]);

  return (
    <DefaultLayout>
      {/* Banner */}
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
            {product.name}
          </h1>
          <p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
            Khẳng định vị thế dẫn đầu. Giá chỉ từ {product.price}
          </p>
        </div>
      </section>
      {/* Tabs điều hướng đặt dưới banner */}
      <div className="w-full bg-white/90 py-4 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 justify-center bg-white/80 rounded-full px-2 py-2 border border-[#03bb65]">
            {tabList.map(tab => (
              <button
                key={tab}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#03bb65] border-[#03bb65] bg-[#e6f9f0]"
                    : "text-[#03bb65] border-transparent hover:border-[#03bb65] hover:bg-[#e6f9f0]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-[#f0f2f5]">
        {/* Gallery & Main Info */}
        <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
          {/* Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="bg-white rounded-3xl shadow-2xl p-4 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={340}
                className="object-contain rounded-2xl w-full h-[260px] md:h-[340px]"
                priority
              />
            </div>
            <div className="flex gap-3 justify-center mt-2">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-1 cursor-pointer hover:scale-105 transition">
                  <Image src={img} alt={product.name + idx} width={80} height={60} className="object-contain w-20 h-14" />
                </div>
              ))}
            </div>
          </div>
          {/* Main Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#03bb65] mb-4">New Carnival</h2>
            <p className="text-lg text-[#1d1d1f] mb-4">New Carnival là mẫu xe đa dụng dẫn đầu phân khúc, sang trọng, hiện đại, vận hành mạnh mẽ, an toàn vượt trội.</p>
            <ul className="mb-6 space-y-2">
              <li className="text-base text-[#6e6e73]">Khẳng định vị thế dẫn đầu.</li>
              <li className="text-base text-[#6e6e73]">Giá chỉ từ <span className="font-bold text-[#03bb65]">{product.price}</span></li>
            </ul>
            <button className="mt-4 px-8 py-3 bg-[#03bb65] text-white rounded-xl hover:bg-[#006c67] transition font-bold shadow text-lg w-fit">Đặt xe ngay</button>
          </div>
        </section>
        {/* Tab nội dung động */}
        {activeTab === "Đặc điểm nổi bật" && <TabDacDiemNoiBat product={product} />}
        {activeTab === "Ngoại thất" && <TabNgoaiThat product={product} />}
        {activeTab === "Nội thất" && <TabNoiThat product={product} />}
        {activeTab === "Vận hành" && <TabVanHanh product={product} />}
        {activeTab === "An toàn" && <TabAnToan product={product} />}
        {/* Các tab khác có thể bổ sung sau */}
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .tablist-scroll {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            -webkit-overflow-scrolling: touch;
          }
          .tablist-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </DefaultLayout>
  );
}
