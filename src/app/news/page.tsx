"use client";

import DefaultLayout from "@/layout/DefaultLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsPage() {
	const [newsList, setNewsList] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [limit] = useState(5);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/news/list?page=${page}&limit=${limit}`)
			.then((res) => res.json())
			.then((data) => {
				setNewsList(Array.isArray(data.data) ? data.data : []);
				setTotalPages(data.totalPages || 1);
				setLoading(false);
			});
	}, [page, limit]);

	const newsLatest = newsList.length > 0 ? [newsList[0]] : [];
	const newsPopular = newsList.length > 1 ? newsList.slice(1, 5) : [];

	const uuDaiNews = newsList.filter(news => Array.isArray(news.tags) && news.tags.includes("ưu đãi"));
	const bannerNews = uuDaiNews.length > 0 ? uuDaiNews[0] : newsList[0];

	return (
		<DefaultLayout>
			{/* Banner lớn */}
			<section className="relative bg-[#f5f7fa] py-8 border-b border-gray-200">
				{/* Lớp phủ màu xanh */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#17877b]/80 to-[#7ee8c7]/80 opacity-80 pointer-events-none z-0" />
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 relative z-10">
					<div className="flex-1 flex flex-col justify-center">
						{bannerNews ? (
							<>
								<Link href={`/news/${bannerNews._id}`}>
									<h1 className="text-4xl md:text-5xl font-extrabold text-[#222] mb-4 leading-tight uppercase drop-shadow-lg cursor-pointer hover:text-[#17877b]">
										{bannerNews.title}
									</h1>
								</Link>
								<p className="text-lg md:text-2xl text-[#444] mb-4 font-medium">
									{bannerNews.summary}
								</p>
								<div className="flex gap-2 items-center">
									<span className="text-xs text-gray-500 ml-2">
										{bannerNews.publishedAt ? new Date(bannerNews.publishedAt).toLocaleDateString() : ""}
									</span>
								</div>
							</>
						) : (
							<h1 className="text-4xl md:text-5xl font-extrabold text-[#222] mb-4 leading-tight uppercase drop-shadow-lg">
								Tin tức nổi bật
							</h1>
						)}
					</div>
					<div className="flex-1 flex items-center justify-center">
						{bannerNews && bannerNews.thumbnail ? (
							<Link href={`/news/${bannerNews._id}`}>
								<Image
									src={bannerNews.thumbnail}
									alt={bannerNews.title}
									width={420}
									height={220}
									className="rounded-2xl shadow-lg object-contain bg-white cursor-pointer hover:opacity-90"
								/>
							</Link>
						) : (
							<Image
								src="/images/news/test2.png"
								alt="Banner Kia"
								width={420}
								height={220}
								className="rounded-2xl shadow-lg object-contain bg-white"
							/>
						)}
					</div>
				</div>
			</section>

			{/* Main content */}
			<div className="bg-[#f0f2f5] min-h-screen">
				<section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
					{/* Bố cục 2 cột: Xem nhiều | Tin mới */}
					<div className="w-full flex flex-col lg:flex-row gap-8">
						{/* Cột 1: Xem nhiều */}
						<div className="w-full lg:w-1/2 flex flex-col gap-6">
							<h2 className="text-2xl font-bold text-[#17877b] mb-2 uppercase">Xem nhiều</h2>
							<div className="flex flex-col gap-4">
								{loading ? (
									<div>Đang tải tin tức...</div>
								) : newsPopular.length === 0 ? (
									<div>Không có tin tức.</div>
								) : (
									newsPopular.map((news, idx) => (
										<Link href={`/news/${news._id}`} key={news._id || idx} className="flex gap-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-3 cursor-pointer">
											<div className="w-[110px] h-[80px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
												<Image
													src={news.thumbnail}
													alt={news.title}
													width={100}
													height={80}
													className="object-cover"
												/>
											</div>
											<div className="flex-1 flex flex-col justify-center">
												<p className="text-xs text-gray-500 mb-1">
													{news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ""}
												</p>
												<h4 className="text-base font-semibold text-[#1d1d1f] mb-1 leading-tight">
													{news.title}
												</h4>
												<p className="text-sm text-[#6e6e73]">
													{news.summary}
												</p>
											</div>
										</Link>
									))
								)}
							</div>
						</div>
						{/* Cột 2: Tin mới */}
						<div className="w-full lg:w-1/2 flex flex-col gap-6">
							<h2 className="text-2xl font-bold text-[#17877b] mb-2 uppercase">Tin mới</h2>
							{/* Tin mới lớn */}
							{loading ? (
								<div>Đang tải tin tức...</div>
							) : newsLatest.length === 0 ? (
								<div>Không có tin tức.</div>
							) : (
								<Link href={`/news/${newsLatest[0]._id}`} className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col cursor-pointer hover:shadow-2xl">
									<div className="w-full" style={{ aspectRatio: "16/7", background: "#fff" }}>
										<Image
											src={newsLatest[0].thumbnail}
											alt={newsLatest[0].title}
											width={800}
											height={350}
											className="w-full h-full object-contain bg-white"
										/>
									</div>
									<div className="p-5 flex flex-col justify-end">
										<p className="text-sm text-gray-500 mb-1">
											{newsLatest[0].publishedAt ? new Date(newsLatest[0].publishedAt).toLocaleDateString() : ""}
										</p>
										<h3 className="text-xl font-bold text-[#1d1d1f] mb-2 leading-tight">
											{newsLatest[0].title}
										</h3>
										<p className="text-base text-[#6e6e73]">
											{newsLatest[0].summary}
										</p>
									</div>
								</Link>
							)}
							{/* Tin mới nhỏ */}
							<div className="flex flex-col gap-3">
								{newsList.slice(1, 4).map((news, idx) => (
									<Link href={`/news/${news._id}`} key={news._id || idx} className="rounded-xl overflow-hidden shadow bg-white flex flex-row min-h-[90px] cursor-pointer hover:shadow-lg">
										<div className="w-[90px] h-full flex items-center justify-center bg-gray-50">
											<Image
												src={news.thumbnail}
												alt={news.title}
												width={80}
												height={80}
												className="object-cover rounded-xl"
											/>
										</div>
										<div className="flex-1 p-3 flex flex-col justify-center">
											<p className="text-xs text-gray-500 mb-1">
												{news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ""}
											</p>
											<h4 className="text-base font-semibold text-[#1d1d1f] mb-1 leading-tight">
												{news.title}
											</h4>
											<p className="text-sm text-[#6e6e73]">
												{news.summary}
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</section>
				{/* Phân trang */}
				{totalPages >= 1 && (
					<div className="max-w-7xl mx-auto px-4 pb-12 flex justify-center">
						<nav className="inline-flex items-center gap-1 text-gray-500">
							<button
								className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
								onClick={() => setPage(page - 1)}
								disabled={page === 1}
							>
								&lt;
							</button>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i + 1}
									onClick={() => setPage(i + 1)}
									className={`w-8 h-8 flex items-center justify-center rounded hover:bg-[#17877b] hover:text-white font-semibold ${page === i + 1 ? 'bg-[#17877b] text-white' : 'bg-white text-[#17877b]'}`}
								>
									{i + 1}
								</button>
							))}
							<button
								className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
								onClick={() => setPage(page + 1)}
								disabled={page === totalPages}
							>
								&gt;
							</button>
						</nav>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
}
