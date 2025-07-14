// // ✅ src/components/forms/AdminAuthForm.tsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// interface Props {
//   type: "login" | "register";
// }

// export default function AdminAuthForm({ type }: Props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const url = `/api/admins/${type}`;
//       const res = await axios.post(url, { email, password });

//       if (type === "login") {
//         localStorage.setItem("adminToken", res.data.token);
//         router.push("/admin/dashboard");
//       } else {
//         alert("Đăng ký thành công!");
//         router.push("/admin/login");
//       }
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Lỗi server");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         {type === "login" ? "Đăng nhập Admin" : "Đăng ký Admin"}
//       </h2>

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full mb-4 p-2 border rounded"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Mật khẩu"
//         className="w-full mb-4 p-2 border rounded"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button type="submit" className="w-full bg-black text-white p-2 rounded">
//         {type === "login" ? "Đăng nhập" : "Đăng ký"}
//       </button>
//     </form>
//   );
// }
