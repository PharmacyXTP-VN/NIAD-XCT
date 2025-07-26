"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react"; // Added for React.useEffect

// Định nghĩa kiểu Product cho đúng với backend
interface Product {
  _id: string;
  name: string;
  manufacturer: string;
  model: string;
  price: number;
  color: string;
  seats: number;
  fuelType: string;
  transmission: string;
  licensePlate: string;
  status: string;
  year: number;
  description: string;
  image: string;
  images?: { [key: string]: string };
  highlights?: { name: string; value: string }[];
  specifications?: string; // URL ảnh thông số kỹ thuật
}

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeBrand, setActiveBrand] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Lấy toàn bộ sản phẩm để tạo filter
  useEffect(() => {
    fetch("/api/car")
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data.data) ? data.data : [];
        setAllProducts(arr);
      });
  }, []);

  // Khi allProducts có data, set filter mặc định 1 lần duy nhất
  useEffect(() => {
    if (allProducts.length > 0 && brands.length === 0) {
      const uniqueBrands = [
        ...new Set(
          allProducts.map((p: any) => p.manufacturer?.toUpperCase() as string)
        ),
      ];
      setBrands(uniqueBrands as string[]);
      setActiveBrand((uniqueBrands[0] as string) || "");
    }
  }, [allProducts, brands.length]);

  useEffect(() => {
    if (allProducts.length > 0 && activeBrand) {
      const filtered = allProducts.filter(
        (p: any) => p.manufacturer?.toUpperCase() === activeBrand
      );
      const uniqueCategories = [
        ...new Set(filtered.map((p: any) => p.model as string)),
      ];
      setCategories(uniqueCategories as string[]);
      // Chỉ setActiveCategory nếu chưa khởi tạo lần đầu
      if (!initialized) {
        setActiveCategory((uniqueCategories[0] as string) || "");
        setInitialized(true);
      }
    }
  }, [allProducts, activeBrand, initialized]);

  // Gọi API car với filter
  useEffect(() => {
    if (!activeBrand || !activeCategory || !initialized) return;
    const params: any = {
      manufacturer: activeBrand,
      model: activeCategory,
      page,
      limit,
    };
    setLoading(true);
    fetch(`/api/car?${new URLSearchParams(params)}`)
      .then((res) => res.json())
      .then((data) => {
        setProductList(
          Array.isArray(data.data)
            ? data.data.map((p: any) => ({
                _id: p._id,
                name: p.name,
                manufacturer: p.manufacturer,
                model: p.model,
                price: p.price,
                color: p.color,
                seats: p.seats,
                fuelType: p.fuelType,
                transmission: p.transmission,
                licensePlate: p.licensePlate,
                status: p.status,
                year: p.year,
                description: p.description,
                image: p.images?.main || "",
                images: p.images || {},
                highlights: p.highlights || [],
                specifications: p.specifications || [],
              }))
            : []
        );
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
        setLoading(false);
      });
  }, [activeBrand, activeCategory, page, limit, initialized]);

  useEffect(() => {
    setPage(1);
  }, [activeBrand, activeCategory, limit]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/car/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Xóa sản phẩm thành công!");
        // Refresh danh sách
        window.location.reload();
      } else {
        const error = await response.json();
        setError(`Lỗi: ${error.message || "Xóa thất bại"}`);
      }
    } catch {
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (product: Product) => {
    setFormLoading(true);
    setShowForm(true);
    try {
      const res = await fetch(`/api/car/${product._id}`);
      const data = await res.json();
      if (data && data.data) {
        setEditProduct({
          _id: data.data._id,
          name: data.data.name,
          manufacturer: data.data.manufacturer,
          model: data.data.model,
          price: data.data.price,
          color: data.data.color,
          seats: data.data.seats,
          fuelType: data.data.fuelType,
          transmission: data.data.transmission,
          licensePlate: data.data.licensePlate,
          status: data.data.status,
          year: data.data.year,
          description: data.data.description,
          image: data.data.images?.main || "",
          images: data.data.images || {},
          highlights: data.data.highlights || [],
          specifications: data.data.specifications || [],
        });
      }
    } catch {
      setEditProduct(product);
    } finally {
      setFormLoading(false);
    }
  };

  const handleAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  return (
    <>
      <section className="mb-8">
        <div className="bg-gradient-to-r from-[#b8001c] to-[#1a1a1a] text-white rounded-3xl shadow-xl p-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide drop-shadow">
            Quản lý sản phẩm
          </h1>
          <button
            onClick={handleAdd}
            className="bg-white text-[#b8001c] font-bold px-6 py-2 rounded-xl shadow hover:bg-[#b8001c] hover:text-white transition"
          >
            + Thêm sản phẩm
          </button>
        </div>
        {loading && (
          <div className="mt-4 text-blue-600 font-bold">Đang xử lý...</div>
        )}
        {error && <div className="mt-4 text-red-600 font-bold">{error}</div>}
      </section>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition ${
              activeBrand === brand
                ? "bg-[#03bb65] text-white border-[#03bb65]"
                : "bg-white text-[#03bb65] border-[#03bb65]"
            }`}
            onClick={() => {
              setActiveBrand(brand);
              // Lấy model đầu tiên của brand này và set luôn
              const filtered = allProducts.filter(
                (p: any) => p.manufacturer?.toUpperCase() === brand
              );
              const uniqueCategories = [
                ...new Set(filtered.map((p: any) => p.model as string)),
              ];
              setCategories(uniqueCategories as string[]);
              setActiveCategory((uniqueCategories[0] as string) || "");
            }}
          >
            {brand}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition ${
              activeCategory === cat
                ? "bg-[#17877b] text-white border-[#17877b]"
                : "bg-white text-[#17877b] border-[#17877b]"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-[#b8001c] text-lg">
              <th className="py-2 px-3">Ảnh</th>
              <th className="py-2 px-3">Tên xe</th>
              <th className="py-2 px-3">Hãng</th>
              <th className="py-2 px-3">Model</th>
              <th className="py-2 px-3">Biển số</th>
              <th className="py-2 px-3">Năm</th>
              <th className="py-2 px-3">Giá</th>
              <th className="py-2 px-3">Trạng thái</th>
              <th className="py-2 px-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={80}
                      height={60}
                      className="object-contain rounded shadow"
                    />
                  ) : (
                    <span className="text-gray-400">Không ảnh</span>
                  )}
                </td>
                <td className="py-2 px-3 font-semibold text-black">{p.name}</td>
                <td className="py-2 px-3 text-black">{p.manufacturer}</td>
                <td className="py-2 px-3 text-black">{p.model}</td>
                <td className="py-2 px-3 text-black">{p.licensePlate}</td>
                <td className="py-2 px-3 text-black">{p.year}</td>
                <td className="py-2 px-3 text-black">
                  {p.price?.toLocaleString()}₫
                </td>
                <td className="py-2 px-3 text-black">
                  <span
                    className={
                      p.status === "active"
                        ? "text-green-600 font-bold"
                        : "text-gray-400 font-semibold"
                    }
                  >
                    {p.status === "active"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </span>
                </td>
                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 rounded bg-[#b8001c] text-white font-bold hover:bg-black transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
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
      {/* Pagination controls */}
      {total > 0 && totalPages > 0 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
              ${
                page === 1
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white"
              }`}
          >
            &#8592;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
                ${
                  page === i + 1
                    ? "bg-[#03bb65] border-[#03bb65] text-white"
                    : "bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
              ${
                page === totalPages
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white"
              }`}
          >
            &#8594;
          </button>
        </div>
      )}
      <div className="text-center text-xs text-gray-500 mt-2">
        Tổng số xe: {typeof total === "number" ? total : 0}
      </div>

      {showForm && (
        <ProductForm
          product={editProduct}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
          loading={formLoading}
        />
      )}
    </>
  );
}

function ProductForm({
  product,
  onClose,
  loading,
}: {
  product: Product | null;
  onClose: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Product>(
    product || {
      _id: "",
      name: "",
      manufacturer: "",
      model: "",
      price: 0,
      color: "",
      seats: 2,
      fuelType: "",
      transmission: "",
      licensePlate: "",
      status: "active",
      year: new Date().getFullYear(),
      description: "",
      image: "",
      images: { main: "", front: "", back: "", left: "", right: "" },
      highlights: [],
      specifications: "",
    }
  );
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File }>({});

  // Đồng bộ form với product mỗi khi product thay đổi
  React.useEffect(() => {
    if (product) {
      setForm({
        ...form,
        ...product,
        images: product.images || {
          main: "",
          front: "",
          back: "",
          left: "",
          right: "",
        },
        highlights: product.highlights || [],
        specifications: product.specifications || "",
      });
      // Reset imageFiles khi chuyển sang product khác
      setImageFiles({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Responsive popup
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 w-full max-w-lg md:max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#b8001c]">
          {product ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h2>
        {loading ? (
          <div className="text-center py-8">Đang tải dữ liệu...</div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (product) {
                // Update product - gửi formData với ảnh
                const formData = new FormData();

                // Thêm các field text
                formData.append("name", form.name);
                formData.append("manufacturer", form.manufacturer);
                formData.append("model", form.model);
                formData.append("price", form.price.toString());
                formData.append("color", form.color);
                formData.append("seats", form.seats.toString());
                formData.append("fuelType", form.fuelType);
                formData.append("transmission", form.transmission);
                formData.append("licensePlate", form.licensePlate);
                formData.append("status", form.status);
                formData.append("year", form.year.toString());
                formData.append("description", form.description);

                // Thêm highlights
                if (form.highlights) {
                  formData.append(
                    "highlights",
                    JSON.stringify(form.highlights)
                  );
                }

                // Thêm specifications (ảnh) - không cần gửi qua formData vì sẽ upload file

                // Thêm ảnh files
                Object.keys(imageFiles).forEach((key) => {
                  if (imageFiles[key]) {
                    formData.append(key, imageFiles[key]);
                  }
                });

                try {
                  const response = await fetch(`/api/car/${product._id}`, {
                    method: "PUT",
                    body: formData,
                  });

                  if (response.ok) {
                    await response.json();
                    alert("Cập nhật sản phẩm thành công!");
                    onClose();
                    // Refresh danh sách
                    window.location.reload();
                  } else {
                    const error = await response.json();
                    alert(`Lỗi: ${error.message || "Cập nhật thất bại"}`);
                  }
                } catch {
                  alert("Lỗi kết nối server");
                }
              } else {
                // Add new product - gửi FormData với ảnh
                const formData = new FormData();

                // Thêm các field bắt buộc
                formData.append("name", form.name);
                formData.append("licensePlate", form.licensePlate);
                formData.append("price", form.price.toString());
                formData.append("seats", form.seats.toString());
                formData.append("fuelType", form.fuelType);
                formData.append("transmission", form.transmission);
                formData.append("createdBy", "64d26e4012cfa1b40e96a001"); // ID user tạo

                // Thêm các field tùy chọn
                if (form.manufacturer)
                  formData.append("manufacturer", form.manufacturer);
                if (form.model) formData.append("model", form.model);
                if (form.color) formData.append("color", form.color);
                if (form.year) formData.append("year", form.year.toString());
                if (form.status) formData.append("status", form.status);
                if (form.description)
                  formData.append("description", form.description);

                // Thêm highlights
                if (form.highlights && form.highlights.length > 0) {
                  formData.append(
                    "highlights",
                    JSON.stringify(form.highlights)
                  );
                }

                // Thêm specifications (ảnh) - không cần gửi qua formData vì sẽ upload file

                // Thêm ảnh files
                Object.keys(imageFiles).forEach((key) => {
                  if (imageFiles[key]) {
                    formData.append(key, imageFiles[key]);
                  }
                });

                try {
                  const response = await fetch("/api/car/", {
                    method: "POST",
                    body: formData,
                  });

                  if (response.ok) {
                    await response.json();
                    alert("Tạo sản phẩm thành công!");
                    onClose();
                    // Refresh danh sách
                    window.location.reload();
                  } else {
                    const error = await response.json();
                    alert(`Lỗi: ${error.message || "Tạo sản phẩm thất bại"}`);
                  }
                } catch {
                  alert("Lỗi kết nối server");
                }
              }
            }}
            className="space-y-4"
          >
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Tên xe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Hãng (manufacturer)"
              value={form.manufacturer}
              onChange={(e) =>
                setForm({ ...form, manufacturer: e.target.value })
              }
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Biển số"
              value={form.licensePlate}
              onChange={(e) =>
                setForm({ ...form, licensePlate: e.target.value })
              }
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Năm sản xuất"
              type="number"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Giá bán"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Màu xe"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              required
            />
            <input
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Số chỗ"
              type="number"
              value={form.seats}
              onChange={(e) =>
                setForm({ ...form, seats: Number(e.target.value) })
              }
              required
            />
            <select
              className="w-full border p-3 rounded-xl text-lg text-black"
              value={form.fuelType}
              onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
              required
            >
              <option value="">Chọn nhiên liệu</option>
              <option value="petrol">Xăng</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Điện</option>
            </select>
            <select
              className="w-full border p-3 rounded-xl text-lg text-black"
              value={form.transmission}
              onChange={(e) =>
                setForm({ ...form, transmission: e.target.value })
              }
              required
            >
              <option value="">Chọn hộp số</option>
              <option value="manual">Số sàn</option>
              <option value="automatic">Số tự động</option>
            </select>
            <textarea
              className="w-full border p-3 rounded-xl text-lg text-black"
              placeholder="Mô tả"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
            />
            {/* 5 ảnh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["main", "front", "back", "left", "right"].map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="block font-medium mb-1 text-black">
                    Ảnh {key}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border p-2 rounded-xl text-sm text-black"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Lưu file để upload
                        setImageFiles((prev) => ({ ...prev, [key]: file }));

                        // Tạo preview
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          setForm({
                            ...form,
                            images: {
                              ...form.images,
                              [key]: result,
                            },
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {form.images?.[key] && (
                    <div className="mt-2">
                      <Image
                        src={form.images[key]}
                        alt={key}
                        width={120}
                        height={80}
                        className="rounded object-contain max-h-20 border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = { ...form.images };
                          delete newImages[key];
                          setForm({ ...form, images: newImages });

                          // Xóa file đã lưu
                          const newImageFiles = { ...imageFiles };
                          delete newImageFiles[key];
                          setImageFiles(newImageFiles);
                        }}
                        className="text-red-500 text-xs mt-1 block"
                      >
                        Xóa ảnh
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Đặc điểm nổi bật */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Đặc điểm nổi bật
              </label>
              {(form.highlights || []).map((h, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    className="border p-2 rounded flex-1 text-black"
                    placeholder="Tên đặc điểm"
                    value={h.name}
                    onChange={(e) => {
                      const arr = [...(form.highlights || [])];
                      arr[idx].name = e.target.value;
                      setForm({ ...form, highlights: arr });
                    }}
                  />
                  <input
                    className="border p-2 rounded flex-1 text-black"
                    placeholder="Giá trị"
                    value={h.value}
                    onChange={(e) => {
                      const arr = [...(form.highlights || [])];
                      arr[idx].value = e.target.value;
                      setForm({ ...form, highlights: arr });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        highlights: (form.highlights || []).filter(
                          (_, i) => i !== idx
                        ),
                      })
                    }
                    className="text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    highlights: [
                      ...(form.highlights || []),
                      { name: "", value: "" },
                    ],
                  })
                }
                className="text-[#03bb65] font-bold mt-1"
              >
                + Thêm đặc điểm
              </button>
            </div>
            {/* Thông số kỹ thuật - Ảnh */}
            <div>
              <label className="block font-medium mb-1 text-black">
                Ảnh thông số kỹ thuật
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded-xl text-sm text-black"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Lưu file để upload
                    setImageFiles((prev) => ({
                      ...prev,
                      specifications: file,
                    }));

                    // Tạo preview
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      setForm({ ...form, specifications: result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {form.specifications && (
                <div className="mt-2">
                  <Image
                    src={form.specifications}
                    alt="Thông số kỹ thuật"
                    width={200}
                    height={150}
                    className="rounded object-contain max-h-32 border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, specifications: "" });

                      // Xóa file đã lưu
                      const newImageFiles = { ...imageFiles };
                      delete newImageFiles.specifications;
                      setImageFiles(newImageFiles);
                    }}
                    className="text-red-500 text-xs mt-1 block"
                  >
                    Xóa ảnh
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-[#b8001c] text-white font-bold py-3 rounded-xl hover:bg-black transition"
              >
                {product ? "Cập nhật" : "Thêm mới"}
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
        )}
      </div>
    </div>
  );
}
