"use client"
export default function AdminDashboard() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-[#006b68] to-[#1a1a1a] text-white py-16 rounded-3xl shadow-xl overflow-hidden mb-10 flex flex-col items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg uppercase">Admin Dashboard</h1>
          <p className="text-xl md:text-2xl text-[#e6f9f0] max-w-2xl mx-auto font-medium mb-4">Quản trị sản phẩm, tin tức và các tính năng hệ thống.</p>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center group hover:shadow-xl transition">
          <div className="text-lg font-semibold mb-1 text-black">Quản lý sản phẩm</div>
          <a href="/admin/products" className="text-[#006b68] font-bold hover:underline">Xem chi tiết</a>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center group hover:shadow-xl transition">
          <div className="text-lg font-semibold mb-1 text-black">Quản lý tin tức</div>
          <a href="/admin/news" className="text-[#006b68] font-bold hover:underline">Xem chi tiết</a>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center group hover:shadow-xl transition">
          <div className="text-lg font-semibold mb-1 text-black">Quản lý hình ảnh</div>
          <a href="/admin/images" className="text-[#006b68] font-bold hover:underline">Xem chi tiết</a>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center group hover:shadow-xl transition">
          <div className="text-lg font-semibold mb-1 text-black">Quản lý nội dung footer</div>
          <a href="/admin/footer" className="text-[#006b68] font-bold hover:underline">Xem chi tiết</a>
        </div>
      </div>
    </>
  );
}
