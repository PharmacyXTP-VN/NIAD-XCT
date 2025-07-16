"use client";
import { useState } from "react";
import Slider from "react-slick";
import clsx from "clsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const newsList = [
	{
		title: "Ra mắt xe chở tiền chống đạn phiên bản 2025",
		description: "Dòng xe mới đạt tiêu chuẩn EN1063 cấp độ B6 chống đạn.",
		image: "/images/news/test2.png",
		date: "12/05/2025",
	},
	{
		title: "Ký kết hợp tác với ngân hàng quốc tế",
		description: "Cung cấp 50 xe vận chuyển tiền cho hệ thống ATM toàn quốc.",
		image: "/images/news/test2.png",
		date: "05/05/2025",
	},
	{
		title: "Hội thảo “An ninh vận chuyển tài chính 4.0”",
		description: "Giải pháp tích hợp GPS, camera AI và cảnh báo xâm nhập.",
		image: "/images/news/test2.png",
		date: "25/04/2025",
	},
	{
		title: "Tăng cường bảo mật xe vận chuyển tiền",
		description: "Trang bị khóa sinh trắc học và mã hóa dữ liệu đường truyền.",
		image: "/images/news/test2.png",
		date: "20/04/2025",
	},
	{
		title: "Hợp tác chiến lược cùng Bộ Công An",
		description: "Đảm bảo an toàn tuyệt đối cho mọi tuyến đường vận chuyển.",
		image: "/images/news/test2.png",
		date: "18/04/2025",
	},
	{
		title: "Xe mới tích hợp AI nhận diện khuôn mặt",
		description: "Chống trộm và phát hiện hành vi bất thường tức thời.",
		image: "/images/news/test2.png",
		date: "15/04/2025",
	},
	{
		title: "Hệ thống định vị toàn cầu chính xác từng giây",
		description: "Ứng dụng công nghệ GNSS vào vận hành xe bọc thép.",
		image: "/images/news/test2.png",
		date: "10/04/2025",
	},
	{
		title: "Tham gia triển lãm công nghệ bảo mật 2025",
		description: "Trưng bày dòng xe vận chuyển tiền hiện đại nhất Đông Nam Á.",
		image: "/images/news/test2.png",
		date: "05/04/2025",
	},
];

const xeChoTienFeatures = [
	{
		title: "Xe cơ sở đa dạng",
		desc: "Xe Pick-up cabin kép, xe tải van, xe 7 chỗ thông dụng. Đảm bảo tiêu chuẩn thiết kế chở tiền của NHNN.",
	},
	{
		title: "Chất lượng ưu việt",
		desc: "Thùng chở tiền sản xuất trên dây chuyền hiện đại, vật liệu cao cấp, tuổi thọ lâu dài, bảo hành 3 năm hoặc 1.000 km toàn quốc.",
	},
	{
		title: "Giá cả cạnh tranh",
		desc: "Xe cơ sở giá hợp lý, xe bán tải dưới 2.500cc hưởng thuế suất ưu đãi, chi phí sản xuất thùng trong nước cạnh tranh với xe nhập khẩu.",
	},
	{
		title: "Hợp đồng linh hoạt",
		desc: "Hợp đồng mua bán, thuê dài hạn, thanh lý dễ dàng, không hạn chế đối tượng mua lại, tiết kiệm thời gian và chi phí thủ tục.",
	},
	{
		title: "Thời gian giao hàng nhanh",
		desc: "Số lượng linh hoạt từ 01-100 xe, giao hàng chỉ từ 1-3 tháng kể từ ngày đặt cọc.",
	},
	{
		title: "Pháp lý an toàn",
		desc: "Có chứng nhận chất lượng, an toàn kỹ thuật, xác nhận tiêu chuẩn NHNN, giấy đăng ký xe do công an cấp.",
	},
];

export default function XeChoTienSection() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const images = [
		"/images/cars/test2-removebg-preview.png",
		"/images/test3.png",
		"/images/tesst-removebg-preview.png",
		"/images/banners/xepajero1.png",
		"/images/banners/isuzu.png",
		"/images/banners/isuzu2.png",
	];
	const settings = {
		centerMode: true,
		centerPadding: "0px",
		slidesToShow: 3,
		infinite: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 2500,
		beforeChange: (_: number, next: number) => setCurrentSlide(next),
	};

	return (
		<section id="xe-cho-tien" className="py-16 bg-[#f0f2f5]"
		>
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-center font-extrabold text-3xl md:text-5xl mb-2 tracking-tight drop-shadow-lg leading-tight">
					<span className="text-[#1d1d1f]">ƯU ĐIỂM</span>
					<span className="text-[#03bb65]"> VƯỢT TRỘI</span>
				</h2>
				<p className="text-center text-[#6e6e73] text-base md:text-lg mb-8 font-medium max-w-2xl mx-auto">
					Những lý do khiến xe chở tiền NIAD là lựa chọn hàng đầu cho ngân hàng và doanh nghiệp vận chuyển giá trị cao.
				</p>
				<Slider {...settings}>
					{images.map((img, idx) => (
						<div key={idx} className="px-2">
							<div
								className={clsx(
									"group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500",
									idx === currentSlide
										? "bg-white shadow-xl"
										: "bg-gray-100 scale-95 opacity-60"
								)}
							>
								<div className="w-full flex items-center justify-center">
									<Image
										src={img}
										alt={`Xe chở tiền ${idx + 1}`}
										className="object-contain rounded-2xl drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
										width={320}
										height={220}
										priority={idx === 0}
										style={{ maxHeight: 220, width: '100%', height: 'auto', minHeight: 120 }}
									/>
								</div>
								{/* Overlay nội dung khi hover */}
								<div className="absolute inset-0 bg-black bg-opacity-70 text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center">
									<h3 className="text-lg font-bold mb-2 text-[#03bb65] text-center">
										{xeChoTienFeatures[idx % xeChoTienFeatures.length].title}
									</h3>
									<p className="text-sm text-center">
										{xeChoTienFeatures[idx % xeChoTienFeatures.length].desc}
									</p>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</section>
	);
}

export function NewsSection() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const settings = {
		centerMode: true,
		centerPadding: "0px",
		slidesToShow: 3,
		infinite: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 2500,
		beforeChange: (_: number, next: number) => setCurrentSlide(next),
	};

	return (
		<section id="news" className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4">
				<Slider {...settings}>
					{newsList.map((news, index) => {
						const isActive = index === currentSlide;
						return (
							<div key={index} className="px-2">
								<div
									className={clsx(
										"group relative overflow-hidden rounded-xl shadow transition-all duration-500",
										isActive
											? "bg-white scale-105 shadow-xl"
											: "bg-gray-100 scale-95 opacity-50"
									)}
								>
									<Image
										src={news.image}
										alt={news.title}
										className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
										width={400}
										height={256}
									/>

									{/* Overlay hiển thị khi hover */}
									<div className="absolute inset-0 bg-black bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end">
										<p className="text-sm">{news.date}</p>
										<h3 className="text-lg font-bold">
											{news.title}
										</h3>
										<p className="text-sm">
											{news.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</Slider>
			</div>
		</section>
	);
}
