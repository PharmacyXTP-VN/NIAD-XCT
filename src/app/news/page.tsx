"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";

// Mock data cho tin nhiều và tin mới
const newsPopular = [
	{
		title: "THACO AUTO giới thiệu KIA NEW CARNIVAL HYBRID - KHẲNG ĐỊNH VỊ THẾ DẪN ĐẦU",
		description: "Kia New Carnival Hybrid ra mắt khách hàng, tạo nên 'bước nhảy vọt' cho dòng xe MPV.",
		image: "/images/news/test2.png",
		date: "12/07/2025",
	},
	{
		title: "Kia New Seltos ưu đãi đặc biệt: 55 triệu, giá chỉ từ 569 triệu đồng",
		description: "Ưu đãi hấp dẫn cho khách hàng mua xe Kia New Seltos trong tháng này.",
		image: "/images/news/test2.png",
		date: "10/07/2025",
	},
	{
		title: "Tháng 5 chốt Hè, Kia ưu đãi lớn hàng loạt mẫu xe",
		description: "Nhiều mẫu xe Kia giảm giá sâu, hỗ trợ phí trước bạ cho khách hàng.",
		image: "/images/news/test2.png",
		date: "05/07/2025",
	},
	{
		title: "Kia New Carnival Hybrid thu hút khách hàng, 'bước tiến' mới",
		description: "Sản phẩm mới nhận được nhiều phản hồi tích cực từ khách hàng.",
		image: "/images/news/test2.png",
		date: "01/07/2025",
	},
];

const newsLatest = [
	{
		title: "Kia New Carnival Hybrid ra mắt mẫu xe cao cấp được nhiều khách hàng quan tâm và lựa chọn",
		description: "Kia New Carnival Hybrid được đánh giá tích cực nhờ thiết kế hiện đại và trang bị an toàn vượt trội cùng công nghệ mới, hứa hẹn mở ra hướng phát triển mới cho các dòng xe cỡ lớn.",
		image: "/images/news/test2.png",
		date: "12/07/2025",
	},
	{
		title: "THACO AUTO nhận 3 giải thưởng quốc tế về chất lượng dịch vụ",
		description: "THACO AUTO vinh dự nhận 3 giải thưởng quốc tế về Tập đoàn Kia dành cho những ghi nhận về nỗ lực nâng cao chất lượng dịch vụ khách hàng.",
		image: "/images/news/test2.png",
		date: "10/07/2025",
	},
	{
		title: "Thời điểm vàng Kia ưu đãi đặc biệt nhân dịp lễ 30/4 và 01/05",
		description: "Kia ưu đãi hấp dẫn khi sở hữu mẫu K3, Seltos và Carnival dịp lễ lớn.",
		image: "/images/news/test2.png",
		date: "01/05/2025",
	},
	{
		title: "Kia ưu đãi đặc biệt nhân dịp lễ 30/4, 1/5",
		description: "Kia Việt Nam triển khai chương trình ưu đãi đặc biệt cho khách hàng dịp lễ 30/4, 1/5 trên toàn quốc.",
		image: "/images/news/test2.png",
		date: "28/04/2025",
	},
];

const rightAds = [
	{
		image: "/images/news/test2.png",
		title: "Kia Việt Nam đồng hành cùng Giải Golf Nhà Nghỉ Hội Viên...",
	},
	{
		image: "/images/news/test2.png",
		title: "KIA RA MẮT DÒNG HÀNH CÙNG CLB KIA SPORTAGE VIET NAM",
	},
	{
		image: "/images/news/test2.png",
		title: "ĐỔI ĐỜI SEDAN K-SERIES - ƯU ĐÃI ĐẶC BIỆT",
	},
	{
		image: "/images/news/test2.png",
		title: "ĐỔI ĐỜI SỐ LÊ MÊ THUỘC ĐA...",
	},
	{
		image: "/images/news/test2.png",
		title: "CÔNG NGHỆ DẪN ĐẦU CHO TƯƠNG LAI",
	},
];

