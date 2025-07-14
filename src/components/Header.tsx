// File: src/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProductDropdown = () =>
    setIsProductDropdownOpen(!isProductDropdownOpen);

  return (
    <>
      {/* Gradient accent bar nằm ngoài header */}
      <div className="w-full h-2 bg-gradient-to-r from-red-600 via-black to-white" />
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          {/* Navigation Split */}
          <div className="hidden md:flex flex-1 justify-start items-center gap-10 text-base font-semibold tracking-widest uppercase text-black relative">
            <Link
              href="/"
              className="flex items-center hover:text-red-600 transition-colors duration-200 header-link mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l9-7 9 7M4.5 10.5V19a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0010.5 19V15a1.5 1.5 0 011.5-1.5h0A1.5 1.5 0 0113.5 15v4a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0020 19v-8.5"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="hover:text-red-600 transition-colors duration-200 header-link"
            >
              Về NIAD
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsProductDropdownOpen(true)}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
            >
              <button
                className="hover:text-red-600 flex items-center gap-2 h-[80px] px-2 transition-colors duration-200 header-link"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={isProductDropdownOpen}
              >
                SẢN PHẨM
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isProductDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isProductDropdownOpen && (
                <div className="absolute left-0 pl-[8px] top-full bg-white shadow-xl border border-gray-200 py-3 min-w-[200px] z-50 flex flex-col gap-1 animate-fadeIn pl">
                  <Link href="/features" className="dropdown-link">
                    Ưu điểm nổi bật
                  </Link>
                  <Link href="/main-products" className="dropdown-link">
                    Sản phẩm chính
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* Logo center */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/test2-removebg-preview.png"
              alt="KIA Logo"
              className="h-10 w-auto object-contain drop-shadow-lg"
            />
          </Link>
          {/* Right side nav */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-10 text-base font-semibold tracking-widest uppercase text-black">
            <Link
              href="/news"
              className="hover:text-red-600 transition-colors duration-200 header-link"
            >
              Tin tức và ưu đãi
            </Link>
            <Link
              href="/contact"
              className="hover:text-red-600 transition-colors duration-200 header-link"
            >
              Liên hệ
            </Link>
            <button
              aria-label="Search"
              className="ml-2 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                />
              </svg>
            </button>
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
          <div className="md:hidden bg-white px-6 pb-6 pt-2 space-y-4 text-base font-semibold tracking-widest uppercase text-black shadow-xl animate-fadeIn">
            <Link href="/about" className="mobile-link">
              Về Kia
            </Link>
            <div>
              <button
                onClick={toggleProductDropdown}
                className="flex items-center justify-between w-full mobile-link"
              >
                Sản phẩm
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isProductDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isProductDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link href="/features" className="mobile-dropdown-link">
                    Ưu điểm nổi bật
                  </Link>
                  <Link href="/main-products" className="mobile-dropdown-link">
                    Sản phẩm chính
                  </Link>
                </div>
              )}
            </div>
            <Link href="/news" className="mobile-link">
              Tin tức và ưu đãi
            </Link>
            <Link href="/contact" className="mobile-link">
              Liên hệ
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
