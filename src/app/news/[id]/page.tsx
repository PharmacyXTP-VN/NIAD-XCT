"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import DefaultLayout from '@/layout/DefaultLayout';
import Image from 'next/image';
import LoadingBanner from '@/components/LoadingBanner';

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:9999/api/news/get/${id}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        setNews(data?.data || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingBanner />;
  if (!news) return notFound();

  return (
    <DefaultLayout>
      <div className="bg-[#f0f2f5] min-h-screen">
        {/* Banner lớn */}
        <section className="relative bg-gradient-to-r from-[#006b68] to-[#e6f9f0] text-white py-16 md:py-24 overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-20 bg-[url('/images/news/test2.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
            <Image
              src={news.thumbnail || '/images/news/test2.png'}
              alt={news.title}
              width={800}
              height={300}
              className="w-full max-w-2xl h-64 object-cover rounded-2xl shadow-lg mb-6 border-4 border-white"
            />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg uppercase leading-tight">
              {news.title}
            </h1>
            <h2 className="text-lg md:text-2xl text-[#e6f9f0] mb-4 font-medium">
              {news.summary}
            </h2>
            <div className="flex flex-wrap gap-3 justify-center items-center mb-2">
              <span className="text-xs md:text-sm text-gray-200 bg-[#006b68] px-3 py-1 rounded-full shadow">
                {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
              </span>
              {news.tags && news.tags.length > 0 && news.tags.map((tag: string) => (
                <span key={tag} className="bg-white/80 text-[#006b68] px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
        {/* Nội dung chi tiết */}
        <section className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="prose max-w-none prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto prose-img:border prose-img:border-[#e6f9f0] prose-h1:text-3xl prose-h2:text-2xl prose-p:text-base text-black prose-p:text-black" dangerouslySetInnerHTML={{ __html: news.content || "" }} />
        </section>
      </div>
    </DefaultLayout>
  );
} 