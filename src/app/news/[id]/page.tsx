// File: src/app/news/[id]/page.tsx
import { newsList } from "@/data/news";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

function getFirstImageSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const news = newsList.find((n) => n.id === params.id);

  if (!news) {
    return notFound();
  }

  const imgSrc = getFirstImageSrc(news.content);

  return (
    <>
      <Header />
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Chi tiết bài viết
          </h1>
          <p className="text-2xl md:text-3xl text-red-100 max-w-2xl mx-auto font-medium mb-6">
            Khám phá thông tin chi tiết và đầy đủ về bài viết từ NIAD.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              Tin tức NIAD
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              Sản phẩm mới
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              Ưu đãi
            </span>
          </div>
        </div>
      </section>

      <div className="w-full min-h-screen bg-[#f7f7fa] pt-12 pb-24">
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Main content */}
          <main>
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-[#b8001c]">
                  Trang chủ
                </Link>
                <span>/</span>
                <Link href="/news" className="hover:text-[#b8001c]">
                  Tin tức
                </Link>
                <span>/</span>
                <span className="text-gray-900">{news.title}</span>
              </nav>

              {/* Article header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#b8001c] text-sm">
                    N
                  </span>
                  <span className="font-medium text-gray-900 text-sm">
                    NIAD
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {news.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                    Tin tức NIAD
                  </span>
                </div>
              </div>

              {/* Featured image */}
              {imgSrc && (
                <div className="mb-6 relative h-64 md:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={news.title}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Article content */}
              <div
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              {/* Article footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#b8001c] transition">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="text-sm">Thích</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#b8001c] transition">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span className="text-sm">Chia sẻ</span>
                    </button>
                  </div>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#22bfa2] text-white rounded-full font-semibold text-sm shadow hover:bg-[#17877b] transition-colors duration-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Quay lại tin tức
                  </Link>
                </div>
              </div>
            </div>

            {/* Related articles */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Bài viết liên quan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsList
                  .filter((n) => n.id !== news.id)
                  .slice(0, 4)
                  .map((relatedNews) => {
                    const relatedImgSrc = getFirstImageSrc(relatedNews.content);
                    return (
                      <Link
                        key={relatedNews.id}
                        href={`/news/${relatedNews.id}`}
                        className="group block"
                      >
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                          {relatedImgSrc && (
                            <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden">
                              <Image
                                src={relatedImgSrc}
                                alt={relatedNews.title}
                                fill
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                sizes="64px"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#b8001c] transition line-clamp-2">
                              {relatedNews.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {relatedNews.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
