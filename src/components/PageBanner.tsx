"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PageBannerProps {
  pageName?: string;  // Optional: specific page identifier
  title?: string;     // Optional: override title
  subtitle?: string;  // Optional: override subtitle
  className?: string; // Optional: additional classes
}

interface BannerImage {
  _id: string;
  title: string;
  description: string;
  url: string;
}

export default function PageBanner({ pageName, title, subtitle, className = "" }: PageBannerProps) {
  const [banner, setBanner] = useState<BannerImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageBanner = async () => {
      try {
        // Fetch banners of type 'page-banner'
        console.log("Fetching banners for page-banner type...");
        let res = await fetch(`/api/images/types/page-banner`);
        let banners = [];
        
        if (!res.ok) {
          console.warn(`Page-banner type not available: ${res.status}. Trying regular banners as fallback.`);
          
          // Try regular banners as fallback
          res = await fetch(`/api/images/types/banner`);
          if (!res.ok) {
            throw new Error(`Failed to fetch any banners: ${res.status}`);
          }
        }
        
        const data = await res.json();
        banners = data.data || [];
        console.log(`Successfully fetched ${banners.length} banners`);
        
        // If pageName is provided, try to find a banner with matching title
        let selectedBanner = null;
        if (pageName && banners.length > 0) {
          console.log(`Looking for banner with page name: ${pageName}`);
          selectedBanner = banners.find(
            (b: BannerImage) => b.title && b.title.toLowerCase() === pageName.toLowerCase()
          );
          
          if (selectedBanner) {
            console.log(`Found matching banner for ${pageName}`);
          }
        }
        
        // If no specific banner found or no pageName provided, use the first active banner
        if (!selectedBanner && banners.length > 0) {
          selectedBanner = banners[0];
          console.log("Using first available banner as fallback");
        }
        
        setBanner(selectedBanner);
      } catch (error) {
        console.error("Error fetching page banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageBanner();
  }, [pageName]);

  if (loading) {
    return (
      <section className={`relative bg-gradient-to-r from-[#006b68] to-[#e6f9f0] text-white py-20 overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="h-24 bg-white/10 animate-pulse rounded-lg mb-6 w-3/4"></div>
          <div className="h-12 bg-white/10 animate-pulse rounded-lg w-1/2 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (!banner) {
    // Default banner if none found - styled like the original banner
    return (
      <section className={`relative bg-gradient-to-r from-[#006b68] to-[#e6f9f0] text-white py-20 overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
            {title || "NIAD XCT"}
          </h1>
          <p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
            {subtitle || "Chất lượng và đổi mới"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative bg-gradient-to-r from-[#006b68] to-[#e6f9f0] text-white py-20 overflow-hidden ${className}`}>
      {/* Background image - giống như banner cũ */}
      <div className="absolute inset-0 opacity-20 bg-no-repeat bg-right bg-contain pointer-events-none">
        <Image 
          src={banner.url} 
          alt={banner.title || "Page Banner"} 
          fill 
          className="object-contain object-right"
          priority
          style={{ maxWidth: '70%', marginLeft: 'auto' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
          {title || banner.title || "NIAD XCT"}
        </h1>
        <p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
          {subtitle || banner.description || "Chất lượng và đổi mới"}
        </p>
      </div>
    </section>
  );
}
