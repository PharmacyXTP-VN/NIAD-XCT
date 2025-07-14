// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Niad chuyên cung cấp xe chở tiền",
  description: "Niad - Đơn vị hàng đầu cung cấp xe chở tiền chuyên dụng tại Việt Nam.",
  icons: {
    icon: "/images/logo-niad/logo-nias.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
