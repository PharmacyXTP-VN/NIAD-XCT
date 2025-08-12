"use client";
import { useState, useEffect } from "react";
import axios from "axios";
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


interface AdvantageImage {
	url: string;
	title: string;
	description: string;
}

export default function XeChoTienSection() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [images, setImages] = useState<AdvantageImage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		axios
			.get("/api/images/types/advantage")
			.then((res) => {
				const arr = Array.isArray(res.data.data) ? res.data.data : [];
				// arr là mảng object { url, title, description, ... }
				setImages(arr.map((img: any) => ({
					url: img.url,
					title: img.title || "",
					description: img.description || ""
				})));
				setError("");
			})
			.catch(() => setError("Không thể tải ảnh ưu điểm vượt trội"))
			.finally(() => setLoading(false));
	}, []);

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
		<section id="xe-cho-tien" className="py-16 bg-[#f0f2f5]">
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-center font-extrabold text-3xl md:text-5xl mb-2 tracking-tight drop-shadow-lg leading-tight">
					<span className="text-[#1d1d1f]">ƯU ĐIỂM</span>
					<span className="text-[#006b68]"> VƯỢT TRỘI</span>
				</h2>
				<p className="text-center text-[#6e6e73] text-base md:text-lg mb-8 font-medium max-w-2xl mx-auto">
					Những lý do khiến xe chở tiền NIAD là lựa chọn hàng đầu cho ngân hàng và doanh nghiệp vận chuyển giá trị cao.
				</p>
				{loading ? (
					<div className="text-center py-8 text-gray-400 w-full">Đang tải ảnh...</div>
				) : error ? (
					<div className="text-center py-8 text-red-500 w-full">{error}</div>
				) : (
					<Slider {...settings}>
						{Array.isArray(images) && images.length > 0 ? (
							images.map((img, idx) => (
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
												src={img.url}
												alt={img.title || `Xe chở tiền ${idx + 1}`}
												className="object-contain rounded-2xl drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
												width={320}
												height={220}
												priority={idx === 0}
												style={{ maxHeight: 220, width: "100%", height: "auto", minHeight: 120 }}
											/>
										</div>
										{/* Overlay nội dung khi hover */}
										<div className="absolute inset-0 bg-black bg-opacity-70 text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center">
											<h3 className="text-lg font-bold mb-2 text-[#006b68] text-center">
												{img.title || `Ưu điểm vượt trội ${idx + 1}`}
											</h3>
											<p className="text-sm text-center">
												{img.description || ""}
											</p>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-8 text-gray-400 w-full">Chưa có hình ảnh ưu điểm vượt trội</div>
						)}
					</Slider>
				)}
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
										<h3 className="text-lg font-bold">{news.title}</h3>
										<p className="text-sm">{news.description}</p>
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
