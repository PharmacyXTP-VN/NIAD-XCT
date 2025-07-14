// File: src/components/AboutCTA.tsx
// ✅ Đường dẫn: src/components/AboutCTA.tsx

export default function AboutCTA() {
  return (
    <section id="about" className="py-16 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Chuyên Gia Giải Pháp Xe Chở Tiền
        </h2>
        <p className="text-lg mb-6">
          Với hơn 10 năm kinh nghiệm, chúng tôi cung cấp các dòng xe chở tiền
          đạt tiêu chuẩn an ninh quốc tế, phục vụ ngân hàng, kho bạc và các công
          ty bảo vệ.
        </p>
        <a
          href="#contact"
          className="inline-block bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-xl hover:bg-yellow-300 transition"
        >
          Nhận Tư Vấn Ngay
        </a>
      </div>
    </section>
  );
}
