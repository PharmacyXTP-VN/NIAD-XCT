// File: src/app/news/page.tsx
"use client";
import Link from "next/link";
import { newsList } from "@/data/news";
import Image from "next/image";
import { useState } from "react";
import DefaultLayout from "@/layout/DefaultLayout";

function getFirstImageSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

const PAGE_SIZE = 5;

export default function NewsListPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(newsList.length / PAGE_SIZE);
  const pagedNews = newsList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <DefaultLayout>
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Bài viết nổi bật
          </h1>
          <p className="text-2xl md:text-3xl text-red-100 max-w-2xl mx-auto font-medium mb-6">
            Tổng hợp các bài viết chia sẻ về kinh nghiệm, sản phẩm, dịch vụ mới
            nhất từ NIAD.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              Front-end / Mobile apps
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              Back-end / Devops
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              UI / UX / Design
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-base font-medium text-white border border-white/20 cursor-pointer hover:bg-white/20 hover:text-yellow-200 transition">
              Tin tức NIAD
            </span>
          </div>
        </div>
      </section>
      <div className="w-full min-h-screen bg-[#f7f7fa] pt-12 pb-24">
        <div className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar (optional) */}
          <aside className="hidden md:block col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="bg-gradient-to-r from-[#17877b] to-[#7ee8c7] rounded-2xl p-6 text-white shadow text-center">
                <div className="font-bold text-lg mb-2">Đăng ký nhận tin</div>
                <p className="text-sm mb-3">
                  Nhận thông báo về sản phẩm, ưu đãi và sự kiện mới nhất từ
                  NIAD.
                </p>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-5 py-3 rounded-lg mb-3 text-white text-base border-none focus:ring-2 focus:ring-[#17877b] transition-all duration-200"
                  style={{ minWidth: "220px" }}
                />
                <button className="w-full bg-white text-[#17877b] font-bold rounded-lg py-3 hover:bg-[#17877b] hover:text-white transition-all duration-200 text-base shadow">
                  Đăng ký
                </button>
              </div>
            </div>
          </aside>
          {/* Main content */}
          <main className="col-span-2 space-y-6">
            {pagedNews.map((news) => {
              const imgSrc = getFirstImageSrc(news.content);
              return (
                <div
                  key={news.id}
                  className="bg-white rounded-2xl shadow border border-gray-100 flex flex-col md:flex-row items-stretch group hover:shadow-lg transition-shadow duration-200 relative"
                >
                  <div className="flex-1 flex flex-col p-6 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#b8001c] text-sm">
                        N
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        NIAD
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold mb-1 text-gray-900 group-hover:text-red-600 transition">
                      <Link href={`/news/${news.id}`}>{news.title}</Link>
                    </h2>
                    <div className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {news.content.replace(/<[^>]+>/g, " ").slice(0, 120) +
                        (news.content.length > 120 ? "..." : "")}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        Tin tức NIAD
                      </span>
                    </div>
                    <Link
                      href={`/news/${news.id}`}
                      className="inline-block mt-auto px-5 py-2 bg-[#22bfa2] text-white rounded-full font-semibold text-xs shadow hover:bg-[#17877b] transition-colors duration-200"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                  {imgSrc && (
                    <div className="flex-shrink-0 w-full md:w-56 h-40 md:h-40 relative md:rounded-r-2xl overflow-hidden flex items-center justify-center bg-white">
                      <Image
                        src={imgSrc}
                        alt={news.title}
                        fill
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 224px"
                      />
                    </div>
                  )}
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
                    title="Lưu bài viết"
                  >
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
                        d="M5 5v14l7-5 7 5V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-bold shadow border-2 transition-colors duration-200 ${
                      page === i + 1
                        ? "bg-[#b8001c] text-white border-[#b8001c]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Sau
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}
