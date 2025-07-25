// ✅ File: src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdminPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Lưu user info vào localStorage hoặc cookie nếu cần
        localStorage.setItem("user", JSON.stringify(data.user));
        // Chuyển hướng vào dashboard
        router.push("/admin/dashboard");
      } else {
        setError(data.message || data.error || "Đăng nhập thất bại");
      }
    } catch {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b8001c] via-black to-white">
      <div className="max-w-md w-full bg-white/90 shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#b8001c] drop-shadow">
          Đăng nhập Admin
        </h2>
        {error && (
          <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Tài khoản"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8001c] text-lg text-black placeholder:text-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8001c] text-lg text-black placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#b8001c] to-black text-white py-3 rounded-xl font-bold text-lg shadow hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
