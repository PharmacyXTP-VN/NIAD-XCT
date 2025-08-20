"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [adminUser, setAdminUser] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Get user information from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAdminUser(user);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);
  
  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    
    // Remove authentication cookie
    document.cookie = "admin_auth=false; path=/; max-age=0";
    
    // Redirect to login page
    window.location.href = "/admin/login";
  };
  
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex bg-[#f7f7fa]">
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 gap-6 border-r border-gray-100">
        <div className="text-2xl font-bold text-[#006b68] mb-8">Admin Panel</div>
        
        {adminUser && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-500">Đăng nhập với</p>
            <p className="font-medium">{adminUser.fullName || adminUser.userName}</p>
          </div>
        )}
        
        <nav className="flex flex-col gap-3 text-base font-semibold">
          <Link href="/admin/dashboard" className="text-black hover:text-[#006b68]">Dashboard</Link>
          <Link href="/admin/products" className="text-black hover:text-[#006b68]">Quản lý sản phẩm</Link>
          <Link href="/admin/news" className="text-black hover:text-[#006b68]">Quản lý tin tức</Link>
          <Link href="/admin/images" className="text-black hover:text-[#006b68]">Quản lý hình ảnh</Link>
          <Link href="/admin/footer" className="text-black hover:text-[#006b68]">Quản lý footer</Link>
          <button 
            onClick={handleLogout}
            className="text-left text-black hover:text-[#006b68] mt-8 font-semibold"
          >
            Đăng xuất
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
