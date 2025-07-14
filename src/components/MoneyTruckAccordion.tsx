"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronDown } from "lucide-react";

const content = [
    {
        title: "Xe chở tiền:",
        desc: `Xe cơ sở do NIAD cung cấp là loại xe chở tiền được sản xuất, lắp ráp trên nền xe Pick-up cabin kép, xe tải van hoặc xe 7 chỗ thông dụng.`,
        img: [
            "/images/cars/test2-removebg-preview.png",
            "/images/cars/test2.png",
            "/images/cars/tesst-removebg-preview.png"
        ],
    },
    {
        title: "Chất lượng ưu việt:",
        desc: `Thiết kế đảm bảo các tiêu chuẩn xe thiết kế chở tiền theo quy định của Ngân hàng Nhà nước.\nThêm nhiều tính năng hỗ trợ tối đa cho người sử dụng trong quá trình xếp dỡ hàng hóa.\nThùng chở tiền được sản xuất, lắp ráp trên dây truyền máy móc công nghệ hiện đại, sử dụng toàn bộ vật liệu chất lượng cao, có độ bền lâu năm giúp kéo dài tuổi thọ của sản phẩm, giảm chi phí bảo trì, bảo dưỡng và đảm bảo không ảnh hưởng đến kết cấu của xe cơ sở.\nXe cơ sở được bảo hành 3 năm hoặc 1.000 km tại các trạm bảo hành chính hãng trên toàn quốc.`,
        img: [
            "/images/cars/test3.png",
            "/images/cars/test2-removebg-preview.png",
            "/images/cars/test2.png"
        ],
    },
    {
        title: "Giá cả cạnh tranh:",
        desc: `Sản xuất trên loại xe cơ sở có giá thành hợp lý, đặc biệt là loại xe bán tải có dung tích dưới 2.500 cc đang được hưởng thuế suất (thuế nhập khẩu, thuế tiêu thụ đặc biệt) và lệ phí trước bạ hợp lý hơn.\nChi phí sản xuất thùng chở tiền trong nước đảm bảo cạnh tranh được so với chi phí của dòng xe chở tiền nhập khẩu nguyên chiếc.`,
        img: [
            "/images/cars/tesst-removebg-preview.png",
            "/images/cars/test2-removebg-preview.png",
            "/images/cars/test2.png"
        ],
    },
    {
        title: "Hình thức hợp đồng:",
        desc: `Hợp đồng mua bán.\nHợp đồng thuê dài hạn.`,
        img: [
            "/images/cars/test2.png",
            "/images/cars/test3.png",
            "/images/cars/tesst-removebg-preview.png"
        ],
    },
    {
        title: "Thanh lý dễ dàng:",
        desc: `Không hạn chế đối tượng mua lại (không bị truy thu thuế khi bán cho đối tượng khác không phải tổ chức tín dụng).\nTiết kiệm thời gian và kinh phí thực hiện thủ tục thanh lý.`,
        img: [
            "/images/cars/test2-removebg-preview.png",
            "/images/cars/test2.png",
            "/images/cars/test3.png"
        ],
    },
    {
        title: "Thời gian nhanh chóng:",
        desc: `Số lượng linh hoạt từ 01 -100 xe.\nThời gian giao hàng chỉ từ 1-3 tháng kể từ ngày đặt cọc.`,
        img: [
            "/images/cars/test2-removebg-preview.png",
            "/images/cars/test2.png",
            "/images/cars/test3.png"
        ],
    },
    {
        title: "Pháp lý an toàn:",
        desc: `Có chứng nhận chất lượng, an toàn kỹ thuật của cục đăng kiểm.\nXác nhận xe phù hợp với tiêu chuẩn thiết kế chở tiền của NHNN.\nCó giấy chứng nhận đăng ký xe do cơ quan công an cấp.`,
        img: [
            "/images/cars/test2-removebg-preview.png",
            "/images/cars/test2.png",
            "/images/cars/test3.png"
        ],
    },
];

