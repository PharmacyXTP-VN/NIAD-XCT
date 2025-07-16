// File: src/components/ProductSection.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Fuel,
  Settings2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product, products as productData } from "@/data/products";
import Image from "next/image";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [brands, setBrands] = useState<string[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("");

  useEffect(() => {
    // Chuyển category thành hãng xe, name thành loại xe
    const productsWithBrand = productData.map((p) => ({ ...p, brand: p.name }));
    setProducts(productsWithBrand);
    // Lấy danh sách hãng xe
    const brandsFromData: string[] = productData.map((item) => item.category);
    const uniqueBrands: string[] = [...new Set<string>(brandsFromData)].filter(Boolean);
    setBrands(uniqueBrands);
    setActiveBrand(uniqueBrands[0] || "");
    // Lấy danh sách loại xe theo hãng
    const categoriesFromData: string[] = productData.filter((item) => item.category === (uniqueBrands[0] || "")).map((item) => item.name);
    const uniqueCategories: string[] = [...new Set<string>(categoriesFromData)].filter(Boolean);
    setCategories(uniqueCategories);
    // Không dùng activeProduct nữa, chỉ khởi tạo mặc định
    setActiveCategory(uniqueCategories[0] || "");
    setCurrentIndex(0);
  }, []);

  // Filter theo hãng xe và loại xe
  const filtered = products.filter((p) => p.category === activeBrand && p.brand === activeCategory);
  const total = filtered.length;
  const product = total > 0 ? filtered[currentIndex] : null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="w-full bg-[#f0f2f5] px-0 py-3 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-8 gap-4">
          <h2 className="font-bold text-4xl md:text-5xl text-[#1d1d1f] tracking-tight drop-shadow-lg text-left mb-0">
            XE CHỞ TIỀN
            <span className="text-[#03bb65]"> NIAD </span>
          </h2>
          {/* Filter hãng xe */}
          <div className="flex justify-start md:justify-end w-full md:w-auto">
            <div className="flex bg-white/80 shadow rounded-full px-2 py-2 gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setActiveBrand(brand);
                    // Khi đổi hãng xe, cập nhật lại loại xe
                    const filteredCategories = products.filter((p) => p.category === brand).map((p) => p.brand);
                    const uniqueFilteredCategories = [...new Set<string>(filteredCategories)];
                    setCategories(uniqueFilteredCategories);
                    setActiveCategory(uniqueFilteredCategories[0] || "");
                    setCurrentIndex(0);
                  }}
                  className={`px-6 py-2 rounded-full font-semibold text-sm transition-all border-b-2 ${
                    activeBrand === brand
                      ? "text-[#6e6e73] border-[#6e6e73] bg-[#e6f9f0]"
                      : "text-gray-700 border-transparent hover:text-[#6e6e73] hover:bg-[#e6f9f0]"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            {/* Thanh trượt filter loại xe trên mobile, giữ nguyên trên md+ */}
            <div className="w-full">
              <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2 pb-1">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.brand === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentIndex(0);
                      }}
                      className={`flex-shrink-0 px-6 py-2 rounded-full font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
                        isActive
                          ? "text-[#03bb65] border-[#03bb65] bg-[#e6f9f0]"
                          : "text-gray-700 border-transparent hover:text-[#03bb65] hover:bg-[#e6f9f0]"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="hidden md:flex bg-white/80 shadow rounded-full px-2 py-2 gap-2 border border-[#03bb65]">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.brand === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentIndex(0);
                      }}
                      className={`px-6 py-2 rounded-full font-semibold text-sm transition-all border-b-2 ${
                        isActive
                          ? "text-[#03bb65] border-[#03bb65] bg-[#e6f9f0]"
                          : "text-gray-700 border-transparent hover:text-[#03bb65] hover:bg-[#e6f9f0]"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product hiển thị nếu có */}
          {product ? (
            <div className="w-full grid md:grid-cols-2 gap-10 items-center flex-1">
              {/* Left Info */}
              <div className="w-auto space-y-4 px-6">
                <h2 className="text-4xl font-bold uppercase text-[#03bb65] drop-shadow mb-2">{product.name}</h2>
                <p className="text-gray-700 text-base mb-2">{product.desc}</p>
                <p className="text-2xl font-bold text-[#006c67] mb-4">{product.price}</p>
                <button className="mt-4 px-6 py-2 bg-[#03bb65] text-white rounded-md hover:bg-[#006c67] transition font-semibold shadow"
                  onClick={() => window.location.href = "/product-detail"}
                >
                  Chi tiết sản phẩm
                </button>
              </div>

              {/* Right - Image + Info */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#e6f9f0] skew-x-[-12deg] origin-left z-0 rounded-2xl border-2 border-[#03bb65]" />
                <Image
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-auto object-contain max-h-[340px] drop-shadow-xl"
                  width={600}
                  height={400}
                  priority
                />
                <div className="absolute top-6 right-6 z-20 text-[#03bb65] space-y-4 bg-white/80 rounded-xl px-4 py-2 shadow">
                  <div className="flex items-center gap-2">
                    <Fuel size={16} />
                    <span className="text-sm font-semibold">{product.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings2 size={16} />
                    <span className="text-sm font-semibold">{product.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="text-sm font-semibold">{product.seats}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
                  <button
                    onClick={handlePrev}
                    className="bg-white border border-[#03bb65] text-[#03bb65] rounded-full p-2 shadow hover:bg-[#e6f9f0] transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-white border border-[#03bb65] text-[#03bb65] rounded-full p-2 shadow hover:bg-[#e6f9f0] transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Không có sản phẩm nào trong danh mục này.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
