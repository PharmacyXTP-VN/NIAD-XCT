"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  }, [router]);
  return <div className="min-h-screen flex items-center justify-center text-lg">Đang đăng xuất...</div>;
}
