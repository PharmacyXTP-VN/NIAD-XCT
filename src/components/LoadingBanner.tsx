import React from "react";

export default function LoadingBanner() {
  return (
    <section className="w-full min-h-screen py-20 flex flex-col items-center justify-center bg-[#f0f2f5]">
      <div className="max-w-xl w-full flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white/60 border-t-[#006b68]" />
        <h2 className="text-3xl md:text-4xl font-bold drop-shadow text-[#006b68] text-center">Đang tải dữ liệu...</h2>
        <p className="text-lg md:text-xl text-[#006b68] text-center">Vui lòng chờ trong giây lát</p>
      </div>
    </section>
  );
} 