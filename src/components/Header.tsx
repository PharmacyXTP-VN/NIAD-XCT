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
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          {/* Navigation Split */}
          <div className="hidden md:flex flex-1 justify-start items-center gap-10 text-base font-semibold tracking-widest uppercase text-black relative">
            <Link
              href="/"
              className="flex items-center hover:text-red-600 transition-colors duration-200 header-link mr-2"
            >
              Trang Chủ
            </Link>
            <Link
              href="/about"
              className="hover:text-red-600 transition-colors duration-200 header-link"
            >
              Về Chúng tôi
            </Link>
            <Link
            href="/main-product"
              className="relative"
            >
              <button
                className="hover:text-red-600 flex items-center gap-2 h-[80px] px-2 transition-colors duration-200 header-link"
              >
                SẢN PHẨM
                
              </button>
            </Link>
          </div>
          {/* Logo center */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-niad/logo-nias.png"
              width={100}
              height={40}
              alt="NIAD Logo"
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
            className="md:hidden p-2 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center gap-2 font-semibold uppercase text-base tracking-widest text-black"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="hidden xs:inline">Menu</span>
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
          <div className="md:hidden bg-white px-6 pb-6 pt-2 space-y-2 text-base font-semibold tracking-widest uppercase text-black shadow-xl animate-fadeIn flex flex-col">
            <Link href="/" className="mobile-link flex items-center py-3 border-b border-gray-100">
              Trang Chủ
            </Link>
            <Link href="/about" className="mobile-link flex items-center py-3 border-b border-gray-100">
              Về Chúng tôi
            </Link>
            <Link href="/news" className="mobile-link flex items-center py-3 border-b border-gray-100">
              Tin tức và ưu đãi
            </Link>
            <Link href="/contact" className="mobile-link flex items-center py-3 border-b border-gray-100">
              Liên hệ
            </Link>
            <button
              className="flex items-center gap-2 py-3 w-full text-left border-b border-gray-100 mobile-link"
              aria-label="Tìm kiếm"
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
              <span>Tìm kiếm</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
}
