// File: src/components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#17877b] to-[#22bfa2] text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Company Name - Above Columns */}
        <div className="flex items-start space-x-4 mb-8">
          <Image
            src="/images/logo-niad/logo-nias.png"
            alt="NIAD Logo"
            className="w-[160px] h-[60px] object-contain flex-shrink-0"
            width={160}
            height={60}
          />
          <div className="space-y-1 flex-1 pl-20">
            <h2 className="text-xl font-bold text-white leading-tight tracking-wide">
              CÔNG TY CỔ PHẦN NIAD
            </h2>
            <div className="w-12 h-1 bg-white/30 rounded-full mb-2"></div>
            <p className="text-base text-white/90 leading-relaxed whitespace-nowrap">
              Chuyên cung cấp xe chở tiền, xe vận chuyển tài sản, giải pháp an
              ninh vận tải tài chính toàn diện.
            </p>
          </div>
        </div>

        {/* Main Footer Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
          {/* Contact Details - Left Column */}
          <div className="space-y-3 text-base">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-white/80 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="text-white/90">
                  ĐC: Tầng 6 số 263 đường Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy,
                  Hà Nội
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-white/80 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-white/90">
                ĐT:{" "}
                <a
                  href="tel:02473044688"
                  className="text-white hover:underline font-semibold"
                >
                  024 730 44 688
                </a>
              </span>
            </div>

            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-white/80 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-white/90">
                Email:{" "}
                <a
                  href="mailto:taisan@nganluc.vn"
                  className="text-white hover:underline font-semibold"
                >
                  taisan@nganluc.vn
                </a>
              </span>
            </div>

            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-white/80 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
              <span className="text-white/90">
                Website:{" "}
                <a
                  href="https://nganluc.vn"
                  className="text-white hover:underline font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nganluc.vn
                </a>
              </span>
            </div>
          </div>

          {/* Quick Links - Right Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Liên kết nhanh</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Link
                  href="/main-product"
                  className="block text-white/90 hover:text-white transition-colors text-base"
                >
                  Sản phẩm
                </Link>
                <Link
                  href="/news"
                  className="block text-white/90 hover:text-white transition-colors text-base"
                >
                  Tin tức
                </Link>
                <Link
                  href="/about"
                  className="block text-white/90 hover:text-white transition-colors text-base"
                >
                  Về chúng tôi
                </Link>
              </div>
              <div className="space-y-2">
                <Link
                  href="/news?tag=ưu đãi"
                  className="block text-white/90 hover:text-white transition-colors text-base"
                >
                  Ưu đãi
                </Link>
                <Link
                  href="/contact"
                  className="block text-white/90 hover:text-white transition-colors text-base"
                >
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-base text-white/80">
              © 2025 NIAD. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
