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
                    <p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
                        Đối tác tin cậy trong lĩnh vực dịch vụ, vận tải và cung cấp giải
                        pháp cho ngân hàng, doanh nghiệp.
                    </p>
                </div>
            </section>
            <div
                className="min-h-screen bg-[#f0f2f5]"
            >
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="space-y-16 py-16">
                        {aboutBlocks.map((block, idx) => (
                            <section
                                key={idx}
                                className={`flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-2xl p-10 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                            >
                                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                                    <div className={`w-full flex items-center justify-center bg-[#f0f2f5] rounded-2xl ${idx === 0 ? 'h-[48vw] max-h-[380px] min-h-[180px] md:h-[380px]' : 'h-[30vw] max-h-[260px] min-h-[120px] md:h-[260px]'}`}
                                        style={{ transition: 'height 0.2s' }}>
                                        <Image
                                            src={block.image}
                                            alt={block.title}
                                            fill={false}
                                            width={idx === 0 ? 520 : 400}
                                            height={idx === 0 ? 340 : 220}
                                            className={`rounded-2xl object-contain shadow-lg w-auto h-full max-w-full max-h-full`}
                                            style={{ objectFit: 'contain', background: '#f0f2f5' }}
                                            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 520px"
                                        />
                                    </div>
                                    {idx === 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-[400px]">
                                            <div className="bg-[#e6f9f0] rounded-xl p-4 text-center shadow">
                                                <div className="text-2xl font-bold text-[#03bb65] mb-1">500 tỷ</div>
                                                <div className="text-[#1d1d1f] text-sm">Vốn điều lệ</div>
                                            </div>
                                            <div className="bg-[#e6f9f0] rounded-xl p-4 text-center shadow">
                                                <div className="text-2xl font-bold text-[#03bb65] mb-1">2007</div>
                                                <div className="text-[#1d1d1f] text-sm">Năm thành lập</div>
                                            </div>
                                            <div className="bg-[#e6f9f0] rounded-xl p-4 text-center shadow">
                                                <div className="text-2xl font-bold text-[#03bb65] mb-1">7+</div>
                                                <div className="text-[#1d1d1f] text-sm">Dịch vụ chủ lực</div>
                                            </div>
                                        </div>
                                    )}
                                    {idx === 1 && (
                                        <div className="mt-6 bg-[#e6f9f0] rounded-xl p-6 shadow text-center w-full max-w-[500px]">
                                            <div className="text-xl font-semibold text-[#03bb65] mb-2">
                                                Đã phục vụ gần 300 xe cho các ngân hàng lớn
                                            </div>
                                            <div className="text-[#1d1d1f]">
                                                Đầy đủ giấy tờ pháp lý, năng lực cung ứng số lượng lớn,
                                                đáp ứng mọi yêu cầu đặc thù của khách hàng tổ chức tín
                                                dụng, doanh nghiệp vàng bạc, ngoại tệ...
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[320px] md:min-h-[380px]">
                                    <h2 className="text-3xl font-extrabold mb-4 text-[#03bb65] tracking-tight">
                                        {block.title}
                                    </h2>
                                    <p className="text-lg text-[#6e6e73] whitespace-pre-line mb-6">
                                        {block.content}
                                    </p>
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