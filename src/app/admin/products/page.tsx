"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react"; // Added for React.useEffect
import dynamic from "next/dynamic";

// Dynamic import CKEditor to avoid SSR issues
const CKEditorWrapper = dynamic(
  () => import('../news/CKEditorWrapper'),
  { ssr: false }
);

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
  images?: {
    main?: string;
    gallery?: string[];
    front?: string;
    back?: string;
    left?: string;
    right?: string;
    [key: string]: string | string[] | undefined;
  };
  highlightFeatures?: string; // HTML content from CKEditor
  specifications?: string; // Changed from array to string (URL to image)
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
    fetch('/api/car')
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data.data) ? data.data : [];
        setAllProducts(arr);
      });
  }, []);

  // Khi allProducts có data, set filter mặc định 1 lần duy nhất
  useEffect(() => {
    if (allProducts.length > 0 && brands.length === 0) {
      const uniqueBrands = [...new Set(allProducts.map((p: any) => (p.manufacturer?.toUpperCase() as string)))];
      setBrands(uniqueBrands as string[]);
      setActiveBrand((uniqueBrands[0] as string) || "");
    }
  }, [allProducts, brands.length]);

  useEffect(() => {
    if (allProducts.length > 0 && activeBrand) {
      const filtered = allProducts.filter((p: any) => p.manufacturer?.toUpperCase() === activeBrand);
      const uniqueCategories = [...new Set(filtered.map((p: any) => p.model as string))];
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
      .then(res => res.json())
      .then(data => {
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
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Xóa sản phẩm thành công!');
        // Refresh danh sách
        window.location.reload();
      } else {
        const error = await response.json();
        setError(`Lỗi: ${error.message || 'Xóa thất bại'}`);
      }
    } catch {
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (product: Product) => {
    setFormLoading(true);
    // Không mở form ngay, đợi load xong data
    try {
      const res = await fetch(`/api/car/${product._id}`);
      const data = await res.json();
      if (data && data.data) {
        // Create a properly initialized images object with default values
        const images = {
          main: "",
          gallery: [] as string[],
          ...(data.data.images || {})
        };
        
        // Ensure gallery exists and is an array
        if (!Array.isArray(images.gallery)) {
          images.gallery = [];
        }
        
        // Convert old model (front, back, left, right) to gallery array and remove old properties
        ['front', 'back', 'left', 'right'].forEach(key => {
          const imageKey = key as keyof typeof images;
          const value = images[imageKey];
          if (typeof value === 'string' && value && !images.gallery.includes(value)) {
            images.gallery.push(value);
            // Remove old property after adding to gallery
            delete images[imageKey];
          }
        });
        
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
          image: data.data.images?.main || '',
          images: images,
          highlightFeatures: data.data.highlightFeatures || '',
          specifications: data.data.specifications || '',
        });
        
        // Chỉ mở form sau khi load xong data
        setShowForm(true);
      }
    } catch {
      setEditProduct(product);
      setShowForm(true);
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
        <div className="bg-gradient-to-r from-[#006b68] to-[#1a1a1a] text-white rounded-3xl shadow-xl p-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide drop-shadow">
            Quản lý sản phẩm
          </h1>
          <button
            onClick={handleAdd}
            className="bg-white text-[#006b68] font-bold px-6 py-2 rounded-xl shadow hover:bg-[#006b68] hover:text-white transition"
          >
            + Thêm sản phẩm
          </button>
        </div>
        {loading && (
          <div className="mt-4 text-blue-600 font-bold">Đang xử lý...</div>
        )}
        {error && <div className="mt-4 text-[#006b68] font-bold">{error}</div>}
      </section>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition ${activeBrand === brand ? "bg-[#006b68] text-white border-[#006b68]" : "bg-white text-[#006b68] border-[#006b68]"}`}
            onClick={() => {
              setActiveBrand(brand);
              // Lấy model đầu tiên của brand này và set luôn
              const filtered = allProducts.filter((p: any) => p.manufacturer?.toUpperCase() === brand);
              const uniqueCategories = [...new Set(filtered.map((p: any) => p.model as string))];
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
            className={`px-5 py-2 rounded-full font-semibold border-2 transition ${activeCategory === cat ? "bg-[#006b68] text-white border-[#006b68]" : "bg-white text-[#006b68] border-[#006b68]"}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-[#006b68] text-lg">
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
                    <Image src={p.image} alt={p.name} width={80} height={60} className="object-contain rounded shadow" />
                  ) : (
                    <span className="text-gray-400">Không ảnh</span>
                  )}
                </td>
                <td className="py-2 px-3 font-semibold text-black">{p.name}</td>
                <td className="py-2 px-3 text-black">{p.manufacturer}</td>
                <td className="py-2 px-3 text-black">{p.model}</td>
                <td className="py-2 px-3 text-black">{p.licensePlate}</td>
                <td className="py-2 px-3 text-black">{p.year}</td>
                <td className="py-2 px-3 text-black">{p.price?.toLocaleString()}₫</td>
                <td className="py-2 px-3 text-black">
                  <span className={p.status === 'active' ? 'text-green-600 font-bold' : 'text-gray-400 font-semibold'}>
                    {p.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                  </span>
                </td>
                <td className="py-2 px-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    disabled={formLoading}
                    className="px-3 py-1 rounded bg-[#006b68] text-white font-bold hover:bg-black transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {formLoading ? 'Đang tải...' : 'Sửa'}
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={formLoading}
                    className="px-3 py-1 rounded bg-gray-200 text-[#006b68] font-bold hover:bg-gray-300 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
              ${page === totalPages ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white'}`}
          >
            &#8594;
          </button>
        </div>
      )}
      <div className="text-center text-xs text-gray-500 mt-2">Tổng số xe: {typeof total === 'number' ? total : 0}</div>

      {showForm && (
                  <ProductForm
            product={editProduct}
            onClose={() => { setShowForm(false); setEditProduct(null); }}
            loading={formLoading}
          />
      )}
    </>
  );
}

function ProductForm({
  product,
  onClose,
  loading
}: {
  product: Product | null;
  onClose: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Product>(
    product || {
      _id: '',
      name: '',
      manufacturer: '',
      model: '',
      price: 0,
      color: '',
      seats: 2,
      fuelType: '',
      transmission: '',
      licensePlate: '',
      status: 'active',
      year: new Date().getFullYear(),
      description: '',
      image: '',
      images: { main: '', gallery: [] },
      highlightFeatures: '',
      specifications: '',
    }
  );
  const [imageFiles, setImageFiles] = useState<{
    main?: File;
    gallery?: File[];
    specifications?: File;
    [key: string]: File | File[] | undefined;
  }>({});

  // Đồng bộ form với product mỗi khi product thay đổi
  React.useEffect(() => {
    if (product) {
      // Đảm bảo specifications luôn là chuỗi
      let specValue = '';
      if (product.specifications) {
        specValue = typeof product.specifications === 'string' 
          ? product.specifications 
          : '';
      }
      
      // Xử lý images để phù hợp với mô hình gallery mới
      const images: Product['images'] = {
        main: "",
        gallery: [],
        ...(product.images || {})
      };
      
      // Đảm bảo images.main tồn tại
      if (!images.main) images.main = '';
      
      // Đảm bảo gallery là một mảng và đồng thời chuyển các ảnh cũ vào gallery nếu chưa có trong gallery
      if (!Array.isArray(images.gallery)) {
        images.gallery = [];
      }
      
      // Lưu tham chiếu đến gallery array đã được đảm bảo là mảng
      const galleryArray = images.gallery;
      
      // Convert old model (front, back, left, right) to gallery array if they exist
      // and aren't already in the gallery array
      ['front', 'back', 'left', 'right'].forEach(key => {
        const value = product.images?.[key];
        if (typeof value === 'string' && value && !galleryArray.includes(value)) {
          galleryArray.push(value);
          
          // Remove old property after adding to gallery
          if (images) {
            const imageKey = key as keyof typeof images;
            if (imageKey in images) {
              delete images[imageKey];
            }
          }
        }
      });
      
      setForm({
        _id: product._id,
        name: product.name || '',
        manufacturer: product.manufacturer || '',
        model: product.model || '',
        price: product.price || 0,
        color: product.color || '',
        seats: product.seats || 2,
        fuelType: product.fuelType || '',
        transmission: product.transmission || '',
        licensePlate: product.licensePlate || '',
        status: product.status || 'active',
        year: product.year || new Date().getFullYear(),
        description: product.description || '',
        image: product.image || '',
        images: images,
        highlightFeatures: product.highlightFeatures || '',
        specifications: specValue,
      });
      // Reset imageFiles khi chuyển sang product khác
      setImageFiles({});
    }
  }, [product]); // Chỉ phụ thuộc vào product, không phụ thuộc form

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
              formData.append('name', form.name);
              formData.append('manufacturer', form.manufacturer);
              formData.append('model', form.model);
              formData.append('price', form.price.toString());
              formData.append('color', form.color);
              formData.append('seats', form.seats.toString());
              formData.append('fuelType', form.fuelType);
              formData.append('transmission', form.transmission);
              formData.append('licensePlate', form.licensePlate);
              formData.append('status', form.status);
              formData.append('year', form.year.toString());
              formData.append('description', form.description);
              
              // Thêm highlightFeatures (CKEditor content)
              if (form.highlightFeatures) {
                formData.append('highlightFeatures', form.highlightFeatures);
              }
              
              // Thêm specifications (nếu là string URL và không có file mới)
              if (form.specifications && typeof form.specifications === 'string' && !imageFiles.specifications) {
                formData.append('specificationsUrl', form.specifications);
              }
              
              // Thêm ảnh main
              if (imageFiles.main) {
                formData.append('main', imageFiles.main);
              }
              
              // Thêm ảnh specifications
              if (imageFiles.specifications) {
                formData.append('specifications', imageFiles.specifications);
              }
              
              // Thêm ảnh gallery
              if (imageFiles.gallery && Array.isArray(imageFiles.gallery)) {
                imageFiles.gallery.forEach(file => {
                  formData.append('gallery', file);
                });
              }
              
              try {
                const response = await fetch(`/api/car/${product._id}`, {
                  method: 'PUT',
                  body: formData,
                });
                
                if (response.ok) {
                  await response.json();
                  alert('Cập nhật sản phẩm thành công!');
                  onClose();
                  // Refresh danh sách
                  window.location.reload();
                } else {
                  const error = await response.json();
                  alert(`Lỗi: ${error.message || 'Cập nhật thất bại'}`);
                }
              } catch {
                alert('Lỗi kết nối server');
              }
            } else {
              // Add new product - gửi FormData với ảnh
              const formData = new FormData();
              
              // Thêm các field bắt buộc
              formData.append('name', form.name);
              formData.append('licensePlate', form.licensePlate);
              formData.append('price', form.price.toString());
              formData.append('seats', form.seats.toString());
              formData.append('fuelType', form.fuelType);
              formData.append('transmission', form.transmission);
              formData.append('createdBy', '64d26e4012cfa1b40e96a001'); // ID user tạo
              
              // Thêm các field tùy chọn
              if (form.manufacturer) formData.append('manufacturer', form.manufacturer);
              if (form.model) formData.append('model', form.model);
              if (form.color) formData.append('color', form.color);
              if (form.year) formData.append('year', form.year.toString());
              if (form.status) formData.append('status', form.status);
              if (form.description) formData.append('description', form.description);
              
              // Thêm highlightFeatures (CKEditor content)
              if (form.highlightFeatures) {
                formData.append('highlightFeatures', form.highlightFeatures);
              }
              
              // Thêm specifications (nếu là string URL và không có file mới)
              if (form.specifications && typeof form.specifications === 'string' && !imageFiles.specifications) {
                formData.append('specificationsUrl', form.specifications);
              }
              
              // Thêm ảnh main
              if (imageFiles.main) {
                formData.append('main', imageFiles.main);
              }
              
              // Thêm ảnh specifications
              if (imageFiles.specifications) {
                formData.append('specifications', imageFiles.specifications);
              }
              
              // Thêm ảnh gallery
              if (imageFiles.gallery && Array.isArray(imageFiles.gallery)) {
                imageFiles.gallery.forEach(file => {
                  formData.append('gallery', file);
                });
              }
              
              try {
                const response = await fetch('/api/car/', {
                  method: 'POST',
                  body: formData,
                });
                
                if (response.ok) {
                  await response.json();
                  alert('Tạo sản phẩm thành công!');
                  onClose();
                  // Refresh danh sách
                  window.location.reload();
                } else {
                  const error = await response.json();
                  alert(`Lỗi: ${error.message || 'Tạo sản phẩm thất bại'}`);
                }
              } catch {
                alert('Lỗi kết nối server');
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
            onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
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
            onChange={(e) => setForm({ ...form, licensePlate: e.target.value })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg text-black"
            placeholder="Năm sản xuất"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            required
          />
          <input
            className="w-full border p-3 rounded-xl text-lg text-black"
            placeholder="Giá bán"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
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
            onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
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
            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
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
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
          />
          {/* Ảnh chính và gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Ảnh chính */}
            <div className="flex flex-col">
              <label className="block font-medium mb-1 text-black">Ảnh chính</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded-xl text-sm text-black"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Lưu file để upload
                    setImageFiles(prev => ({ ...prev, main: file }));
                    
                    // Tạo preview
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      setForm({ 
                        ...form, 
                        images: { 
                          ...(form.images || {}), 
                          main: result 
                        } 
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {form.images?.main && (
                <div className="mt-2">
                  <Image
                    src={form.images.main}
                    alt="Ảnh chính"
                    width={120}
                    height={80}
                    className="rounded object-contain max-h-20 border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = { ...(form.images || {}) };
                      delete newImages.main;
                      setForm({ ...form, images: newImages });
                      
                      // Xóa file đã lưu
                      const newImageFiles = { ...imageFiles };
                      delete newImageFiles.main;
                      setImageFiles(newImageFiles);
                    }}
                    className="text-red-500 text-xs mt-1 block"
                  >
                    Xóa ảnh
                  </button>
                </div>
              )}
            </div>
            
            {/* Gallery (nhiều ảnh) */}
            <div className="flex flex-col">
              <label className="block font-medium mb-1 text-black">Ảnh gallery (nhiều ảnh)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full border p-2 rounded-xl text-sm text-black"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    // Lưu files để upload
                    const newGalleryFiles: File[] = [...(imageFiles.gallery || [])];
                    for (let i = 0; i < files.length; i++) {
                      newGalleryFiles.push(files[i]);
                    }
                    setImageFiles(prev => ({ ...prev, gallery: newGalleryFiles }));
                    
                    // Tạo previews
                    const newGalleryPreviews: string[] = [...(form.images?.gallery || [])];
                    Array.from(files).forEach(file => {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        newGalleryPreviews.push(result);
                        setForm({ 
                          ...form, 
                          images: { 
                            ...(form.images || {}), 
                            gallery: newGalleryPreviews 
                          } 
                        });
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                }}
              />
              {form.images?.gallery && Array.isArray(form.images?.gallery) && form.images?.gallery.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {form.images?.gallery.map((img: string, idx: number) => (
                    <div key={idx} className="relative">
                      <Image
                        src={img}
                        alt={`Gallery ${idx}`}
                        width={100}
                        height={80}
                        className="rounded object-contain h-20 w-full border"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          // Nếu đang chỉnh sửa sản phẩm có ID và ảnh không phải là file mới
                          if (product && product._id && typeof img === 'string' && !img.startsWith('data:')) {
                            // Tạo bản sao của gallery và xóa ảnh tại vị trí idx
                            const currentGallery = form.images?.gallery || [];
                            const newGallery = [...currentGallery];
                            newGallery.splice(idx, 1);
                            
                            try {
                              // Cập nhật state để UI phản hồi ngay lập tức
                              setForm({
                                ...form,
                                images: {
                                  ...(form.images || {}),
                                  gallery: newGallery
                                }
                              });
                              
                              // Gọi API để cập nhật gallery trong database
                              const response = await fetch(`/api/car/gallery-update/${product._id}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ gallery: newGallery }),
                              });
                              
                              if (!response.ok) {
                                // Nếu API call thất bại, khôi phục state
                                const error = await response.json();
                                alert(`Lỗi khi xóa ảnh: ${error.message || 'Không thể xóa ảnh'}`);
                                // Khôi phục state
                                setForm({
                                  ...form,
                                  images: {
                                    ...(form.images || {}),
                                    gallery: currentGallery
                                  }
                                });
                              }
                            } catch (error) {
                              console.error('Lỗi khi cập nhật gallery:', error);
                              alert('Không thể kết nối đến server để xóa ảnh');
                            }
                          } else {
                            // Nếu đang tạo mới hoặc ảnh là file mới (chưa upload)
                            const currentGallery = form.images?.gallery || [];
                            const newGallery = [...currentGallery];
                            newGallery.splice(idx, 1);
                            setForm({
                              ...form,
                              images: {
                                ...(form.images || {}),
                                gallery: newGallery
                              }
                            });
                            
                            // Xóa file đã lưu trong state (chưa upload)
                            if (imageFiles.gallery) {
                              const newGalleryFiles = [...imageFiles.gallery];
                              newGalleryFiles.splice(idx, 1);
                              setImageFiles({
                                ...imageFiles,
                                gallery: newGalleryFiles
                              });
                            }
                          }
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Đặc điểm nổi bật (CKEditor) */}
          <div>
            <label className="block font-medium mb-1 text-black">Đặc điểm nổi bật</label>
            <div className="border rounded">
              <CKEditorWrapper
                data={form.highlightFeatures || ''}
                onChange={(data: string) => {
                  setForm({ ...form, highlightFeatures: data });
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Sử dụng trình soạn thảo này để nhập nội dung cho đặc điểm nổi bật. Hỗ trợ định dạng văn bản phong phú.</p>
          </div>
          
          {/* Thông số kỹ thuật */}
          <div>
            <label className="block font-medium mb-1 text-black">Thông số kỹ thuật (Ảnh A4)</label>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFiles({
                      ...imageFiles,
                      specifications: e.target.files[0]
                    });
                  }
                }}
                className="border p-2 rounded text-sm text-black"
              />
              {form.specifications && typeof form.specifications === 'string' && form.specifications.startsWith('http') && (
                <div className="flex items-center">
                  <Image 
                    src={form.specifications} 
                    alt="Thông số kỹ thuật" 
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setForm({ ...form, specifications: '' })}
                    className="ml-2 text-red-500"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Tải lên ảnh A4 chụp thông số kỹ thuật của xe</p>
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
