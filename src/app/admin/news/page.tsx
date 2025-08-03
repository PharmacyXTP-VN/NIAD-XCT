"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import CKEditor to avoid SSR issues
const CKEditorWrapper = dynamic(
  () => import('./CKEditorWrapper'),
  { ssr: false, loading: () => <div>Loading editor...</div> }
);


interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  summary?: string;
  thumbnail?: string;
  publishedAt?: string;
  tags?: string[];
  status?: string;
}
  
export default function AdminNews() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editNews, setEditNews] = useState<NewsItem | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`/api/news/list?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setNewsList(
            data.data.map((n: any) => ({
              id: n._id || n.id,
              title: n.title,
              date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString() : '',
              content: n.content || '',
              summary: n.summary,
              thumbnail: n.thumbnail,
              publishedAt: n.publishedAt,
            }))
          );
          setTotalPages(data.totalPages || 1);
        }
      });
  }, [page, limit]);

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        const response = await fetch(`/api/news/delete/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Xóa tin tức thành công!');
          // Refresh danh sách
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        } else {
          const error = await response.json();
          alert(`Lỗi: ${error.message || 'Xóa thất bại'}`);
        }
      } catch {
        alert('Lỗi kết nối server');
      }
    }
  };

  const handleEdit = async (news: NewsItem) => {
    try {
      // Gọi API get news by ID để lấy thông tin chi tiết
      const response = await fetch(`/api/news/${news.id}`);
      if (response.ok) {
        const data = await response.json();
        const detailedNews = {
          id: data.data._id || data.data.id,
          title: data.data.title,
          date: data.data.publishedAt ? new Date(data.data.publishedAt).toISOString().slice(0, 10) : '',
          content: data.data.content || '',
          summary: data.data.summary,
          thumbnail: data.data.thumbnail,
          publishedAt: data.data.publishedAt,
          tags: data.data.tags || [],
          status: data.data.status || 'active',
        };
        setEditNews(detailedNews);
        setShowForm(true);
      } else {
        alert('Không thể tải thông tin tin tức');
      }
    } catch {
      alert('Lỗi kết nối server');
    }
  };

  const handleAdd = () => {
    setEditNews(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (news: NewsItem) => {
    try {
      const formData = new FormData();
      
      // Thêm các field bắt buộc
      formData.append('title', news.title || '');
      formData.append('content', news.content || '');
      formData.append('summary', news.summary || '');
      formData.append('publishedAt', news.date || '');
      formData.append('status', news.status || 'active');
      formData.append('tags', JSON.stringify(news.tags || []));
      formData.append('createdBy', '64d26e4012cfa1b40e96a001'); // ID user tạo
      
      // Thêm ảnh thumbnail nếu có
      if (news.thumbnail && news.thumbnail.startsWith('data:')) {
        // Convert base64 to file
        const response = await fetch(news.thumbnail);
        const blob = await response.blob();
        const file = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
        formData.append('thumbnail', file);
      }
      
      const apiUrl = news.id ? `/api/news/${news.id}` : '/api/news/create';
      const method = news.id ? 'PUT' : 'POST';
      
      const response = await fetch(apiUrl, {
        method,
        body: formData,
      });
      
      if (response.ok) {
        await response.json();
        alert(news.id ? 'Cập nhật tin tức thành công!' : 'Tạo tin tức thành công!');
        setShowForm(false);
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        const error = await response.json();
        alert(`Lỗi: ${error.message || 'Thao tác thất bại'}`);
      }
    } catch {
      alert('Lỗi kết nối server');
    }
  };

  return (
    <> 
      <section className="mb-8">
        <div className="bg-gradient-to-r from-[#006b68] to-[#1a1a1a] text-white rounded-3xl shadow-xl p-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide drop-shadow">Quản lý tin tức</h1>
          <button
            onClick={handleAdd}
            className="bg-white text-[#006b68] font-bold px-6 py-2 rounded-xl shadow hover:bg-[#006b68] hover:text-white transition"
          >
            + Thêm tin tức
          </button>
        </div>
      </section>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-[#006b68] text-lg">
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
                <td className="py-2 px-3 max-w-xs truncate text-black">{n.summary || n.content.replace(/<[^>]+>/g, '').slice(0, 60)}...</td>
                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(n)}
                    className="px-3 py-1 rounded bg-[#006b68] text-white font-bold hover:bg-black transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="px-3 py-1 rounded bg-gray-200 text-[#006b68] font-bold hover:bg-gray-300 transition"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
              ${page === 1 ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-[#006b68] text-[#006b68] hover:bg-[#006b68] hover:text-white'}`}
          >
            &#8592;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
                ${page === i + 1 ? 'bg-[#006b68] border-[#006b68] text-white' : 'bg-white border-[#006b68] text-[#006b68] hover:bg-[#006b68] hover:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
              ${page === totalPages ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-[#006b68] text-[#006b68] hover:bg-[#006b68] hover:text-white'}`}
          >
            &#8594;
          </button>
        </div>
      )}
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
    news || { 
      id: '', 
      title: '', 
      date: new Date().toISOString().slice(0, 10), 
      content: '',
      summary: '',
      thumbnail: '',
      tags: [],
      status: 'active'
    }
  );
  const [loading, setLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Cập nhật form khi news thay đổi
  React.useEffect(() => {
    if (news) {
      setForm({
        id: news.id,
        title: news.title,
        date: news.date,
        content: news.content,
        summary: news.summary || '',
        thumbnail: news.thumbnail || '',
        tags: news.tags || [],
        status: news.status || 'active',
      });
      // Reset thumbnail file khi chuyển sang news khác
      setThumbnailFile(null);
    }
  }, [news]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (news?.id) {
        // Update existing news
        const formData = new FormData();
        
        // Thêm các field text
        formData.append('title', form.title);
        formData.append('summary', form.summary || '');
        formData.append('content', form.content || '');
        formData.append('tags', JSON.stringify(form.tags || []));
        formData.append('status', form.status || 'active');
        formData.append('publishedAt', form.date);
        
        // Thêm ảnh thumbnail nếu có
        if (thumbnailFile) {
          formData.append('thumbnail', thumbnailFile);
        } else if (form.thumbnail) {
          formData.append('thumbnail', form.thumbnail);
        }
        
        const response = await fetch(`/api/news/${news.id}`, {
          method: 'PUT',
          body: formData,
        });
        
        if (response.ok) {
          alert('Cập nhật tin tức thành công!');
          onClose();
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        } else {
          const error = await response.json();
          alert(`Lỗi: ${error.message || 'Cập nhật thất bại'}`);
        }
      } else {
        // Create new news
        onSubmit(form);
      }
    } catch {
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 w-full max-w-lg md:max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl z-10"
        >
          ×
        </button>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#006b68] pr-8">
          {news ? "Sửa tin tức" : "Thêm tin tức"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-black">Tiêu đề *</label>
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Nhập tiêu đề tin tức"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-black">Mô tả ngắn</label>
            <textarea
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Mô tả ngắn gọn về tin tức"
              value={form.summary}
              onChange={e => setForm({ ...form, summary: e.target.value })}
              rows={3}
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-black">Ảnh thumbnail</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-3 rounded-xl text-lg text-black"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setThumbnailFile(file);
                  
                  // Tạo preview
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    setForm({ ...form, thumbnail: result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {form.thumbnail && (
              <div className="mt-2">
                <Image
                  src={form.thumbnail}
                  alt="Thumbnail preview"
                  width={128}
                  height={96}
                  className="w-32 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...form, thumbnail: '' });
                    setThumbnailFile(null);
                  }}
                  className="text-[#006b68] text-xs mt-1 block"
                >
                  Xóa ảnh
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-black">Tags</label>
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="tin mới, xe chở tiền, an toàn (phân cách bằng dấu phẩy)"
              value={form.tags?.join(', ') || ''}
              onChange={e => setForm({ 
                ...form, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
              })}
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-black">Trạng thái</label>
            <select
              className="w-full border p-3 rounded-xl text-lg text-black"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-black">Ngày đăng</label>
            <input
              type="date"
              className="w-full border p-3 rounded-xl text-lg text-black"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1 text-black">Nội dung *</label>
            <div className="border rounded-xl overflow-hidden">
              <style jsx>{`
                .ck-editor__editable {
                  min-height: 300px !important;
                  max-height: 500px !important;
                }
                .ck.ck-editor {
                  width: 100% !important;
                }
                .ck.ck-editor__main > .ck-editor__editable {
                  background-color: white !important;
                  color: black !important;
                }
              `}</style>
              <CKEditorWrapper
                data={form.content}
                onChange={(data) => setForm({ ...form, content: data })}
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#b8001c] text-white font-bold py-3 rounded-xl hover:bg-black transition disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : (news ? "Cập nhật" : "Thêm mới")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-[#b8001c] font-bold py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
