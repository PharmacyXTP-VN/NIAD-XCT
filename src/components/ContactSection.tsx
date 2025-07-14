// File: src/components/ContactSection.tsx
import { Send } from "lucide-react";
import GoogleMapEmbed from "./GoogleMapEmbed";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-[#0a1a2f]/80 px-2 md:px-0 flex flex-col items-center relative z-10" style={{ paddingTop: 100, paddingBottom: 0,
      backgroundImage: "url('/images/bg-section/bg-section.png')",
    }}>
      <div className="relative w-full max-w-none mx-auto flex flex-col items-center p-0 md:p-0" style={{ minHeight: 0 }}>
        {/* Google Map Embed - full width, sát footer */}
        <div className="relative w-full">
          <GoogleMapEmbed />
          {/* Contact Card - nổi trên bản đồ, chỉ chiếm 1/3 top map, không che section trên */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-5xl z-20 group flex justify-center pointer-events-none"
            style={{ height: '33.333%', pointerEvents: 'none' }}
          >
            <div
              className="bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row items-stretch p-4 md:p-12 relative overflow-visible transition-all duration-500 ease-in-out group-hover:-translate-y-8 group-hover:shadow-3xl will-change-transform pointer-events-auto w-[98vw] max-w-5xl mx-auto"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                minHeight: '400px',
                maxHeight: '100%',
                marginTop: '16px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'stretch',
                width: '100%',
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {/* Left: Text & Decoration */}
              <div className="flex-1 flex flex-col justify-center items-start z-10 p-2 md:p-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#03bb65] mb-2 md:mb-4">NHẬN TƯ VẤN</h2>
                <div className="text-base md:text-lg lg:text-xl text-[#222] mb-4 md:mb-8">Hãy nói với chúng tôi suy nghĩ, mong muốn – góp ý của bạn.</div>
                {/* Decoration shapes */}
                <div className="flex gap-2 mt-4 md:mt-8">
                  <div className="w-8 h-4 md:w-12 md:h-6 bg-[#d81b60] rounded-b-full rotate-[-30deg]" />
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#00b894] rounded-full" />
                  <div className="w-7 h-7 md:w-10 md:h-10 bg-[#ff9800] rounded-full" />
                  <div className="w-10 h-10 md:w-14 md:h-14 border-4 md:border-8 border-[#1e3799] rounded-full border-t-transparent border-b-transparent rotate-[-30deg]" />
                  <div className="w-7 h-4 md:w-10 md:h-6 bg-[#fd5e53] rounded-t-full rotate-[-30deg]" />
                </div>
              </div>
              {/* Right: Form */}
              <form className="flex-1 flex flex-col gap-3 md:gap-4 z-10 md:ml-6 w-full max-w-md justify-center">
                <input type="text" placeholder="Họ và tên" className="bg-gray-100 text-black rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg outline-none focus:ring-2 focus:ring-[#03bb65]" />
                <div className="flex gap-3 md:gap-4">
                  <input type="email" placeholder="Email" className="bg-gray-100 text-black rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg flex-1 outline-none focus:ring-2 focus:ring-[#03bb65]" />
                  <input type="tel" placeholder="Số điện thoại" className="bg-gray-100 text-black rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg flex-1 outline-none focus:ring-2 focus:ring-[#03bb65]" />
                </div>
                <textarea placeholder="Nhập nội dung" rows={4} className="bg-gray-100 text-black rounded-xl px-4 py-3 md:px-5 md:py-4 text-base md:text-lg outline-none focus:ring-2 focus:ring-[#03bb65] resize-none min-h-[100px] md:min-h-[120px]" />
                <button type="submit" className="mt-2 flex items-center gap-2 border-2 border-[#03bb65] text-[#03bb65] font-semibold rounded-xl px-5 py-3 md:px-6 md:py-3 hover:bg-[#03bb65] hover:text-white transition">
                  <Send size={20} className="-ml-1" />
                  Gửi thông tin
                </button>
              </form>
              {/* BG Decoration absolute shapes */}
              <div className="absolute left-0 bottom-0 w-full flex justify-between items-end z-0 pointer-events-none select-none">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#00b894] rounded-t-full translate-y-1/2 -translate-x-1/3" />
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#fd5e53] rounded-full mb-4 md:mb-8" />
                <div className="w-16 h-16 md:w-24 md:h-24 border-4 md:border-8 border-[#1e3799] rounded-full border-t-transparent border-b-transparent rotate-[-30deg] mb-2 md:mb-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
