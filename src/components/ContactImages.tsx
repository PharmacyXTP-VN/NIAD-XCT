"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ContactImageProps {
  className?: string;
}

interface ContactImage {
  _id: string;
  title: string;
  description: string;
  url: string;
}

export default function ContactImages({ className = "" }: ContactImageProps) {
  const [images, setImages] = useState<ContactImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactImages = async () => {
      try {
        const res = await fetch(`/api/images/types/contact`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch contact images: ${res.status}`);
        }
        
        const data = await res.json();
        setImages(data.data || []);
      } catch (error) {
        console.error("Error fetching contact images:", error);
        setError("Không thể tải hình ảnh liên hệ");
      } finally {
        setLoading(false);
      }
    };

    fetchContactImages();
  }, []);

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
