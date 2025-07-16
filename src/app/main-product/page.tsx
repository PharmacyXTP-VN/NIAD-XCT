"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { MapPinIcon, Cog6ToothIcon, BoltIcon } from "@heroicons/react/24/outline";

const products = [
	{
		id: 1,
		name: "Xe chở tiền ISUZU D-MAX",
		image: "/images/cars/test2-removebg-preview.png",
		features: [
			{ icon: <Cog6ToothIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Tiêu chuẩn khí thải: Euro 5" },
			{ icon: <BoltIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Hộp số: 6 số sàn" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Dung tích xi lanh: 2477" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Khoảng sáng gầm xe: 200" },
		],
		price: "Giá bán: chỉ từ 8xx triệu đồng / xe",
		rental: "Cho thuê: Chỉ từ xx triệu đồng / tháng / xe",
	},
	{
		id: 2,
		name: "Xe chở tiền Mitsubishi Pajero Sport 4x2 AT (Cầu số tự động)",
		image: "/images/cars/test2.png",
		features: [
			{ icon: <Cog6ToothIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Tiêu chuẩn khí thải: Euro 5" },
			{ icon: <BoltIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Hộp số: 8 số tự động" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Dung tích xi lanh: 2998" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Khoảng sáng gầm xe: 218" },
		],
		price: "Giá bán: chỉ từ 1.xx tỷ đồng / xe",
		rental: "Cho thuê: Chỉ từ xx triệu đồng / tháng / xe",
	},
	{
		id: 3,
		name: "Xe ô tô chở tiền Toyota Fortuner 2.7 4x2 AT (Cầu số tự động)",
		image: "/images/cars/test3.png",
		features: [
			{ icon: <Cog6ToothIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Tiêu chuẩn khí thải: Euro 5" },
			{ icon: <BoltIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Hộp số: Tự động 6 cấp - GAT" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Dung tích xi lanh: 2694" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Khoảng sáng gầm xe: 279" },
		],
		price: "Giá bán: chỉ từ 1.xx tỷ đồng / xe",
		rental: "Cho thuê: Chỉ từ xx triệu đồng / tháng / xe",
	},
	{
		id: 4,
		name: "Mitsubishi Triton 4x2 MT (Cầu số sàn)",
		image: "/images/cars/test2-removebg-preview.png",
		features: [
			{ icon: <Cog6ToothIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Tiêu chuẩn khí thải: Euro 5" },
			{ icon: <BoltIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Hộp số: 6 số sàn" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Dung tích xi lanh: 2477" },
			{ icon: <MapPinIcon className="w-5 h-5 text-[#b8001c] inline" />, text: "Khoảng sáng gầm xe: 200" },
		],
		price: "Giá bán: chỉ từ 7xx triệu đồng / xe",
		rental: "Cho thuê: Chỉ từ xx triệu đồng / tháng / xe",
	},
];

export default function MainProductsPage() {
	return (
		<DefaultLayout>
			<div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#2d2d2d] to-[#f8f8f8] pb-12">
				<section className="relative bg-gradient-to-r from-[#17877b] to-[#7ee8c7] text-white py-20 overflow-hidden mb-0">
					<div className="absolute inset-0 opacity-20 bg-[url('/images/cars/test2-removebg-preview.png')] bg-no-repeat bg-right bg-contain pointer-events-none" />
					<div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
						<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg uppercase">
							Xe chở tiền của NIAD
						</h1>
						<p className="text-2xl md:text-3xl text-[#e6f9f0] max-w-2xl mx-auto font-medium">
							Đa dạng lựa chọn, đáp ứng mọi nhu cầu vận chuyển an toàn, chuyên nghiệp cho ngân hàng và doanh nghiệp.
						</p>
					</div>
				</section>
				<div className="min-h-screen bg-[#f0f2f5]">
					{/* Products Grid */}
					<section className="max-w-7xl mx-auto px-4 py-16">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
							{products.map((product) => (
								<div
									key={product.id}
									className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center p-8 gap-8 group hover:shadow-3xl transition-shadow duration-300"
								>
									<div className="w-full md:w-2/5 flex items-center justify-center bg-[#f0f2f5] rounded-2xl h-[180px] md:h-[220px]">
										<Image
											src={product.image}
											alt={product.name}
											width={320}
											height={180}
											className="object-contain rounded-xl shadow w-auto h-full max-w-full max-h-full"
											style={{ objectFit: 'contain', background: '#f0f2f5' }}
											sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 320px"
										/>
									</div>
									<div className="w-full md:w-3/5 flex flex-col justify-center h-full">
										<h2 className="text-2xl font-bold text-[#03bb65] mb-3 text-left uppercase tracking-tight">
											{product.name}
										</h2>
										<ul className="mb-4 space-y-2">
											{product.features.map((f, idx) => (
												<li key={idx} className="flex items-center gap-2 text-[#1d1d1f] text-base">
													{f.icon}
													<span>{f.text}</span>
												</li>
											))}
										</ul>
										<div className="mt-auto space-y-1">
											<div className="text-xs text-red-600 font-semibold">{product.price}</div>
											<div className="text-xs text-red-600 font-semibold">{product.rental}</div>
											<button
												className="mt-3 px-6 py-2 bg-[#03bb65] text-white rounded-md hover:bg-[#006c67] transition font-semibold shadow"
												onClick={() => window.location.href = "/product-detail"}
											>
												Chi tiết sản phẩm
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
						{/* Pagination */}
						<div className="flex justify-center items-center gap-2 mt-12">
							<button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-[#03bb65] text-[#03bb65] font-bold shadow hover:bg-[#03bb65] hover:text-white transition-colors duration-200">
								1
							</button>
							<button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-gray-500 font-bold shadow hover:bg-gray-100 transition-colors duration-200">
								2
							</button>
							<button className="px-4 h-9 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-100 transition-colors duration-200">
								Trang sau
							</button>
							<button className="px-4 h-9 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-100 transition-colors duration-200">
								End
							</button>
						</div>
						<div className="text-center text-xs text-gray-500 mt-2">Page 1 of 2</div>
					</section>
				</div>
			</div>
		</DefaultLayout>
	);
}