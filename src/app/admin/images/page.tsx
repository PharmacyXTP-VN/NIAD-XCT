"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSetting {
  _id: string;
  type: "banner" | "partner" | "advantage" | "page-banner" | "about";
  title: string;
  description: string;
  url: string;
  order: number;
  active: boolean;
  createdAt: string;
}

export default function ImagesAdmin() {
  const [activeTab, setActiveTab] = useState<"banner" | "partner" | "advantage" | "page-banner" | "about">("banner");
  const [images, setImages] = useState<ImageSetting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 0,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  // Load images based on active tab
  useEffect(() => {
    fetchImages(activeTab);
  }, [activeTab]);

  const fetchImages = async (type: "banner" | "partner" | "advantage" | "page-banner" | "about") => {
    setLoading(true);
    setError(null);
    try {
      // Sử dụng tham số [type] trong API route
      const res = await fetch(`/api/images/types/${type}`);
      const data = await res.json();
      if (res.ok) {
        setImages(data.data || []);
      } else {
        setError(data.message || "Failed to load images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      // Sử dụng tham số [id] trong API route
      const res = await fetch(`/api/images/item/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Refresh the images list
        fetchImages(activeTab);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Error connecting to server");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", activeTab);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("order", formData.order.toString());
      
      // Include image if provided
      if (formImage) {
        formDataToSend.append("image", formImage);
      }
      
      // For edit operations
      if (editId) {
        formDataToSend.append("updatedBy", "64d26e4012cfa1b40e96a001"); // Default admin user ID
      } else {
        formDataToSend.append("createdBy", "64d26e4012cfa1b40e96a001"); // Default admin user ID
      }

      // Sử dụng tham số [id] cho cập nhật, route gốc cho thêm mới
      const url = editId ? `/api/images/item/${editId}` : "/api/images";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await res.json();
      
      if (res.ok) {
        // Reset form and refresh images list
        resetForm();
        fetchImages(activeTab);
      } else {
        setError(data.message || "Failed to save image");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      setError("Error connecting to server");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (image: ImageSetting) => {
    setFormData({
      title: image.title,
      description: image.description,
      order: image.order,
    });
    setEditId(image._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      order: 0,
    });
    setFormImage(null);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-6">
       <div className="bg-gradient-to-r from-[#006b68] to-[#1a1a1a] text-white rounded-3xl shadow-xl p-8 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide drop-shadow">
          Quản lý hình ảnh
        </h1>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "banner"
              ? "text-[#b8001c] border-b-2 border-[#b8001c]"
              : "text-gray-600 hover:text-[#b8001c]"
          }`}
          onClick={() => setActiveTab("banner")}
        >
          Banner chính
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "page-banner"
              ? "text-[#b8001c] border-b-2 border-[#b8001c]"
              : "text-gray-600 hover:text-[#b8001c]"
          }`}
          onClick={() => setActiveTab("page-banner")}
        >
          Banner trang con
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "advantage"
              ? "text-[#b8001c] border-b-2 border-[#b8001c]"
              : "text-gray-600 hover:text-[#b8001c]"
          }`}
          onClick={() => setActiveTab("advantage")}
        >
          Ưu điểm vượt trội
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "partner"
              ? "text-[#b8001c] border-b-2 border-[#b8001c]"
              : "text-gray-600 hover:text-[#b8001c]"
          }`}
          onClick={() => setActiveTab("partner")}
        >
          Đối tác & Khách hàng
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "about"
              ? "text-[#b8001c] border-b-2 border-[#b8001c]"
              : "text-gray-600 hover:text-[#b8001c]"
          }`}
          onClick={() => setActiveTab("about")}
        >
          Trang Giới thiệu
        </button>
      </div>

      {/* Add button */}
      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="mb-6 bg-[#006b68] hover:bg-[#006b68] text-white font-bold py-2 px-4 rounded"
      >
        + Thêm ảnh mới
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Image grid */}
      {loading ? (
        <div className="text-center py-8">Đang tải dữ liệu...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {image.title || `Ảnh ${image.order}`}
                </h3>
                {image.description && (
                  <p className="text-gray-600 text-sm mt-1">{image.description}</p>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Thứ tự: {image.order}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editId ? "Sửa ảnh" : "Thêm ảnh mới"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormImage(e.target.files[0]);
                    }
                  }}
                  className="w-full border rounded px-3 py-2"
                />
                {editId && !formImage && (
                  <p className="text-sm text-gray-500 mt-1">
                    Để trống nếu không muốn thay đổi ảnh
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tiêu đề</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Thứ tự</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  min="0"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  disabled={formLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006b68] text-white rounded hover:bg-[#006b68]"
                  disabled={formLoading}
                >
                  {formLoading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
