// File: src/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  // const toggleProductDropdown = () =>
  //   setIsProductDropdownOpen(!isProductDropdownOpen);

  return (
    <>
      {/* Gradient accent bar nằm ngoài header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-2 md:px-6 h-[64px] md:h-[80px] flex items-center justify-between gap-2 md:gap-10">
          {/* Navigation Split */}
          <div className="hidden md:flex w-full items-center gap-10 text-base font-semibold tracking-widest uppercase text-black relative">
            <div
              className="flex-shrink-0 flex items-center justify-start"
              style={{ minWidth: 120 }}
            >
              <Link href="/">
                <Image
                  src="/images/logo-niad/logo-nias.png"
                  alt="Niad Logo"
                  className="h-10 w-auto object-contain drop-shadow-lg"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>
            <div className="flex-1 flex justify-end items-center gap-10">
              <Link
                href="#aboutCTA"
                scroll={false}
                className="hover:text-red-600 transition-colors duration-200 header-link"
                onClick={e => {
                  e.preventDefault();
                  const section = document.getElementById("aboutCTA");
                  if (section) {
                    const y =
                      section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Về NIAD
              </Link>
              <Link
                href="#moneyTruckAccordion"
                scroll={false}
                className="hover:text-red-600 transition-colors duration-200 header-link"
                onClick={e => {
                  e.preventDefault();
                  const section = document.getElementById("moneyTruckAccordion");
                  if (section) {
                    const y =
                      section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Ưu điểm vượt trội
              </Link>
              <Link
                href="#main-products"
                scroll={false}
                className="hover:text-red-600 transition-colors duration-200 header-link"
                onClick={e => {
                  e.preventDefault();
                  const section = document.getElementById("main-products");
                  if (section) {
                    const y =
                      section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Sản phẩm
              </Link>
              <Link
                href="#follow-us"
                scroll={false}
                className="hover:text-red-600 transition-colors duration-200 header-link"
                onClick={e => {
                  e.preventDefault();
                  const section = document.getElementById("follow-us");
                  if (section) {
                    const y =
                      section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Theo dõi
              </Link>
              <Link
                href="#news-section"
                scroll={false}
                className="hover:text-red-600 transition-colors duration-200 header-link"
                onClick={e => {
                  e.preventDefault();
                  const section = document.getElementById("news-section");
                  if (section) {
                    const y =
                      section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Tin tức
              </Link>
              <Link
                href="#contact"
                scroll={false}
                className="hover:text-red-600 transition-colors duration-200 header-link"
                onClick={e => {
                  e.preventDefault();
                  const section = document.getElementById("contact");
                  if (section) {
                    const y =
                      section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Liên hệ
              </Link>
            </div>
          </div>
          {/* Mobile button */}
          <button
            className="md:hidden p-2 rounded-lg border border-gray-200 bg-white shadow-sm"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="h-7 w-7 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-2 pb-6 pt-2 space-y-2 text-base font-semibold tracking-widest uppercase text-black shadow-xl animate-fadeIn">
            <Link
              href="#aboutCTA"
              scroll={false}
              className="mobile-link block py-3 px-2 rounded hover:bg-gray-100 transition"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const section = document.getElementById("aboutCTA");
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Về NIAD
            </Link>
            <Link
              href="#moneyTruckAccordion"
              scroll={false}
              className="mobile-link block py-3 px-2 rounded hover:bg-gray-100 transition"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const section = document.getElementById("moneyTruckAccordion");
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Ưu điểm vượt trội
            </Link>
            <Link
              href="#main-products"
              scroll={false}
              className="mobile-link block py-3 px-2 rounded hover:bg-gray-100 transition"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const section = document.getElementById("main-products");
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Sản phẩm
            </Link>
            <Link
              href="#follow-us"
              scroll={false}
              className="mobile-link block py-3 px-2 rounded hover:bg-gray-100 transition"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const section = document.getElementById("follow-us");
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Theo dõi
            </Link>
            <Link
              href="#news-section"
              scroll={false}
              className="mobile-link block py-3 px-2 rounded hover:bg-gray-100 transition"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const section = document.getElementById("news-section");
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Tin tức
            </Link>
            <Link
              href="#contact"
              scroll={false}
              className="mobile-link block py-3 px-2 rounded hover:bg-gray-100 transition"
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                const section = document.getElementById("contact");
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Liên hệ
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
