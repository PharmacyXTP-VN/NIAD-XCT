"use client";

import { useEffect, useState } from "react";
import { products as mockProducts, categories } from "@/data/products";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/adminService";
import Image from "next/image";

// Định nghĩa kiểu Product cho đúng với backend
interface Product {
  id?: number;
  name: string;
  category: string;
  desc: string;
  seats: string;
  transmission: string;
  fuel: string;
  image: File | string | null;
}

export default function AdminProducts() {
  // Chuyển đổi mockProducts sang kiểu Product (bỏ price, image là string)
  const convertMock = (p: Record<string, unknown>): Product => ({
    id: p.id as number,
    name: p.name as string,
    category: p.category as string,
    desc: p.desc as string,
    seats: p.seats as string,
    transmission: p.transmission as string,
    fuel: p.fuel as string,
    image: typeof p.image === "string" ? p.image : null,
  });
  const [productList, setProductList] = useState<Product[]>(
    mockProducts.map(convertMock)
  );
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy token từ localStorage
  const getToken = () =>
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";

  // Load danh sách sản phẩm từ API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProductList(data);
    } catch {
      setError("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(String(id), getToken());
      await fetchProducts();
    } catch {
      setError("Xoá sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (product: Product) => {
    setLoading(true);
    setError(null);
    try {
      if (product.id) {
        await updateProduct(
          String(product.id),
          product as unknown as Record<string, string | File | undefined>,
          getToken()
        );
      } else {
        await createProduct(
          product as unknown as Record<string, string | File | undefined>,
          getToken()
        );
      }
      await fetchProducts();
      setShowForm(false);
    } catch {
      setError("Lưu sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
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
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-[#b8001c] text-lg">
              <th className="py-2 px-3">Tên sản phẩm</th>
              <th className="py-2 px-3">Hãng</th>
              {/* <th className="py-2 px-3">Giá</th> */}
              <th className="py-2 px-3">Mô tả</th>
              <th className="py-2 px-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3 font- text-black">{p.name}</td>
                <td className="py-2 px-3 text-black">{p.category}</td>
                {/* <td className="py-2 px-3 text-black">{p.price}</td> */}
                <td className="py-2 px-3 max-w-xs truncate text-black">
                  {p.desc}
                </td>
                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 rounded bg-[#b8001c] text-white font-bold hover:bg-black transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p.id || 0)}
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
        <ProductForm
          product={editProduct}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

function ProductForm({
  product,
  onClose,
  onSubmit,
}: {
  product: Product | null;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}) {
  const [form, setForm] = useState<Product>(
    product || {
      name: "",
      category: categories[0],
      desc: "",
      seats: "",
      transmission: "",
      fuel: "",
      image: null,
    }
  );
  const [preview, setPreview] = useState<string | null>(
    typeof product?.image === "string" ? product.image : null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

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
          {product ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-4"
        >
          <input
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Hãng (category)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Số chỗ"
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: e.target.value })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Hộp số (VD: Tự động, Số sàn)"
            value={form.transmission}
            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Nhiên liệu (VD: Xăng, Dầu, Điện)"
            value={form.fuel}
            onChange={(e) => setForm({ ...form, fuel: e.target.value })}
            required
          />
          <textarea
            className="w-full border p-3 rounded-xl text-lg"
            placeholder="Mô tả"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            rows={3}
          />
          <div>
            <label className="block mb-1 font-medium">Ảnh sản phẩm</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded-xl"
            />
            {preview && typeof preview === "string" && (
              <div className="mt-2 rounded-xl max-h-40 object-contain border overflow-hidden">
                <Image
                  src={preview}
                  alt="preview"
                  width={300}
                  height={120}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "120px",
                  }}
                />
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
      </div>
    </div>
  );
}
