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

export default function NewsSection() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const settings = {
		centerMode: true,
		centerPadding: "0px",
		slidesToShow: 3,
		infinite: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 2500,
		beforeChange: (current: number, next: number) => setCurrentSlide(next),
	};

	return (
		<section id="news" className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-2xl font-bold text-gray-800 mb-8">
					Sản Phẩm Mới
				</h2>
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
