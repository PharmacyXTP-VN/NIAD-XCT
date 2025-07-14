import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";

export default function ContactPage() {
  return (
    <DefaultLayout>
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Liên hệ với NIAD
          </h1>
          <p className="text-2xl md:text-3xl text-red-100 max-w-2xl mx-auto font-medium mb-6">
            Đội ngũ NIAD luôn sẵn sàng hỗ trợ bạn 24/7 về sản phẩm, dịch vụ, hợp
            tác và tư vấn giải pháp vận chuyển an toàn.
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-[#f7f7fa]">
        {/* Contact Form & Info */}
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <form className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-[#b8001c] mb-2">
              Gửi yêu cầu tư vấn
            </h2>
            <input
              type="text"
              placeholder="Họ và tên *"
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#b8001c] focus:ring-2 focus:ring-[#b8001c]/20 outline-none text-gray-900"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#b8001c] focus:ring-2 focus:ring-[#b8001c]/20 outline-none text-gray-900"
            />
            <input
              type="tel"
              placeholder="Số điện thoại *"
              required
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#b8001c] focus:ring-2 focus:ring-[#b8001c]/20 outline-none text-gray-900"
            />
            <textarea
              placeholder="Nội dung liên hệ..."
              rows={4}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:border-[#b8001c] focus:ring-2 focus:ring-[#b8001c]/20 outline-none text-gray-900"
            />
            <button
              type="submit"
              className="mt-2 bg-[#22bfa2] text-white font-bold rounded-full py-3 text-lg shadow hover:bg-[#17877b] transition-colors duration-200"
            >
              Gửi liên hệ
            </button>
          </form>
          {/* Info */}
          <div className="flex flex-col gap-8 items-center md:items-start">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-[#b8001c] mb-2">
                Thông tin liên hệ
              </h3>
              <div className="text-gray-800 text-base">
                <div className="mb-2">
                  <span className="font-semibold">Địa chỉ:</span> 123 Đường KIA,
                  Quận Cầu Giấy, Hà Nội
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Hotline:</span>{" "}
                  <a
                    href="tel:18001234"
                    className="text-[#b8001c] font-semibold hover:underline"
                  >
                    1800 1234
                  </a>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:contact@niad.vn"
                    className="text-[#b8001c] font-semibold hover:underline"
                  >
                    contact@niad.vn
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Thời gian làm việc:</span>{" "}
                  8:00 - 18:00 (T2 - CN)
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <h3 className="text-xl font-bold text-[#b8001c] mb-2">
                Kết nối với chúng tôi
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#b8001c] hover:text-white text-[#b8001c] transition"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0 0 22.46 6z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#b8001c] hover:text-white text-[#b8001c] transition"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C18.36 20.07 22 16.41 22 12c0-5.5-4.46-9.96-9.96-9.96z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#b8001c] hover:text-white text-[#b8001c] transition"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.35 11.1c0-5.05-4.1-9.15-9.15-9.15S3.05 6.05 3.05 11.1c0 4.54 3.3 8.3 7.65 9.06v-6.41h-2.3v-2.65h2.3V9.41c0-2.28 1.36-3.54 3.44-3.54.99 0 2.03.18 2.03.18v2.23h-1.14c-1.13 0-1.48.7-1.48 1.42v1.7h2.52l-.4 2.65h-2.12v6.41c4.35-.76 7.65-4.52 7.65-9.06z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full rounded-2xl overflow-hidden mt-4">
              <Image
                src="/images/banners/test2.png"
                alt="NIAD Contact Map"
                width={480}
                height={220}
                className="w-full h-55 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
