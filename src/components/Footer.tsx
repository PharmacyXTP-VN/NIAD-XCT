// File: src/components/Footer.tsx
"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image
            src="/images/logo-niad/logo-nias.png"
            alt="NIAD Logo"
            className="mb-4 w-[120px] h-[40px] object-contain"
            width={120}
            height={40}
          />
          <p className="text-sm text-gray-400">
            NIAD – Chuyên cung cấp xe chở tiền, xe vận chuyển tài sản, giải pháp an
            ninh vận tải tài chính toàn diện.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Liên hệ</h3>
          <p className="text-sm">Hotline: 024 730 446 88</p>
          <p className="text-sm">Email: hotro@nganluc.vn</p>
          <p className="text-sm">
            Địa chỉ: Số 8, ngõ 22, Đường Mỹ Đình, Nam Từ Liêm, Hà Nội
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Liên kết nhanh</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#models" className="hover:text-white">
                Sản phẩm
              </a>
            </li>
            <li>
              <a href="#news" className="hover:text-white">
                Tin tức
              </a>
            </li>
            <li>
              <a href="#promo" className="hover:text-white">
                Ưu đãi
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 NIAD. All rights reserved.
      </div>
    </footer>
  );
}
