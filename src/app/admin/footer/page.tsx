// File: src/app/admin/footer/page.tsx
"use client";
import { useState, useEffect } from "react";

interface FooterContent {
  address: string;
  phone: string;
  email: string;
  website: string;
  embedMap: string;
}


export default function FooterAdminPage() {
  const [content, setContent] = useState<FooterContent>({
    address: "",
    phone: "",
    email: "",
    website: "",
    embedMap: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/footer-content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setContent(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/footer-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (res.ok) setMessage("Đã lưu thành công!");
    else setMessage("Có lỗi khi lưu!");
    setSaving(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#006b68] to-[#1a1a1a] rounded-3xl shadow-xl p-8 mb-8 flex items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg uppercase">QUẢN LÝ NỘI DUNG FOOTER</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-2xl shadow p-8">
            {loading ? (
              <div className="text-center text-gray-500 py-8">Đang tải...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-4">
                  <label className="w-40 block font-semibold mb-0 text-left" htmlFor="address">Địa chỉ</label>
                  <input id="address" name="address" value={content.address} onChange={handleChange} className="flex-1 border rounded px-3 py-2" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 block font-semibold mb-0 text-left" htmlFor="phone">Điện thoại</label>
                  <input id="phone" name="phone" value={content.phone} onChange={handleChange} className="flex-1 border rounded px-3 py-2" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 block font-semibold mb-0 text-left" htmlFor="email">Email</label>
                  <input id="email" name="email" value={content.email} onChange={handleChange} className="flex-1 border rounded px-3 py-2" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 block font-semibold mb-0 text-left" htmlFor="website">Website</label>
                  <input id="website" name="website" value={content.website} onChange={handleChange} className="flex-1 border rounded px-3 py-2" />
                </div>
                <div className="flex items-start gap-4">
                  <label className="w-40 block font-semibold mb-0 text-left pt-2" htmlFor="embedMap">Link nhúng Google Map (embed)</label>
                  <div className="flex-1">
                    <input id="embedMap" name="embedMap" value={content.embedMap} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="https://www.google.com/maps/embed?..." />
                    <div className="text-xs text-gray-500 mt-1">
                    <b>Hướng dẫn lấy link nhúng Google Map:</b><br />
                    1. Vào <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Google Maps</a> và tìm địa chỉ cần nhúng.<br />
                    2. Nhấn nút <b>Chia sẻ</b> (Share) &rarr; chọn tab <b>Nhúng bản đồ</b> (Embed a map).<br />
                    3. Copy đoạn mã &lt;iframe ...&gt; hiện ra.<br />
                    4. Dán <b>link trong thuộc tính src</b> của thẻ &lt;iframe&gt; vào ô này.<br />
                    <i>Ví dụ: https://www.google.com/maps/embed?pb=...</i>
                  </div>
                </div>
              </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-[#006b68] text-white px-6 py-2 rounded font-bold text-lg hover:bg-[#005a58] transition" disabled={saving}>
                    {saving ? "Đang lưu..." : "Lưu"}
                  </button>
                </div>
                {message && <div className="mt-2 text-green-600 text-center">{message}</div>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
