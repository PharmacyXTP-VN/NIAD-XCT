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
  const [brands, setBrands] = useState<string[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Lấy danh sách hãng xe khi mount
  useEffect(() => {
    fetch("/api/car/home-summary")
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data || !Array.isArray(data.data)) return;
        const manufacturers = data.data;
        const brandNames = manufacturers.map((m: any) => m.manufacturer);
        setBrands(brandNames);
        setActiveBrand(brandNames[0] || "");
        // Lấy categories (model) đầu tiên của hãng đầu tiên
        const firstBrand = manufacturers[0];
        const modelNames = firstBrand?.models?.map((m: any) => m.name) || [];
        setCategories(modelNames);
        setActiveCategory(modelNames[0] || "");
        setProducts(firstBrand?.models || []);
        setInitialized(true);
      });
  }, []);

  // Khi đổi hãng xe, gọi API filter theo manufacturer
  useEffect(() => {
    if (!activeBrand || !initialized) return;
    fetch(`/api/car/home-summary?manufacturer=${encodeURIComponent(activeBrand)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data || !Array.isArray(data.data)) return;
        const manufacturers = data.data;
        const brandObj = manufacturers.find((m: any) => m.manufacturer === activeBrand);
        // Lấy categories theo 'model' thay vì 'name'
        const modelNames = brandObj?.models?.map((m: any) => m.model) || [];
        setCategories(modelNames);
        setActiveCategory(modelNames[0] || "");
        setProducts(brandObj?.models || []);
      });
  }, [activeBrand, initialized]);

  // Khi đổi loại xe, gọi API filter theo manufacturer & model
  useEffect(() => {
    if (!activeBrand || !activeCategory || !initialized) return;
    fetch(`/api/car/home-summary?manufacturer=${encodeURIComponent(activeBrand)}&model=${encodeURIComponent(activeCategory)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.data || !Array.isArray(data.data)) return;
        const manufacturers = data.data;
        const brandObj = manufacturers.find((m: any) => m.manufacturer === activeBrand);
        setProducts(brandObj?.models || []);
      });
  }, [activeCategory, activeBrand, initialized]);

  // Khi fill UI, lấy đúng data theo model
  const product = products.find((p: any) => p.model === activeCategory);

  return (
    <section className="w-full bg-[#f0f2f5] px-0 py-3 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter hãng xe */}
        <div className="flex flex-col items-center justify-center mb-8 mt-8">
          <div className="bg-gradient-to-r from-[#e6f9f0] via-white to-[#e6f9f0] shadow-xl rounded-full px-4 py-4 border-2 border-[#03bb65] flex flex-wrap gap-4 justify-center items-center min-h-[64px]">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all border-2 shadow-md duration-200 focus:outline-none focus:ring-2 focus:ring-[#03bb65] focus:ring-offset-2 ${
                  activeBrand === brand
                    ? "text-white bg-[#03bb65] border-[#03bb65] scale-105 drop-shadow-lg"
                    : "text-[#03bb65] bg-white border-[#03bb65] hover:bg-[#e6f9f0] hover:scale-105"
                }`}
                style={{ minWidth: 120 }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
        {/* Filter loại xe */}
        <div className="flex justify-center mb-8">
          <div className="w-full">
            <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2 pb-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 px-6 py-2 rounded-full font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
                      isActive
                        ? "text-[#03bb65] border-[#03bb65] bg-[#e6f9f0]"
                        : "text-gray-700 border-transparent hover:text-[#03bb65] hover:bg-[#e6f9f0]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="hidden md:flex bg-white/80 shadow rounded-full px-2 py-2 gap-2 border border-[#03bb65]">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all border-b-2 ${
                      isActive
                        ? "text-[#03bb65] border-[#03bb65] bg-[#e6f9f0]"
                        : "text-gray-700 border-transparent hover:text-[#03bb65] hover:bg-[#e6f9f0]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Hiển thị sản phẩm */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {product ? (
            <div className="w-full grid md:grid-cols-2 gap-10 items-center flex-1">
              {/* Left Info */}
              <div className="w-auto space-y-4 px-6">
                <h2 className="text-4xl font-bold uppercase text-[#03bb65] drop-shadow mb-2">{product.name}</h2>
                <div className="flex flex-wrap gap-4 mb-2">
                  <span className="inline-flex items-center gap-1 text-base text-gray-700"><b>Số lượng:</b> {product.count}</span>
                </div>
                <p className="text-gray-700 text-base mb-2">{product.description}</p>
                <p className="text-2xl font-bold text-[#006c67] mb-4">{product.price?.toLocaleString()}₫</p>
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
              </div>
              <div className="absolute top-6 right-6 z-20 text-[#03bb65] space-y-4 bg-white/80 rounded-xl px-4 py-2 shadow">
                  <div className="flex items-center gap-2">
                    <Fuel size={16} />
                    <span className="text-sm font-semibold">{product.fuelType}</span>
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
                    className="bg-white border border-[#03bb65] text-[#03bb65] rounded-full p-2 shadow hover:bg-[#e6f9f0] transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
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
