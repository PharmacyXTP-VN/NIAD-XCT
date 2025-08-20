
"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingBanner from "@/components/LoadingBanner";
import PageBanner from "@/components/PageBanner";

export default function ProductDetailPage() {
  const tabList = [
    "Đặc điểm nổi bật",
    "Thông số kỹ thuật",
    "Hình ảnh",
  ];
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/car/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data || null));
  }, [id]);

  // Tạo danh sách tất cả ảnh khi product thay đổi
  useEffect(() => {
    if (!product) return;
    
    const images: string[] = [];
    
    // Thêm ảnh chính
    if (product.images?.main) {
      images.push(product.images.main);
    }
    
    // Thêm ảnh gallery
    if (product.images?.gallery && product.images.gallery.length > 0) {
      images.push(...product.images.gallery);
    } else {
      // Hỗ trợ mô hình cũ
      ['front', 'back', 'left', 'right'].forEach(key => {
        if (product.images?.[key]) {
          images.push(product.images[key]);
        }
      });
    }
    
    setAllImages(images);
  }, [product]);

  // Hàm mở ảnh với index
  const openImage = (imageUrl: string) => {
    const index = allImages.findIndex(img => img === imageUrl);
    setSelectedImageIndex(index >= 0 ? index : 0);
    setSelectedImage(imageUrl);
  };

  // Điều hướng ảnh
  const goToPrevImage = () => {
    const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : allImages.length - 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const goToNextImage = () => {
    const newIndex = selectedImageIndex < allImages.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // Xử lý body overflow khi modal mở/đóng
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Xử lý phím tắt
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowLeft') {
        const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : allImages.length - 1;
        setSelectedImageIndex(newIndex);
        setSelectedImage(allImages[newIndex]);
      } else if (e.key === 'ArrowRight') {
        const newIndex = selectedImageIndex < allImages.length - 1 ? selectedImageIndex + 1 : 0;
        setSelectedImageIndex(newIndex);
        setSelectedImage(allImages[newIndex]);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedImageIndex, allImages]);

  if (!product) {
    return (
      <DefaultLayout>
        <LoadingBanner />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Shared PageBanner component for product detail */}
      <PageBanner
        pageName="product-detail"
        title={product.name}
        subtitle={product.description}
      />
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
              {product.specifications && product.specifications.trim() !== '' ? (
                <div className="flex justify-center bg-[#f8fcfb] p-2 sm:p-4 rounded-xl shadow-md overflow-hidden">
                  <Image 
                    src={product.specifications} 
                    alt="Thông số kỹ thuật" 
                    width={1200}
                    height={1600}
                    className="rounded-lg w-full object-contain max-h-[800px]" 
                    style={{ maxWidth: '100%' }}
                    onError={(e) => {
                      console.error('Lỗi load ảnh specifications:', product.specifications);
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-center p-8">
                    <p className="text-red-600 mb-2">❌ Không thể tải ảnh thông số kỹ thuật</p>
                    <p className="text-gray-600 text-sm">URL: {product.specifications}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">Không có thông tin thông số kỹ thuật.</p>
                  <p className="text-xs text-gray-400">Debug info: specifications = &quot;{product.specifications}&quot;</p>
                </div>
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
                        onClick={() => openImage(product.images.main)}
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
                        onClick={() => openImage(imgUrl)}
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
                            onClick={() => openImage(product.images[key])}
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
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full p-2">
            {/* Nút đóng */}
            <button 
              className="absolute top-4 right-4 text-white bg-black/70 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black z-10"
              onClick={e => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <span className="text-2xl font-bold">×</span>
            </button>
            
            {/* Nút điều hướng trái */}
            {allImages.length > 1 && (
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/70 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black z-10"
                onClick={e => { e.stopPropagation(); goToPrevImage(); }}
              >
                <span className="text-2xl font-bold">‹</span>
              </button>
            )}
            
            {/* Nút điều hướng phải */}
            {allImages.length > 1 && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/70 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black z-10"
                onClick={e => { e.stopPropagation(); goToNextImage(); }}
              >
                <span className="text-2xl font-bold">›</span>
              </button>
            )}
            
            {/* Chỉ số ảnh */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/70 px-4 py-2 rounded-full z-10">
                <span className="text-sm font-medium">
                  {selectedImageIndex + 1} / {allImages.length}
                </span>
              </div>
            )}
            
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Phóng to"
                width={2400}
                height={1800}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{ 
                  minWidth: '80vw',
                  minHeight: '80vh'
                }}
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
          overflow: auto;
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
