"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    
    // Remove authentication cookie
    document.cookie = "admin_auth=false; path=/; max-age=0";
    
    // Redirect to login page
    router.push("/admin/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Đang đăng xuất...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b8001c] mx-auto"></div>
      </div>
    </div>
  );
}
