import { ChevronRight } from "lucide-react";

const aboutStats = [
	{
		icon: (
			<ChevronRight
				size={28}
				strokeWidth={2.5}
				className="text-[#03bb65]"
			/>
		),
		title: "Vốn điều lệ",
		highlight: "500 tỷ",
		desc: "Khả năng tài chính mạnh mẽ, hỗ trợ tín dụng từ hệ thống ngân hàng.",
	},
	{
		icon: (
			<ChevronRight
				size={28}
				strokeWidth={2.5}
				className="text-[#03bb65]"
			/>
		),
		title: "Năm thành lập",
		highlight: "2007",
		desc: "Kinh nghiệm lâu năm, đối tác tin cậy của nhiều ngân hàng lớn.",
	},
	{
		icon: (
			<ChevronRight
				size={28}
				strokeWidth={2.5}
				className="text-[#03bb65]"
			/>
		),
		title: "Dịch vụ chủ lực",
		highlight: "7+",
		desc: "Đa dạng dịch vụ: cho thuê xe, quản lý tòa nhà, cung cấp thiết bị, tour, bảo vệ, mua bán ô tô...",
	},
];

export default function AboutCTA() {
	return (
		<section className="relative py-16 bg-[#f0f2f5]">
			<div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
				{/* Left */}
				<div className="flex-1 text-left mb-8 md:mb-0">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#03bb65]">
						Tại sao chọn{" "}
						<span className="text-[#1d1d1f]">
							<span className="text-[#1d1d1f]">NIAD</span>?
						</span>
					</h2>
					<div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-[#1d1d1f]">
						ĐỐI TÁC UY TÍN{" "}
						<span className="text-[#03bb65]">DỊCH VỤ NGÂN HÀNG</span>
					</div>
					<div className="italic text-[#6e6e73] mb-6 text-base sm:text-lg">
						“Chúng tôi cung cấp dịch vụ dựa trên kinh nghiệm thực tế và năng
						lực tài chính vững mạnh. Bạn đang ở đúng nơi cần lựa chọn.”
					</div>
					<a
						href="/about"
						className="inline-block px-6 py-2 bg-[#03bb65] text-white rounded-lg font-semibold shadow hover:bg-[#029e54] transition mb-4"
					>
						Xem thêm
					</a>
				</div>
				{/* Right */}
				<div className="flex-1 flex flex-col gap-6">
					{aboutStats.map((stat, idx) => (
						<div
							key={idx}
							className="flex items-center bg-white rounded-2xl shadow p-6 group transition-transform duration-300 ease-in-out hover:translate-x-4"
						>
							<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#03bb65]/20 mr-6 text-3xl text-[#bfa15a]">
								{stat.icon}
							</div>
							<div>
								<span className="font-bold text-[#03bb65] text-xl mr-2">
									{stat.highlight}
								</span>
								<span className="font-semibold text-[#1d1d1f] text-lg">
									{stat.title}
								</span>
								<div className="text-[#6e6e73] text-base mt-1">
									{stat.desc}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
