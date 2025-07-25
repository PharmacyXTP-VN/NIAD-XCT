// ✅ File: src/app/admin/register/page.tsx
"use client";
import { useState } from "react";
// import { registerAdmin, loginAdmin } from "@/services/adminService";

export default function RegisterAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await registerAdmin(email, password);
      // const res = await loginAdmin(email, password);
      // localStorage.setItem("adminToken", res.token);
      // router.push("/admin/dashboard");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
      ) {
        setError((err as { response: { data: { message: string } } }).response.data.message || "Đăng ký thất bại");
      } else {
        setError("Đăng ký thất bại");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-8 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký Admin</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
