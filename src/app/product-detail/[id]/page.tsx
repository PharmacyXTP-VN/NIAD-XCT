"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingBanner from "@/components/LoadingBanner";

export default function ProductDetailPage() {
  const tabList = ["Đặc điểm nổi bật", "Thông số kỹ thuật", "Hình ảnh"];
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [product, setProduct] = useState<any>(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/car/get/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data || null));
  }, [id]);

  if (!product) {
    return (
      <DefaultLayout>
        <LoadingBanner />
      </DefaultLayout>
    );
  }

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
            {product.description}
          </p>
        </div>
      </section>
      {/* Tabs điều hướng đặt dưới banner */}
      <div className="w-full bg-white/90 py-4 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 justify-center bg-white/80 rounded-full px-2 py-2 border border-[#03bb65]">
            {tabList.map((tab) => (
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
                src={product.images?.main}
                alt={product.name}
                width={600}
                height={340}
                className="object-contain rounded-2xl w-full h-[260px] md:h-[340px]"
                priority
              />
            </div>
            {/* Hiển thị các góc ảnh nếu có */}
            <div className="flex gap-3 justify-center mt-2">
              {product.images?.front && (
                <Image
                  src={product.images.front}
                  alt="Ảnh trước"
                  width={80}
                  height={60}
                  className="object-contain w-20 h-14"
                />
              )}
              {product.images?.back && (
                <Image
                  src={product.images.back}
                  alt="Ảnh sau"
                  width={80}
                  height={60}
                  className="object-contain w-20 h-14"
                />
              )}
              {product.images?.left && (
                <Image
                  src={product.images.left}
                  alt="Ảnh trái"
                  width={80}
                  height={60}
                  className="object-contain w-20 h-14"
                />
              )}
              {product.images?.right && (
                <Image
                  src={product.images.right}
                  alt="Ảnh phải"
                  width={80}
                  height={60}
                  className="object-contain w-20 h-14"
                />
              )}
            </div>
          </div>
          {/* Main Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#03bb65] mb-4">
              {product.name}
            </h2>
            {/* Giá bán và model */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2"></div>
            <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Hãng</span>
                <span className="text-black">{product.manufacturer}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Năm</span>
                <span className="text-black">{product.year}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Màu</span>
                <span className="text-black">{product.color}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Biển số</span>
                <span className="text-black">{product.licensePlate}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Số chỗ</span>
                <span className="text-black">{product.seats}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Nhiên liệu</span>
                <span className="text-black">{product.fuelType}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Hộp số</span>
                <span className="text-black">{product.transmission}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Tình trạng</span>
                <span className="text-black">{product.condition}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Trạng thái</span>
                <span className="text-black">{product.status}</span>
              </li>
              <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <span className="font-semibold text-black">Mẫu xe</span>
                <span className="text-black">{product.model}</span>
              </li>
            </ul>
            <span className="font-bold text-[#03bb65] text-2xl mt-4">
              Giá bán:{" "}
              {product.price ? product.price.toLocaleString() + "₫" : "N/A"}
            </span>
            {product.description && (
              <p className="mb-4 text-base text-black">{product.description}</p>
            )}
            <button className="mt-4 px-8 py-3 bg-[#03bb65] text-white rounded-xl hover:bg-[#006c67] transition font-bold shadow text-lg w-fit">
              Đặt xe ngay
            </button>
          </div>
        </section>
        {/* Tab nội dung động */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          {activeTab === "Đặc điểm nổi bật" && (
            <section>
              <h3 className="text-2xl font-bold text-black mb-4">
                Đặc điểm nổi bật
              </h3>
              {Array.isArray(product.highlights) &&
              product.highlights.length > 0 ? (
                <ul className="list-disc ml-6 space-y-1 text-black">
                  {product.highlights.map((h: any, idx: number) => (
                    <li key={idx}>
                      <b>{h.name}:</b> {h.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-black">Không có thông tin.</p>
              )}
            </section>
          )}
          {activeTab === "Thông số kỹ thuật" && (
            <section>
              <h3 className="text-2xl font-bold text-black mb-4">
                Thông số kỹ thuật
              </h3>
              {product.specifications ? (
                <div className="flex justify-center">
                  <Image
                    src={product.specifications}
                    alt="Thông số kỹ thuật"
                    width={800}
                    height={600}
                    className="rounded-xl object-contain max-w-full shadow-lg"
                  />
                </div>
              ) : (
                <p className="text-black">
                  Không có thông tin thông số kỹ thuật.
                </p>
              )}
            </section>
          )}
          {activeTab === "Hình ảnh" && (
            <section>
              <h3 className="text-2xl font-bold text-black mb-4">Hình ảnh</h3>
              <div className="flex flex-wrap gap-4">
                {product.images?.main && (
                  <Image
                    src={product.images.main}
                    alt="Ảnh chính"
                    width={300}
                    height={200}
                    className="rounded-xl object-contain"
                  />
                )}
                {product.images?.front && (
                  <Image
                    src={product.images.front}
                    alt="Ảnh trước"
                    width={200}
                    height={140}
                    className="rounded-xl object-contain"
                  />
                )}
                {product.images?.back && (
                  <Image
                    src={product.images.back}
                    alt="Ảnh sau"
                    width={200}
                    height={140}
                    className="rounded-xl object-contain"
                  />
                )}
                {product.images?.left && (
                  <Image
                    src={product.images.left}
                    alt="Ảnh trái"
                    width={200}
                    height={140}
                    className="rounded-xl object-contain"
                  />
                )}
                {product.images?.right && (
                  <Image
                    src={product.images.right}
                    alt="Ảnh phải"
                    width={200}
                    height={140}
                    className="rounded-xl object-contain"
                  />
                )}
              </div>
            </section>
          )}
        </div>
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
