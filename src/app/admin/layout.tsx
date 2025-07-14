"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen flex bg-[#f7f7fa]">
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 gap-6 border-r border-gray-100">
        <div className="text-2xl font-bold text-[#b8001c] mb-8">Admin Panel</div>
        <nav className="flex flex-col gap-3 text-base font-semibold">
          <Link href="/admin/dashboard" className="text-black hover:text-red-600">Dashboard</Link>
          <Link href="/admin/products" className="text-black hover:text-red-600">Quản lý sản phẩm</Link>
          <Link href="/admin/news" className="text-black hover:text-red-600">Quản lý tin tức</Link>
          <Link href="/admin/logout" className="text-black hover:text-red-600 mt-8">Đăng xuất</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