export default function MoneyTruckAccordion() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section
            id="moneyTruckAccordion"
            className="relative bg-cover bg-center scroll-mt-32 transition-all duration-500"
            style={{
                backgroundImage: "url('/images/bg-section/bg-section.png')",
                minHeight: openIdx !== null ? 'auto' : '600px',
                paddingBottom: openIdx !== null ? '6rem' : '1rem', // giảm padding-bottom còn 1 nửa khi xổ
            }}
        >
            <div className="absolute inset-0 bg-[#0a1a2f]/80 pointer-events-none" />
            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">

                <div className="flex flex-col md:flex-row gap-8 w-full items-stretch md:items-start">
                    {/* Left: Ảnh minh họa */}
                    <div className="flex-1 flex justify-center md:items-start items-start md:mt-[calc(112px+4rem)] mt-0">
                        {openIdx !== null ? (
                            <div className="flex flex-col gap-8 items-center w-full">
                                {/* 3 ảnh vát góc, xếp so le dọc */}
                                <div className="flex flex-col gap-8 w-full align-center">
                                    <div className="relative w-[420px] h-[280px] md:w-[420px] md:h-[260px] bg-white shadow-xl flex items-center justify-start ml-0 md:ml-0 rounded-tl-[48px] rounded-br-3xl rounded-tr-3xl rounded-bl-3xl">
                                        <Image
                                            src={content[openIdx].img[0]}
                                            alt={content[openIdx].title + ' 1'}
                                            fill
                                            className="object-contain rounded-tl-[48px] rounded-br-3xl rounded-tr-3xl rounded-bl-3xl"
                                            priority
                                        />
                                    </div>
                                    <div className="relative w-[420px] h-[280px] md:w-[420px] md:h-[260px] bg-white shadow-xl flex items-center justify-end mr-0 md:mr-8 rounded-tr-[48px] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl">
                                        <Image
                                            src={content[openIdx].img[1]}
                                            alt={content[openIdx].title + ' 2'}
                                            fill
                                            className="object-contain rounded-tr-[48px] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                                            priority
                                        />
                                    </div>
                                    <div className="relative w-[420px] h-[280px] md:w-[420px] md:h-[260px] bg-white shadow-xl flex items-center justify-start ml-0 md:ml-0 rounded-tl-[48px] rounded-br-3xl rounded-tr-3xl rounded-bl-3xl">
                                        <Image
                                            src={content[openIdx].img[2]}
                                            alt={content[openIdx].title + ' 3'}
                                            fill
                                            className="object-contain rounded-tl-[48px] rounded-br-3xl rounded-tr-3xl rounded-bl-3xl"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-[420px] h-[420px] md:w-[420px] md:h-[420px] bg-white rounded-tl-[60px] rounded-br-[60px] rounded-tr-3xl rounded-bl-3xl shadow-xl flex items-center justify-center">
                                <Image
                                    src="/images/cars/test2-removebg-preview.png"
                                    alt="Ảnh minh họa mặc định"
                                    fill
                                    className="object-contain rounded-tl-[60px] rounded-br-[60px] rounded-tr-3xl rounded-bl-3xl"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                    {/* Right: Accordion */}
                    <div className="flex-1 flex flex-col gap-6 min-h-[500px] justify-center self-stretch">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-white">
                            Ưu điểm vượt trội
                        </h2>
                        {content.map((item, idx) => (
                            <div key={idx} className="mb-4">
                                <button
                                    className={`w-full text-left px-6 py-5 rounded-2xl shadow font-semibold text-lg md:text-xl transition-all flex items-center justify-between border-2 focus:outline-none
                ${openIdx === idx
                                            ? "bg-[#1d1d1d] text-[#03bb65] border-[#333333]"
                                            : "bg-[#181a1b] text-[#03bb65] border-transparent hover:border-[#333333]"
                                        }
            `}
                                    onClick={() =>
                                        setOpenIdx(openIdx === idx ? null : idx)
                                    }
                                >
                                    <span>{item.title}</span>
                                    <span className="ml-2 text-2xl">
                                        {openIdx === idx ? (
                                            <ChevronDown size={24} strokeWidth={2.5} />
                                        ) : (
                                            <ChevronRight size={24} strokeWidth={2.5} />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIdx === idx ? 'opacity-100 py-5' : 'opacity-0 py-0'} bg-white text-[#222] rounded-2xl border border-[#181a1b] px-6 mt-1 text-base md:text-lg shadow-inner`}
                                    style={{
                                        maxHeight: openIdx === idx ? '500px' : '0px',
                                    }}
                                >
                                    {openIdx === idx && item.desc.split("\n").map((line, i) => (
                                        <div key={i} className="mb-2 last:mb-0">
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
