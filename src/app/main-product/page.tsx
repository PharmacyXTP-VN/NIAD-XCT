"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { MapPinIcon, Cog6ToothIcon, BoltIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import LoadingBanner from "@/components/LoadingBanner";
import PageBanner from "@/components/PageBanner";

export default function MainProductsPage() {
	const [allProducts, setAllProducts] = useState<any[]>([]);
	const [products, setProducts] = useState<any[]>([]);
	const [brands, setBrands] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [activeBrand, setActiveBrand] = useState<string>("");
	const [activeCategory, setActiveCategory] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [limit] = useState<number>(10);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [initialized, setInitialized] = useState(false);

	// Lấy toàn bộ sản phẩm để tạo filter
	useEffect(() => {
		fetch('/api/car')
			.then(res => res.json())
			.then(data => {
				setAllProducts(data.data || []);
			});
	}, []);


	// Khi allProducts có data, set filter mặc định 1 lần duy nhất
	useEffect(() => {
		if (allProducts.length > 0 && brands.length === 0) {
			const uniqueBrands = [...new Set(allProducts.map((p: any) => (p.manufacturer?.toUpperCase() as string)))];
			setBrands(uniqueBrands as string[]);
			setActiveBrand((uniqueBrands[0] as string) || "");
		}
	}, [allProducts, brands.length]);

	useEffect(() => {
		if (allProducts.length > 0 && activeBrand) {
			const filtered = allProducts.filter((p: any) => p.manufacturer?.toUpperCase() === activeBrand);
			const uniqueCategories = [...new Set(filtered.map((p: any) => p.model as string))];
			setCategories(uniqueCategories as string[]);
			// Chỉ setActiveCategory nếu chưa khởi tạo lần đầu
			if (!initialized) {
				setActiveCategory((uniqueCategories[0] as string) || "");
				setInitialized(true);
			}
		}
	}, [allProducts, activeBrand, initialized]);

	// Chỉ gọi API khi đã có brand và category hợp lệ
	useEffect(() => {
		if (!activeBrand || !activeCategory || !initialized) return;
		const params: any = {
			manufacturer: activeBrand,
			model: activeCategory,
			page,
			limit,
		};
		setLoading(true);
		fetch(`/api/car?${new URLSearchParams(params)}`)
			.then(res => res.json())
			.then(data => {
				setProducts(data.data || []);
				setTotalPages(data.totalPages || 1);
				setTotal(data.total || 0);
				setLoading(false);
			});
	}, [activeBrand, activeCategory, page, limit, initialized]);

	// Khi filter đổi thì reset về page 1
	useEffect(() => {
		setPage(1);
	}, [activeBrand, activeCategory, limit]);

	if (loading || brands.length === 0) {
		return <LoadingBanner />;
	}

	return (
		<DefaultLayout>
			<div className="min-h-screen bg-[#f0f2f5] pb-12">
				<PageBanner
					pageName="main-product"
					title="Danh sách sản phẩm"
					subtitle="Các dòng xe chuyên dụng vận chuyển tiền, chống đạn, ..."
				/>
				<section className="max-w-7xl mx-auto px-4 py-16">
				<div className="flex flex-wrap gap-4 justify-center mb-6">
							{brands.map((brand) => (
								<button
									key={brand}
									className={`px-5 py-2 rounded-full font-semibold border-2 transition ${activeBrand === brand ? "bg-[#006b68] text-white border-[#006b68]" : "bg-white text-[#006b68] border-[#006b68]"}`}
									onClick={() => {
										setActiveBrand(brand);
										// Lấy model đầu tiên của brand này và set luôn
										const filtered = allProducts.filter((p: any) => p.manufacturer?.toUpperCase() === brand);
										const uniqueCategories = [...new Set(filtered.map((p: any) => p.model as string))];
										setCategories(uniqueCategories as string[]);
										setActiveCategory((uniqueCategories[0] as string) || "");
									}}
								>
									{brand}
								</button>
							))}
						</div>
						<div className="flex flex-wrap gap-4 justify-center mb-6">
							{categories.map((cat) => (
								<button
									key={cat}
									className={`px-5 py-2 rounded-full font-semibold border-2 transition ${activeCategory === cat ? "bg-[#006b68] text-white border-[#006b68]" : "bg-white text-[#006b68] border-[#006b68]"}`}
									onClick={() => setActiveCategory(cat)}
								>
									{cat}
								</button>
							))}
						</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{loading ? (
							<div className="col-span-full text-center py-10">
								<p>Đang tải sản phẩm...</p>
							</div>
						) : products.length === 0 ? (
							<div className="col-span-full text-center py-10">
								<p>Không tìm thấy sản phẩm phù hợp.</p>
							</div>
						) : (
							products.map((product) => (
								<div
									key={product._id}
									className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center p-8 gap-8 group hover:shadow-3xl transition-shadow duration-300"
								>
									<div className="w-full md:w-2/5 flex items-center justify-center bg-[#f0f2f5] rounded-2xl h-[180px] md:h-[220px]">
										<Image
											src={product.images?.main || product.image}
											alt={product.model}
											width={320}
											height={180}
											className="object-contain rounded-xl shadow w-auto h-full max-w-full max-h-full"
											style={{ objectFit: 'contain', background: '#f0f2f5' }}
											sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 320px"
										/>
									</div>
									<div className="w-full md:w-3/5 flex flex-col justify-center h-full">
										<h2 className="text-2xl font-bold text-[#006b68] mb-3 text-left uppercase tracking-tight">
											{product.name}
										</h2>
										<ul className="mb-4 space-y-2">
											<li className="flex items-center gap-2 text-[#1d1d1f] text-base">
												<Cog6ToothIcon className="w-5 h-5 text-[#006b68] inline" />
												<span>Hộp số: {product.transmission}</span>
											</li>
											<li className="flex items-center gap-2 text-[#1d1d1f] text-base">
												<BoltIcon className="w-5 h-5 text-[#006b68] inline" />
												<span>Nhiên liệu: {product.fuelType}</span>
											</li>
											<li className="flex items-center gap-2 text-[#1d1d1f] text-base">
												<MapPinIcon className="w-5 h-5 text-[#006b68] inline" />
												<span>Số chỗ: {product.seats}</span>
											</li>
											{/* Hiển thị highlights nếu có */}
											{Array.isArray(product.highlights) && product.highlights.length > 0 && product.highlights.map((h: any, idx: number) => (
												<li key={idx} className="flex items-center gap-2 text-[#1d1d1f] text-base">
													<span><b>{h.name}:</b> {h.value}</span>
												</li>
											))}
											{/* Hiển thị specifications nếu có */}
											{Array.isArray(product.specifications) && product.specifications.length > 0 && product.specifications.map((s: any, idx: number) => (
												<li key={idx} className="flex items-center gap-2 text-[#1d1d1f] text-base">
													<span><b>{s.name}:</b> {s.value}</span>
												</li>
											))}
										</ul>
										<div className="mt-auto space-y-1">
											<div className="text-xs text-red-600 font-semibold">Giá bán: {product.price?.toLocaleString()}₫</div>
											<div className="text-xs text-gray-600 font-medium">{product.description}</div>
											<button
												className="mt-3 px-6 py-2 bg-[#006b68] text-white rounded-md hover:bg-[#006c67] transition font-semibold shadow"
												onClick={() => window.location.href = `/product-detail/${product._id || product.id}`}
											>
												Chi tiết sản phẩm
											</button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
					{/* Pagination controls */}
					{total > 0 && totalPages > 0 && (
						<div className="flex justify-center items-center gap-2 mt-12">
							<button
								disabled={page === 1}
								onClick={() => setPage(page - 1)}
								className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
									${page === 1 ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white'}`}
							>
								&#8592;
							</button>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i + 1}
									onClick={() => setPage(i + 1)}
									className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
										${page === i + 1 ? 'bg-[#03bb65] border-[#03bb65] text-white' : 'bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white'}`}
								>
									{i + 1}
								</button>
							))}
							<button
								disabled={page === totalPages}
								onClick={() => setPage(page + 1)}
								className={`w-9 h-9 flex items-center justify-center rounded-full border-2 font-bold shadow transition-colors duration-200
									${page === totalPages ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-[#03bb65] text-[#03bb65] hover:bg-[#03bb65] hover:text-white'}`}
							>
								&#8594;
							</button>
						</div>
					)}
					<div className="text-center text-xs text-gray-500 mt-2">Tổng số xe: {typeof total === 'number' ? total : 0}</div>
				</section>
			</div>
		</DefaultLayout>
	);
}