export default function NewsPage() {
	return (
		<DefaultLayout>
			{/* Banner lớn */}
			<section className="relative bg-[#f5f7fa] py-8 border-b border-gray-200">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4">
					<div className="flex-1 flex flex-col justify-center">
						<h1 className="text-4xl md:text-5xl font-extrabold text-[#222] mb-4 leading-tight uppercase drop-shadow-lg">
							Vui hè sôi động, cùng Kia New Sonet
						</h1>
						<p className="text-lg md:text-2xl text-[#444] mb-4 font-medium">
							Giá sau ưu đãi chỉ từ{" "}
							<span className="text-[#17877b] font-bold text-2xl md:text-3xl">
								499
							</span>{" "}
							triệu đồng
						</p>
						<div className="flex gap-2 items-center">
							<Image
								src="/images/news/test2.png"
								alt="Kia New Sonet"
								width={120}
								height={60}
								className="rounded-xl bg-white"
							/>
							<span className="text-xs text-gray-500 ml-2">
								KIA 5 NĂM BẢO HÀNH
							</span>
						</div>
					</div>
					<div className="flex-1 flex items-center justify-center">
						<Image
							src="/images/news/test2.png"
							alt="Banner Kia"
							width={420}
							height={220}
							className="rounded-2xl shadow-lg object-contain bg-white"
						/>
					</div>
				</div>
			</section>

			{/* Main content */}
			<div className="bg-[#f0f2f5] min-h-screen">
				<section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
					{/* Bố cục 3 cột: Xem nhiều | Tin mới | Quảng cáo */}
					<div className="w-full flex flex-col lg:flex-row gap-8">
						{/* Cột 1: Xem nhiều */}
						<div className="w-full lg:w-1/2 flex flex-col gap-6">
							<h2 className="text-2xl font-bold text-[#17877b] mb-2 uppercase">
								Xem nhiều
							</h2>
							<div className="flex flex-col gap-4">
								{newsPopular.map((news, idx) => (
									<div
										key={idx}
										className="flex gap-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-3"
									>
										<div className="w-[110px] h-[80px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
											<Image
												src={news.image}
												alt={news.title}
												width={100}
												height={80}
												className="object-cover"
											/>
										</div>
										<div className="flex-1 flex flex-col justify-center">
											<p className="text-xs text-gray-500 mb-1">
												{news.date}
											</p>
											<h4 className="text-base font-semibold text-[#1d1d1f] mb-1 leading-tight">
												{news.title}
											</h4>
											<p className="text-sm text-[#6e6e73]">
												{news.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Cột 2: Tin mới */}
						<div className="w-full lg:w-1/2 flex flex-col gap-6">
							<h2 className="text-2xl font-bold text-[#17877b] mb-2 uppercase">
								Tin mới
							</h2>
							{/* Tin mới lớn */}
							<div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col">
								<div
									className="w-full"
									style={{ aspectRatio: "16/7", background: "#fff" }}
								>
									<Image
										src={newsLatest[0].image}
										alt={newsLatest[0].title}
										width={800}
										height={350}
										className="w-full h-full object-contain bg-white"
									/>
								</div>
								<div className="p-5 flex flex-col justify-end">
									<p className="text-sm text-gray-500 mb-1">
										{newsLatest[0].date}
									</p>
									<h3 className="text-xl font-bold text-[#1d1d1f] mb-2 leading-tight">
										{newsLatest[0].title}
									</h3>
									<p className="text-base text-[#6e6e73]">
										{newsLatest[0].description}
									</p>
								</div>
							</div>
							{/* Tin mới nhỏ */}
							<div className="flex flex-col gap-3">
								{newsLatest.slice(1).map((news, idx) => (
									<div
										key={idx}
										className="rounded-xl overflow-hidden shadow bg-white flex flex-row min-h-[90px]"
									>
										<div className="w-[90px] h-full flex items-center justify-center bg-gray-50">
											<Image
												src={news.image}
												alt={news.title}
												width={80}
												height={80}
												className="object-cover rounded-xl"
											/>
										</div>
										<div className="flex-1 p-3 flex flex-col justify-center">
											<p className="text-xs text-gray-500 mb-1">
												{news.date}
											</p>
											<h4 className="text-base font-semibold text-[#1d1d1f] mb-1 leading-tight">
												{news.title}
											</h4>
											<p className="text-sm text-[#6e6e73]">
												{news.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Cột 3: Quảng cáo */}
						<div className="hidden xl:flex flex-col gap-3 w-[260px] ml-4 mt-2">
							{rightAds.map((ad, idx) => (
								<div
									key={idx}
									className="rounded-xl overflow-hidden shadow bg-white flex flex-row min-h-[80px]"
								>
									<div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-50">
										<Image
											src={ad.image}
											alt={ad.title}
											width={70}
											height={70}
											className="object-cover rounded-xl"
										/>
									</div>
									<div className="flex-1 p-2 flex flex-col justify-center">
										<h5 className="text-xs font-semibold text-[#17877b] leading-tight line-clamp-2">
											{ad.title}
										</h5>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* Phân trang */}
				<div className="max-w-7xl mx-auto px-4 pb-12 flex justify-center">
					<nav className="inline-flex items-center gap-1 text-gray-500">
						<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200">
							&lt;
						</button>
						{[1, 2, 3, 4, 5].map((n) => (
							<button
								key={n}
								className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#17877b] hover:text-white font-semibold {n===1 ? 'bg-[#17877b] text-white' : ''}"
							>
								{n}
							</button>
						))}
						<span className="px-2">...</span>
						<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200">
							28
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200">
							&gt;
						</button>
					</nav>
				</div>
			</div>
		</DefaultLayout>
	);
}
