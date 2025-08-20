"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AboutImageProps {
  className?: string;
  imageIndex?: number;
}

interface AboutImage {
  _id: string;
  title: string;
  description: string;
  url: string;
}

export default function AboutImages({ className = "", imageIndex }: AboutImageProps) {
  const [images, setImages] = useState<AboutImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const res = await fetch(`/api/images/types/about`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch about images: ${res.status}`);
        }
        
        const data = await res.json();
        setImages(data.data || []);
      } catch (error) {
        console.error("Error fetching about images:", error);
        setError("Không thể tải hình ảnh giới thiệu");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutImages();
  }, []);

  // Nếu có chỉ định lấy ảnh theo index
  if (imageIndex !== undefined) {
    if (loading) {
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      );
    }

    if (error) {
      return null; // Không hiển thị lỗi nếu lấy ảnh đơn, sử dụng ảnh mặc định
    }

    // Nếu có ảnh và đúng index
    if (images.length > imageIndex) {
      return (
        <div className={`${className}`}>
          <Image
            src={images[imageIndex].url}
            alt={images[imageIndex].title || "Hình ảnh NIAD"}
            fill={false}
            width={520}
            height={340}
            className="rounded-2xl object-contain shadow-lg w-auto h-full max-w-full max-h-full"
            style={{ objectFit: 'contain', background: '#f0f2f5' }}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 520px"
          />
        </div>
      );
    }
    return null; // Nếu không có ảnh ở index đó
  }

  // Hiển thị grid tất cả ảnh như trước
  if (loading) {
    return (
      <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-64 h-48 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (images.length === 0) {
    return null; // Don't render anything if no images
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {images.map((image) => (
        <div key={image._id} className="overflow-hidden rounded-lg shadow-md">
          <div className="relative h-48 w-full">
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover"
            />
          </div>
          {(image.title || image.description) && (
            <div className="p-4 bg-white">
              {image.title && (
                <h3 className="font-semibold text-[#006b68] text-lg">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-gray-700 mt-1">{image.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
