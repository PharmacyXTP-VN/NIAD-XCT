"use client";

import { useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}
  
export default function AdminNews() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editNews, setEditNews] = useState<NewsItem | null>(null);

  const handleDelete = (id: string) => {
    setNewsList(newsList.filter((n) => n.id !== id));
  };

  const handleEdit = (news: NewsItem) => {
    setEditNews(news);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditNews(null);
    setShowForm(true);
  };

  const handleFormSubmit = (news: NewsItem) => {
    if (news.id) {
      setNewsList(newsList.map((n) => (n.id === news.id ? news : n)));
    } else {
      setNewsList([
        ...newsList,
        { ...news, id: Date.now().toString() },
      ]);
    }
    setShowForm(false);
  };

  return (
    <> 
      <section className="mb-8">
        <div className="bg-gradient-to-r from-[#b8001c] to-[#1a1a1a] text-white rounded-3xl shadow-xl p-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide drop-shadow">Quản lý tin tức</h1>
          <button
            onClick={handleAdd}
            className="bg-white text-[#b8001c] font-bold px-6 py-2 rounded-xl shadow hover:bg-[#b8001c] hover:text-white transition"
          >
            + Thêm tin tức
          </button>
        </div>
      </section>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-[#b8001c] text-lg">
              <th className="py-2 px-3">Tiêu đề</th>
              <th className="py-2 px-3">Ngày đăng</th>
              <th className="py-2 px-3">Mô tả</th>
              <th className="py-2 px-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((n) => (
              <tr key={n.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3 font-semibold text-black">{n.title}</td>
                <td className="py-2 px-3 text-black">{n.date}</td>
                <td className="py-2 px-3 max-w-xs truncate text-black">{n.content.replace(/<[^>]+>/g, '').slice(0, 60)}...</td>
                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(n)}
                    className="px-3 py-1 rounded bg-[#b8001c] text-white font-bold hover:bg-black transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="px-3 py-1 rounded bg-gray-200 text-[#b8001c] font-bold hover:bg-red-100 transition"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <NewsForm
          news={editNews}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

function NewsForm({ news, onClose, onSubmit }: { news: NewsItem | null, onClose: () => void, onSubmit: (n: NewsItem) => void }) {
  const [form, setForm] = useState<NewsItem>(
    news || { id: '', title: '', date: new Date().toISOString().slice(0, 10), content: '' }
  );
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#b8001c]">
          {news ? "Sửa tin tức" : "Thêm tin tức"}
        </h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-4"
        >
          <input
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Tiêu đề"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg"
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />
          <textarea
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Mô tả (HTML hoặc văn bản)"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            rows={3}
          />
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-[#b8001c] text-white font-bold py-3 rounded-xl hover:bg-black transition"
            >
              {news ? "Cập nhật" : "Thêm mới"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-[#b8001c] font-bold py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
