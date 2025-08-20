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
import Image from "next/image";
import Link from "next/link";
import LoadingBanner from "@/components/LoadingBanner";

export default function ProductSection() {
  const [brands, setBrands] = useState<string[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Helper function để lấy ID sản phẩm
  const getProductId = (product: any) => {
    console.log('Current product:', product); // Debug log
    return product._id || product.id;
  };

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

  // Thêm state để theo dõi index hiện tại
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!initialized || brands.length === 0) {
    return <LoadingBanner />;
  }

  const filtered = products.filter((p: any) => p.model === activeCategory);
  const total = filtered.length;
  const currentProduct = total > 0 ? filtered[currentIndex] : null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="w-full relative bg-white overflow-hidden flex flex-col justify-center md:px-16 py-16">
      {/* Tabs thương hiệu */}
      <div className="flex flex-col items-center justify-center mb-8 mt-8">
        <div className="bg-white rounded-full border border-[#006b68] flex flex-wrap md:inline-flex gap-0">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveBrand(brand)}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeBrand === brand
                  ? "text-white bg-[#006b68] shadow-md"
                  : "text-[#006b68] bg-white hover:bg-gray-50"
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
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`flex-shrink-0 px-6 py-2 rounded-full font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
                    isActive
                      ? "text-[#006b68] border-[#006b68] bg-[#e6f9f0]"
                      : "text-gray-700 border-transparent hover:text-[#006b68] hover:bg-[#e6f9f0]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="hidden md:flex bg-white rounded-full border border-[#006b68] p-1 gap-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`flex-shrink-0 px-6 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? "text-white bg-[#006b68] shadow-md"
                      : "text-[#006b68] bg-white hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product hiển thị nếu có */}
      {currentProduct ? (
        <div className="w-full grid md:grid-cols-2 gap-6 items-center flex-1">
          {/* Left Info */}
          <div className="w-auto space-y-4 px-6">
            <h2 className="text-4xl font-bold uppercase">{currentProduct.name}</h2>
            <p className="text-gray-400 text-base">{currentProduct.description || 'Chưa có mô tả'}</p>
            <p className="text-2xl font-bold">{currentProduct.price?.toLocaleString()}₫</p>
            <button 
              className="mt-4 px-6 py-2 bg-[#006c67] text-white rounded-md hover:bg-gray-800"
              onClick={() => {
                const id = currentProduct._id || currentProduct.id;
                if (id) window.location.href = `/product-detail/${id}`;
                else alert('Không tìm thấy id sản phẩm!');
              }}
            >
              Xem tất cả
            </button>
          </div>

          {/* Right - Image + Info */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#006c67] skew-x-[-12deg] origin-left z-0 rounded-md"></div>

            {currentProduct.images?.main ? (
              getProductId(currentProduct) ? (
                <Link href={`/product-detail/${getProductId(currentProduct)}`} className="block">
                  <Image
                    src={currentProduct.images.main}
                    alt={currentProduct.name}
                    className="relative z-10 w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    width={700} 
                    height={500}
                    priority
                  />
                </Link>
              ) : (
                <Image
                  src={currentProduct.images.main}
                  alt={currentProduct.name}
                  className="relative z-10 w-full h-auto object-contain"
                  width={700} 
                  height={500}
                  priority
                />
              )
            ) : (
              getProductId(currentProduct) ? (
                <Link href={`/product-detail/${getProductId(currentProduct)}`} className="block">
                  <div className="relative z-10 w-full h-[400px] flex items-center justify-center text-white cursor-pointer hover:bg-[#005550] transition-colors duration-300">
                    <span>Chưa có hình ảnh - Click để xem chi tiết</span>
                  </div>
                </Link>
              ) : (
                <div className="relative z-10 w-full h-[400px] flex items-center justify-center text-white">
                  <span>Chưa có hình ảnh</span>
                </div>
              )
            )}

            <div className="absolute top-6 right-6 z-20 text-white space-y-4">
              <div className="flex items-center gap-2">
                <Fuel size={16} />
                <span className="text-sm">{currentProduct.fuelType || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings2 size={16} />
                <span className="text-sm">{currentProduct.transmission || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span className="text-sm">{currentProduct.seats || 'N/A'}</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
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
    </section>
  );
}
