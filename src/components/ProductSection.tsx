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
import { Product } from "@/data/products";
import Image from "next/image";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/products");
  //       const data: Product[] = res.data;
  //       setProducts(data);
  //       const categoriesFromData: string[] = data.map((item: Product) => item.category);
  //       const uniqueCategories: string[] = [...new Set<string>(categoriesFromData)];
  //       setCategories(uniqueCategories);
  //       setActiveCategory(uniqueCategories[0] || "");
  //     } catch (error) {
  //       console.error("Lỗi khi tải sản phẩm:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Mock data cho demo local, bỏ comment để dùng thử:
  useEffect(() => {
    // Dữ liệu mẫu
    // Định nghĩa Product mở rộng cho mock local
    type ProductMock = Product & { active?: boolean };
    const mockProducts: ProductMock[] = [
      {
        id: 1,
        name: "Xe chở tiền Isuzu D-Max",
        desc: "Xe bán tải Isuzu D-Max cải tiến thành xe chở tiền chuyên dụng, thùng bảo vệ an toàn, nội thất tiện nghi.",
        price: "1.200.000.000đ",
        image: "/images/cars/test2-removebg-preview.png",
        category: "Bán tải",
        fuel: "Diesel",
        transmission: "Số tự động",
        seats: "5",
        active: false,
      },
      {
        id: 2,
        name: "Xe chở tiền Ford Transit",
        desc: "Xe van Ford Transit cải tiến, khoang chứa tiền rộng, hệ thống an ninh hiện đại.",
        price: "1.500.000.000đ",
        image: "/images/test3.png",
        category: "Van",
        fuel: "Diesel",
        transmission: "Số sàn",
        seats: "7",
        active: false,
      },
      {
        id: 3,
        name: "Xe chở tiền Toyota Innova",
        desc: "Xe 7 chỗ Toyota Innova cải tiến, phù hợp vận chuyển tiền mặt an toàn.",
        price: "1.350.000.000đ",
        image: "/images/tesst-removebg-preview.png",
        category: "7 chỗ",
        fuel: "Xăng",
        transmission: "Số tự động",
        seats: "7",
        active: true,
      },
    ];
    setProducts(mockProducts);
    const categoriesFromData: string[] = mockProducts.map((item) => item.category);
    const uniqueCategories: string[] = [...new Set<string>(categoriesFromData)];
    setCategories(uniqueCategories);
    // Nếu có sản phẩm active thì set category và index theo sản phẩm đó
    const activeProduct = mockProducts.find((p) => p.active);
    if (activeProduct) {
      setActiveCategory(activeProduct.category);
      setCurrentIndex(mockProducts.filter((p) => p.category === activeProduct.category).findIndex((p) => p.active));
    } else {
      setActiveCategory(uniqueCategories[0] || "");
      setCurrentIndex(0);
    }
  }, []);

  const filtered = products.filter((p) => p.category === activeCategory);
  const total = filtered.length;
  const product = total > 0 ? filtered[currentIndex] : null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section id="main-products" className="w-full bg-[#0a1a2f]/80 px-0 py-3">
      <h2 className="text-center font-bold text-4xl md:text-5xl text-white mb-8 tracking-tight drop-shadow-lg">SẢN PHẨM</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/90 rounded-3xl shadow-2xl border-2 border-[#03bb65] p-8 md:p-12 relative overflow-hidden">
          {/* Decoration shape */}
          <div className="absolute left-0 bottom-0 w-40 h-20 bg-[#e6f9f0] rounded-t-full -z-10" />
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#d0e6ff] rounded-br-[80px] -z-10" />
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/80 shadow rounded-full px-2 py-2 gap-2 border border-[#03bb65]">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
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

          {/* Product hiển thị nếu có */}
          {product ? (
            <div className="w-full grid md:grid-cols-2 gap-10 items-center flex-1">
              {/* Left Info */}
              <div className="w-auto space-y-4 px-6">
                <h2 className="text-4xl font-bold uppercase text-[#03bb65] drop-shadow mb-2">{product.name}</h2>
                <p className="text-gray-700 text-base mb-2">{product.desc}</p>
                <p className="text-2xl font-bold text-[#006c67] mb-4">{product.price}</p>
                <button className="mt-4 px-6 py-2 bg-[#03bb65] text-white rounded-md hover:bg-[#006c67] transition font-semibold shadow">
                  Xem tất cả
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
