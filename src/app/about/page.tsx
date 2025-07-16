import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const aboutBlocks = [
  {
    image: "/d6dc6f35-0b5c-4483-89a9-9e04d4e32c5e.png",
    title: "Về NIAD",
    content: `Công ty cổ Phần Đầu tư và Phát triển Nguồn Lực (NIAD) được thành lập từ năm 2007 trên cơ sở vốn góp của các cán bộ nhân viên Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV) là đoàn viên công đoàn sinh hoạt tại các công đoàn cơ sở trên toàn hệ thống BIDV.\n\nVới mục tiêu bảo toàn và gia tăng lợi ích cho người góp vốn, NIAD luôn lựa chọn các ngành nghề kinh doanh an toàn với mức sinh lời hợp lý, trong đó NIAD đặc biệt chú trọng đến các hoạt động kinh doanh dịch vụ. Hiện nay NIAD đang cung cấp hàng loạt dịch vụ phục vụ hoạt động của hệ thống BIDV nói riêng và các Ngân hàng nói chung mà nổi chung trên toàn quốc bao gồm:\n\n• Dịch vụ cho thuê xe ô tô hoạt động;\n• Dịch vụ quản lý tòa nhà;\n• Dịch vụ cung cấp máy móc thiết bị văn phòng, máy phát điện, điều hòa;\n• Đại lý vé máy bay;\n• Dịch vụ tour du lịch, tổ chức sự kiện;\n• Dịch vụ bảo vệ an ninh;\n• Dịch vụ mua bán ô tô\n\nVới tiềm năng về khả năng tài chính với mức vốn điều lệ gần 500 tỷ đồng cũng như khả năng hỗ trợ tín dụng từ hệ thống Ngân hàng chúng tôi hy vọng sẽ đáp ứng được những nhu cầu mong muốn của Quý vị.`,
  },
  {
    image: "/test2.png",
    title: "Năng lực, kinh nghiệm cung cấp xe",
    content: `Chúng tôi đã thực hiện cung cấp xe ô tô bán tải phục vụ nhu cầu hoạt động ngân hàng di động cho một số ngân hàng với số lượng xe gần 300 xe. Với kinh nghiệm phục vụ nhu cầu xe ô tô cho các ngân hàng nhiều năm qua, NIAD hoàn toàn tin tưởng sẽ đáp ứng nhu cầu xe ô tô của Quý khách hàng một cách tốt nhất.\n\nXe chở tiền hoán cải từ xe bán tải là sản phẩm mới mà chúng tôi nghiên cứu đưa ra thị trường nhằm đáp ứng nhu cầu xe chuyên dụng cho các tổ chức tín dụng, doanh nghiệp kinh doanh vàng bạc, thu đổi ngoại tệ,... Tính đến thời điểm hiện tại, chúng tôi đang là đơn vị duy nhất có khả năng cung cấp xe ô tô bán tải chở tiền với số lượng không giới hạn, đã có đầy đủ giấy tờ thẩm định thiết kế và cấp phép lưu hành cho xe chuyên dụng của các cơ quan chức năng (Ngân hàng Nhà nước, Cục đăng kiểm,...)`,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
            Về NIAD
          </h1>
          <p className="text-2xl md:text-3xl text-red-100 max-w-2xl mx-auto font-medium">
            Đối tác tin cậy trong lĩnh vực dịch vụ, vận tải và cung cấp giải
            pháp cho ngân hàng, doanh nghiệp.
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-[#1a1a2e]"
      style={{
				backgroundImage: "url('/images/bg-section/bg-section.png')",
			}}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            {aboutBlocks.map((block, idx) => (
              <section
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-2xl p-10 ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  <Image
                    src={block.image}
                    alt={block.title}
                    width={600}
                    height={400}
                    className="rounded-2xl w-full h-auto object-cover shadow-lg"
                    style={{ maxWidth: 500 }}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl font-extrabold mb-4 text-[#b8001c]">
                    {block.title}
                  </h2>
                  <p className="text-lg text-gray-700 whitespace-pre-line mb-6">
                    {block.content}
                  </p>
                  {idx === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="bg-[#f8f8f8] rounded-xl p-6 text-center shadow">
                        <div className="text-3xl font-bold text-[#b8001c] mb-2">
                          500 tỷ
                        </div>
                        <div className="text-gray-700">Vốn điều lệ</div>
                      </div>
                      <div className="bg-[#f8f8f8] rounded-xl p-6 text-center shadow">
                        <div className="text-3xl font-bold text-[#b8001c] mb-2">
                          2007
                        </div>
                        <div className="text-gray-700">Năm thành lập</div>
                      </div>
                      <div className="bg-[#f8f8f8] rounded-xl p-6 text-center shadow">
                        <div className="text-3xl font-bold text-[#b8001c] mb-2">
                          7+
                        </div>
                        <div className="text-gray-700">Dịch vụ chủ lực</div>
                      </div>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="mt-6 bg-[#f8f8f8] rounded-xl p-6 shadow text-center">
                      <div className="text-xl font-semibold text-[#b8001c] mb-2">
                        Đã phục vụ gần 300 xe cho các ngân hàng lớn
                      </div>
                      <div className="text-gray-700">
                        Đầy đủ giấy tờ pháp lý, năng lực cung ứng số lượng lớn,
                        đáp ứng mọi yêu cầu đặc thù của khách hàng tổ chức tín
                        dụng, doanh nghiệp vàng bạc, ngoại tệ...
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}