"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <DefaultLayout>
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
            Liên hệ
          </h1>
          <p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
            Gửi thông tin liên hệ, NIAD sẽ phản hồi bạn trong thời gian sớm nhất.
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-[#f0f2f5]">
        <section className="max-w-2xl mx-auto px-4 py-16">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col gap-6">
            <div>
              <label className="block text-[#03bb65] font-bold mb-2">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#03bb65] focus:ring-2 focus:ring-[#03bb65]/20 outline-none bg-[#f8f8f8] text-base"
                placeholder="Nhập họ tên của bạn"
              />
            </div>
            <div>
              <label className="block text-[#03bb65] font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#03bb65] focus:ring-2 focus:ring-[#03bb65]/20 outline-none bg-[#f8f8f8] text-base"
                placeholder="Nhập email liên hệ"
              />
            </div>
            <div>
              <label className="block text-[#03bb65] font-bold mb-2">Nội dung</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#03bb65] focus:ring-2 focus:ring-[#03bb65]/20 outline-none bg-[#f8f8f8] text-base resize-none"
                placeholder="Nhập nội dung liên hệ..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#03bb65] text-white font-bold text-lg shadow hover:bg-[#006c67] transition"
            >
              Gửi liên hệ
            </button>
            {sent && (
              <div className="text-center text-[#03bb65] font-semibold mt-2">Cảm ơn bạn đã liên hệ! NIAD sẽ phản hồi sớm nhất.</div>
            )}
          </form>
          <div className="mt-12 text-center text-[#6e6e73] text-base">
            <div className="mb-2 font-semibold">Hoặc liên hệ trực tiếp:</div>
            <div>Địa chỉ: Số 123, Đường ABC, Quận XYZ, Hà Nội</div>
            <div>Điện thoại: <a href="tel:0123456789" className="text-[#03bb65] font-bold">0123 456 789</a></div>
            <div>Email: <a href="mailto:info@niad.vn" className="text-[#03bb65] font-bold">info@niad.vn</a></div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
