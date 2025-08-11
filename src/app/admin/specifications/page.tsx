"use client";

import { useState } from 'react';

export default function SpecificationsManager() {
  const [productId, setProductId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!productId || !selectedFile) {
      setMessage('Vui lòng nhập Product ID và chọn file ảnh');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('specifications', selectedFile);

      const response = await fetch(`/api/car/specifications/${productId}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ Upload thành công! URL: ${result.specificationsUrl}`);
        setSelectedFile(null);
        setProductId('');
      } else {
        setMessage(`❌ Lỗi: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Lỗi upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDirectUrlUpdate = async () => {
    const url = prompt('Nhập URL ảnh specifications:');
    if (!url || !productId) {
      setMessage('Vui lòng nhập Product ID và URL hợp lệ');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/car/specifications-url/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ specificationsUrl: url }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ Cập nhật URL thành công! URL: ${result.specificationsUrl}`);
        setProductId('');
      } else {
        setMessage(`❌ Lỗi: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Lỗi cập nhật: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Thông số Kỹ thuật</h2>
      
      {/* Product ID Input */}
      <div className="mb-6">
        <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
          Product ID
        </label>
        <input
          type="text"
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập ID sản phẩm (ví dụ: 68930c286392a0da40b1735)"
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
          Upload ảnh thông số kỹ thuật
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            File đã chọn: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleUpload}
          disabled={uploading || !productId || !selectedFile}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Đang upload...' : 'Upload file'}
        </button>

        <button
          onClick={handleDirectUrlUpdate}
          disabled={uploading || !productId}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Đang cập nhật...' : 'Nhập URL trực tiếp'}
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-md ${message.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <pre className="whitespace-pre-wrap font-mono text-sm">{message}</pre>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold text-gray-800 mb-2">Hướng dẫn sử dụng:</h3>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          <li>Lấy Product ID từ URL của sản phẩm (phần cuối URL)</li>
          <li>Chọn ảnh thông số kỹ thuật (JPG, PNG)</li>
          <li>Click &quot;Upload file&quot; để upload lên Cloudinary</li>
          <li>Hoặc click &quot;Nhập URL trực tiếp&quot; nếu đã có URL ảnh</li>
          <li>Kiểm tra kết quả trên trang sản phẩm</li>
        </ol>
      </div>
    </div>
  );
}
