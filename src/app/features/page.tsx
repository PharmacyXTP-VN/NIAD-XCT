// File: src/app/features/page.tsx
"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import {
  TruckIcon,
  DocumentTextIcon,
  ClockIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function FeaturesPage() {
  // Sắp xếp lại các card theo yêu cầu
  // 3 card ít text nhất
  const featuresRow1 = [
    {
      id: 1,
      title: "Xe chở tiền",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Xe cơ sở do NIAD cung cấp là <b>loại xe chở tiền</b> được sản xuất,
            lắp ráp trên nền xe Pick-up cabin kép, xe tải van hoặc xe 7 chỗ
            thông dụng.
          </li>
        </ul>
      ),
      icon: <TruckIcon className="w-10 h-10 text-[#b8001c]" />,
      image: "/images/cars/test2-removebg-preview.png",
    },
    {
      id: 4,
      title: "Hình thức hợp đồng",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Hợp đồng mua bán.</li>
          <li>Hợp đồng thuê dài hạn.</li>
        </ul>
      ),
      icon: <DocumentTextIcon className="w-10 h-10 text-[#b8001c]" />,
      image: "/images/test2-removebg-preview.png",
    },
    {
      id: 6,
      title: "Thời gian nhanh chóng",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Số lượng linh hoạt từ 01 - 100 xe.</li>
          <li>Thời gian giao hàng chỉ từ 1-3 tháng kể từ ngày đặt cọc.</li>
        </ul>
      ),
      icon: <ClockIcon className="w-10 h-10 text-[#b8001c]" />,
      image: "/images/test3.png",
    },
  ];
  // 3 card trung bình
  const featuresRow2 = [
    {
      id: 5,
      title: "Thanh lý dễ dàng",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Không hạn chế đối tượng mua lại (không bị truy thu thuế khi bán cho
            đối tượng khác không phải tổ chức tín dụng).
          </li>
          <li>Tiết kiệm thời gian và kinh phí thực hiện thủ tục thanh lý.</li>
        </ul>
      ),
      icon: <ArrowsRightLeftIcon className="w-10 h-10 text-[#b8001c]" />,
      image: "/images/cars/test2.png",
    },
    {
      id: 7,
      title: "Pháp lý an toàn",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Có chứng nhận chất lượng, an toàn kỹ thuật của cục đăng kiểm.</li>
          <li>
            Xác nhận xe phù hợp với tiêu chuẩn thiết kế chở tiền của NHNN.
          </li>
          <li>Có giấy chứng nhận đăng ký xe do cơ quan công an cấp.</li>
        </ul>
      ),
      icon: <ShieldCheckIcon className="w-10 h-10 text-[#b8001c]" />,
      image: "/images/cars/test2-removebg-preview.png",
    },
    {
      id: 3,
      title: "Giá cả cạnh tranh",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Sản xuất trên loại xe cơ sở có giá thành hợp lý, đặc biệt là loại xe
            bán tải có dung tích dưới 2.500 cc đang được hưởng thuế suất (thuế
            nhập khẩu, thuế tiêu thụ đặc biệt) và lệ phí trước bạ hợp lý hơn.
          </li>
          <li>
            Chi phí sản xuất thùng chở tiền trong nước đảm bảo cạnh tranh được
            so với chi phí của dòng xe chở tiền nhập khẩu nguyên chiếc.
          </li>
        </ul>
      ),
      icon: <CurrencyDollarIcon className="w-10 h-10 text-[#b8001c]" />,
      image: "/images/test3.png",
    },
  ];
  // 1 card nhiều text nhất
  const featureSpecial = {
    id: 2,
    title: "Chất lượng ưu việt",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Thiết kế đảm bảo các tiêu chuẩn xe thiết kế chở tiền theo quy định của
          Ngân hàng Nhà nước.
        </li>
        <li>
          Thêm nhiều tính năng hỗ trợ tối đa cho người sử dụng trong quá trình
          xếp dỡ hàng hóa.
        </li>
        <li>
          Thùng chở tiền được sản xuất, lắp ráp trên dây truyền máy móc công
          nghệ hiện đại, sử dụng toàn bộ vật liệu chất lượng cao, có độ bền lâu
          năm giúp kéo dài tuổi thọ của sản phẩm, giảm chi phí bảo trì, bảo
          dưỡng và đảm bảo không ảnh hưởng đến kết cấu của xe cơ sở.
        </li>
        <li>
          Xe cơ sở được bảo hành 3 năm hoặc 1.000 km tại các trạm bảo hành chính
          hãng trên toàn quốc.
        </li>
      </ul>
    ),
    icon: <SparklesIcon className="w-12 h-12 text-[#b8001c]" />,
    image: "/images/cars/test2.png",
  };

  // Lấy 3 card đầu và 3 card tiếp theo cho grid
  const featuresGrid = [...featuresRow1, ...featuresRow2];

  return (
    <DefaultLayout>
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        {/* Hero Section */}
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Ưu điểm nổi bật
          </h1>
          <p className="text-2xl md:text-3xl text-red-100 max-w-2xl mx-auto mb-8 font-medium">
            Khám phá những tính năng vượt trội làm nên sự khác biệt của KIA
          </p>
          <button className="mt-4 px-10 py-4 bg-white text-[#b8001c] font-bold rounded-full shadow-xl text-lg hover:bg-[#b8001c] hover:text-white transition-colors duration-300">
            Liên hệ ngay
          </button>
        </div>
      </section>

      <div className="min-h-screen bg-[#f7f7fa]">
        {/* Features Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {featuresGrid.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white rounded-3xl shadow-2xl border border-gray-100 hover:scale-105 hover:shadow-3xl transition-transform duration-300 flex flex-col items-center p-8 min-h-[420px] relative group"
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white border-4 border-[#b8001c] shadow-lg mb-4 absolute -top-10 left-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform">
                    <span>{feature.icon}</span>
                  </div>
                  <div className="mt-12 w-full flex flex-col items-center">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={220}
                      height={110}
                      className="mb-4 object-contain rounded-xl shadow"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                      {feature.title}
                    </h3>
                    <div className="text-gray-600 text-base text-center leading-relaxed">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Feature Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-[#b8001c] flex flex-col items-center p-10 relative">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white border-4 border-[#b8001c] shadow-lg mb-4 absolute -top-12 left-1/2 -translate-x-1/2">
                <span className="text-5xl">{featureSpecial.icon}</span>
              </div>
              <div className="mt-16 w-full flex flex-col items-center">
                <Image
                  src={featureSpecial.image}
                  alt={featureSpecial.title}
                  width={260}
                  height={130}
                  className="mb-6 object-contain rounded-xl shadow"
                />
                <h3 className="text-3xl font-extrabold text-[#b8001c] mb-4 text-center">
                  {featureSpecial.title}
                </h3>
                <div className="text-gray-700 text-lg text-center leading-relaxed">
                  {featureSpecial.description}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-5xl font-extrabold text-[#b8001c] mb-2">
                  15+
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  Năm kinh nghiệm
                </div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-[#b8001c] mb-2">
                  50+
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  Đại lý toàn quốc
                </div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-[#b8001c] mb-2">
                  100K+
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  Khách hàng hài lòng
                </div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-[#b8001c] mb-2">
                  24/7
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  Hỗ trợ khách hàng
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
