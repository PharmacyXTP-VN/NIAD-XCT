
// File: src/components/Footer.tsx
"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterContent {
  address: string;
  phone: string;
  email: string;
  website: string;
  embedMap: string;
}

export default function Footer() {
  const [content, setContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    fetch("/api/footer-content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setContent(data.data);
          console.log("[Footer] content from API:", data.data);
        } else {
          console.log("[Footer] No data from API", data);
        }
      })
      .catch((err) => {
        console.error("[Footer] Fetch error:", err);
      });
  }, []);


  // Helper: kiểm tra email


  return (
    <footer className="bg-[#006b68] text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo, Company Name and Map */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-4 mb-8">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            <Image
              src="/images/logo-niad/logo-niad-white.png"
              alt="NIAD Logo"
              className="w-[160px] h-[60px] object-contain flex-shrink-0"
              width={160}
              height={60}
            />
            
          </div>
        </div>

        {/* Main Footer Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
          {/* Contact Details and Quick Links - Left Column */}
          <div className="space-y-6 text-base">
            {/* Thông tin liên hệ */}
            <div className="space-y-3">
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
                    ĐC: {content?.address || "Tầng 6 số 263 đường Cầu Giấy, phường Dịch Vọng, quận Cầu Giấy, Hà Nội"}
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
                  {content?.phone?.trim() ? (
                    <a
                      href={`tel:${content.phone.trim()}`}
                      className="text-white hover:underline font-semibold"
                    >
                      {content.phone.trim()}
                    </a>
                  ) : (
                    "024 730 44 688"
                  )}
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
                  {content?.email?.trim() ? (
                    <a
                      href={`mailto:${content.email.trim()}`}
                      className="text-white hover:underline font-semibold"
                    >
                      {content.email.trim()}
                    </a>
                  ) : (
                    "taisan@nganluc.vn"
                  )}
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
                  Website: {" "}
                  {content?.website?.trim() ? (
                    <a
                      href={
                        /^https?:\/\//.test(content.website.trim())
                          ? content.website.trim()
                          : `https://${content.website.trim()}`
                      }
                      className="text-white hover:underline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content.website.trim()
                        .replace(/^https?:\/\//, "")
                        .replace(/^www\./, "")}
                    </a>
                  ) : (
                    "nganluc.vn"
                  )}
                </span>
              </div>
            </div>

            {/* Liên kết nhanh - Đã chuyển từ bên phải sang */}
            <div className="mt-16">
              <h3 className="text-xl font-bold text-white mb-4">Liên kết nhanh</h3>
              <div className="grid grid-cols-3 gap-0">
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
                </div>
                <div className="space-y-2">
                  <Link
                    href="/about"
                    className="block text-white/90 hover:text-white transition-colors text-base"
                  >
                    Về chúng tôi
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

          {/* Bản đồ - Right Column */}
          <div>
            <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={content?.embedMap || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8683553050463!2d105.79569839999999!3d21.034306099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab47962a0e01%3A0xd6142d8ad01b6d8f!2zQ8O0bmcgVHkgQ-G7lSBQaOG6p24gxJDhuqd1IFTGsCBWw6AgUGjDoXQgVHJp4buDbiBOZ8OibiBM4buxYw!5e0!3m2!1svi!2s!4v1627877514354!5m2!1svi!2s"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
