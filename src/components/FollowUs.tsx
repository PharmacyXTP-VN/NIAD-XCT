// File: src/components/FollowUs.tsx
import { Mail, Facebook, Youtube, Phone } from "lucide-react";

export default function FollowUs() {
  return (
    <section id="follow-us" className="w-full bg-[#1a1a2e] py-16 px-2 md:px-0 relative py-16 bg-cover bg-center"
			style={{
				backgroundImage: "url('/images/bg-section/bg-section.png')",
			}}>
      <div className="max-w-6xl mx-auto flex flex-col items-end">
        <h2 className="text-right w-full font-bold text-4xl md:text-5xl text-white mb-2 pr-2 md:pr-0">
          <span className="text-[#03bb65]">THEO DÕI</span> CHÚNG TÔI
        </h2>
        <div className="text-xl md:text-2xl font-semibold text-[#222] mb-2 mt-2 text-right w-full">
          <span className="text-white">GIỮ </span>
          <span className="text-[#03bb65]">LIÊN LẠC</span>
        </div>
        <div className="text-gray-500 mb-10 text-right w-full max-w-xl">
          Cập nhật những tin tức - ưu đãi miễn phí nhanh nhất.
        </div>
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Facebook */}
          <a href="https://www.facebook.com/nganluc.vn" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[260px] max-w-[340px] bg-white rounded-2xl shadow-md flex items-center gap-4 px-6 py-5 border border-[#e5e7eb] hover:shadow-lg transition-transform duration-300 hover:scale-105">
            <span className="bg-[#4267B2] rounded-full p-3 text-white text-3xl flex items-center justify-center">
              <Facebook size={28} />
            </span>
            <div>
              <div className="text-[#03bb65] font-semibold text-lg">Facebook</div>
              <div className="text-[#222] text-base">NEWS FEED</div>
            </div>
          </a>
          {/* Youtube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[260px] max-w-[340px] bg-white rounded-2xl shadow-md flex items-center gap-4 px-6 py-5 border border-[#e5e7eb] hover:shadow-lg transition-transform duration-300 hover:scale-105">
            <span className="bg-[#FF0000] rounded-full p-3 text-white text-3xl flex items-center justify-center">
              <Youtube size={28} />
            </span>
            <div>
              <div className="text-[#03bb65] font-semibold text-lg">YouTube</div>
              <div className="text-[#222] text-base">VIDEO</div>
            </div>
          </a>
          {/* Gmail */}
          <a href="hotro@nganluc.vn" className="flex-1 min-w-[260px] max-w-[340px] bg-white rounded-2xl shadow-md flex items-center gap-4 px-6 py-5 border border-[#e5e7eb] hover:shadow-lg transition-transform duration-300 hover:scale-105">
            <span className="bg-[#F26A36] rounded-full p-3 text-white text-3xl flex items-center justify-center">
              <Mail size={28} />
            </span>
            <div>
              <div className="text-[#03bb65] font-semibold text-lg">Gmail</div>
              <div className="text-[#222] text-base">nganluc.vn</div>
            </div>
          </a>
          {/* Mobile */}
          <a href="tel:024 730 446 88" className="flex-1 min-w-[260px] max-w-[340px] bg-white rounded-2xl shadow-md flex items-center gap-4 px-6 py-5 border border-[#e5e7eb] hover:shadow-lg transition-transform duration-300 hover:scale-105">
            <span className="bg-[#03bb65] rounded-full p-3 text-white text-3xl flex items-center justify-center">
              <Phone size={28} />
            </span>
            <div>
              <div className="text-[#03bb65] font-semibold text-lg">Mobile</div>
              <div className="text-[#222] text-base">024 730 446 88</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
