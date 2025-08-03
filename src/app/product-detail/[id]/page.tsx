"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingBanner from "@/components/LoadingBanner";

export default function ProductDetailPage() {
  const tabList = [
    "Đặc điểm nổi bật",
    "Thông số kỹ thuật",
    "Hình ảnh",
  ];
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/car/${id}`)
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
      <section className="relative bg-gradient-to-r from-[#006b68] to-[#e6f9f0] text-white py-20 overflow-hidden mb-0">
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
          <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 justify-center bg-white/80 rounded-full px-2 py-2 border border-[#006b68]">
            {tabList.map(tab => (
              <button
                key={tab}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#006b68] border-[#006b68] bg-[#e6f9f0]"
                    : "text-[#006b68] border-transparent hover:border-[#006b68] hover:bg-[#e6f9f0]"
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
      
        {/* Tab nội dung động */}
        <div className="max-w-full mx-auto  mb-10">
          {activeTab === "Đặc điểm nổi bật" && (
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-3xl font-bold text-[#006b68] mb-6 text-center">{product.name}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hình ảnh chính */}
                <div className="flex items-center justify-center">
                  <div className="bg-[#f8fcfb] rounded-xl shadow-md w-full">
                    <Image
                      src={product.images?.main || '/images/placeholder.jpg'}
                      alt={product.name}
                      width={711}
                      height={400}
                      className="rounded-lg w-full object-contain h-auto lg:h-[400px]"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
                
                {/* Đặc điểm nổi bật - CKEditor content */}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-[#03bb65] mb-4">Đặc điểm nổi bật</h3>
                  {product.highlightFeatures ? (
                    <div 
                      className="prose max-w-none bg-[#f8fcfb] rounded-xl shadow p-6" 
                      dangerouslySetInnerHTML={{ __html: product.highlightFeatures }} 
                    />
                  ) : (
                    <div className="bg-[#f8fcfb] rounded-xl shadow p-6 text-center">
                      <p className="text-gray-600 italic">Chưa có thông tin chi tiết về đặc điểm nổi bật của sản phẩm.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {activeTab === "Thông số kỹ thuật" && (
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-[#03bb65] mb-6">Thông số kỹ thuật</h3>
              {product.specifications && typeof product.specifications === 'string' && product.specifications.startsWith('http') ? (
                <div className="flex justify-center bg-[#f8fcfb] p-2 sm:p-4 rounded-xl shadow-md overflow-hidden">
                  <Image 
                    src={product.specifications} 
                    alt="Thông số kỹ thuật" 
                    width={1200}
                    height={1600}
                    className="rounded-lg w-full object-contain max-h-[800px]" 
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              ) : (
                <p className="text-black p-4 bg-gray-50 rounded-lg text-center">Không có thông tin thông số kỹ thuật.</p>
              )}
            </section>
          )}
          {activeTab === "Hình ảnh" && (
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-[#03bb65] mb-6">Thư viện hình ảnh</h3>
              {(product.images?.main || (product.images?.gallery && product.images.gallery.length > 0)) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Ảnh chính lớn hơn, chiếm toàn bộ chiều rộng */}
                  {product.images?.main && (
                    <div className="md:col-span-2 lg:col-span-3">
                      <div 
                        className="bg-[#f8fcfb] p-3 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setSelectedImage(product.images.main)}
                      >
                        <Image 
                          src={product.images.main} 
                          alt={`${product.name} - Ảnh chính`} 
                          width={1200} 
                          height={800} 
                          className="rounded-lg w-full object-contain h-[400px] md:h-[500px]"
                          style={{ maxWidth: '100%' }}
                        />
                        <p className="mt-2 text-center text-gray-700 font-medium">Hình ảnh chính</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Gallery images */}
                  {product.images?.gallery && product.images.gallery.length > 0 ? (
                    product.images.gallery.map((imgUrl: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="bg-[#f8fcfb] p-3 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setSelectedImage(imgUrl)}
                      >
                        <Image 
                          src={imgUrl} 
                          alt={`${product.name} - Ảnh ${idx + 1}`} 
                          width={600} 
                          height={400} 
                          className="rounded-lg w-full object-contain h-[250px]"
                          style={{ maxWidth: '100%' }}
                        />
                      </div>
                    ))
                  ) : (
                    // Hỗ trợ mô hình cũ (đối với dữ liệu cũ)
                    <>
                      {['front', 'back', 'left', 'right'].map(key => 
                        product.images?.[key] ? (
                          <div 
                            key={key}
                            className="bg-[#f8fcfb] p-3 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => setSelectedImage(product.images[key])}
                          >
                            <Image 
                              src={product.images[key]} 
                              alt={`${product.name} - Ảnh`} 
                              width={600} 
                              height={400} 
                              className="rounded-lg w-full object-contain h-[250px]"
                              style={{ maxWidth: '100%' }}
                            />
                          </div>
                        ) : null
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-black p-4 bg-gray-50 rounded-lg text-center">Không có hình ảnh cho sản phẩm này.</p>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Modal hiển thị ảnh phóng to */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-screen flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-xl font-bold">×</span>
            </button>
            
            <div className="overflow-hidden max-h-[90vh] max-w-[90vw]">
              <Image
                src={selectedImage}
                alt="Phóng to"
                width={1600}
                height={1200}
                className="max-h-[90vh] w-auto object-contain"
                style={{ maxWidth: '90vw' }}
              />
            </div>
          </div>
        </div>
      )}

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
        
        body {
          overflow: ${selectedImage ? 'hidden' : 'auto'};
        }
        
        /* CKEditor content styling */
        .prose {
          color: #333;
          font-size: 1rem;
          line-height: 1.75;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          color: #006b68;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 600;
        }
        
        .prose p {
          margin-bottom: 1.25em;
        }
        
        .prose ul, .prose ol {
          padding-left: 1.5em;
          margin-bottom: 1.25em;
        }
        
        .prose li {
          margin-bottom: 0.5em;
        }
        
        .prose blockquote {
          border-left: 4px solid #006b68;
          padding-left: 1em;
          font-style: italic;
          margin: 1.5em 0;
          color: #555;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
        
        .prose a {
          color: #006b68;
          text-decoration: underline;
        }
      `}</style>
    </DefaultLayout>
  );
}
