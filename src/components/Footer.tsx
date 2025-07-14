// File: src/components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src="/images/test2-removebg-preview.png"
            alt="KIA Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm text-gray-400">
            KIA Việt Nam – Nơi bạn tìm thấy những mẫu xe hiện đại, an toàn và
            đẳng cấp.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Liên hệ</h3>
          <p className="text-sm">Hotline: 1900 545 545</p>
          <p className="text-sm">Email: contact@kiavietnam.vn</p>
          <p className="text-sm">Địa chỉ: 123 Đường KIA, Quận 1, TP.HCM</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Liên kết nhanh</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#models" className="hover:text-white">
                Dòng xe
              </a>
            </li>
            <li>
              <a href="#news" className="hover:text-white">
                Tin tức
              </a>
            </li>
            <li>
              <a href="#promo" className="hover:text-white">
                Khuyến mãi
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
        © 2025 KIA Việt Nam. All rights reserved.
      </div>
    </footer>
  );
}
