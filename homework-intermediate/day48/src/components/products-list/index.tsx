'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	PenSquare,
	Search,
} from 'lucide-react';

import Image, { StaticImageData } from 'next/image';
import pohangRoom from '@/assets/pohang-room.png';
import gangneungRoom from '@/assets/gangneung-room.png';
import hostProfile from '@/assets/profile.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css'; // 스타일 추가
import 'swiper/css/navigation'; // Navigation 스타일
import 'swiper/css/autoplay'; // Autoplay 스타일

interface BannerItem {
	id: number;
	image: StaticImageData | string;
	title: string;
	subtitle: string;
	price: number;
}

const bannerItems: BannerItem[] = [
	{
		id: 1,
		image: pohangRoom,
		title: '포항: 당장 가고 싶은 숙소',
		subtitle:
			'살어리 살어리랏다 청산(青山)애 살어리랏다멀위랑 드래랑 먹고 청산(青...',
		price: 32900,
	},
	{
		id: 2,
		image: gangneungRoom,
		title: '강릉: 마음까지 깨끗해지는 하얀 숙소',
		subtitle: '살어리 살어리랏다 강릉애 평생 살어리랏다',
		price: 32900,
	},
];

const categories = [
	{ id: 1, icon: '🏠', label: '1인 전용' },
	{ id: 2, icon: '🏢', label: '아파트' },
	{ id: 3, icon: '🏨', label: '호텔' },
	{ id: 4, icon: '⛺', label: '캠핑' },
	{ id: 5, icon: '🔧', label: '툴 서비스 가능' },
	{ id: 6, icon: '🔥', label: '불멍' },
	{ id: 7, icon: '🏊‍♂️', label: '반신욕&스파' },
	{ id: 8, icon: '🌊', label: '바다 뷰 숙소' },
	{ id: 9, icon: '🏡', label: '풀빌라테라피' },
];

export default function ProductListPage() {
	// prevEl, nextEl을 위한 ref 생성
	const prevButtonRef = useRef(null);
	const nextButtonRef = useRef(null);
	const [dateRange, setDateRange] = useState('');

	return (
		<div className="mx-auto max-w-7xl px-4 py-8">
			{/* Hero Banner */}
			<div className="group relative mb-8">
				<Swiper
					modules={[Navigation, Autoplay]}
					spaceBetween={20}
					slidesPerView={1.2}
					loop={true}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					navigation={{
						prevEl: '.swiper-button-prev', // 클래스명으로 지정
						nextEl: '.swiper-button-next', // 클래스명으로 지정
					}}
					className="w-full"
				>
					{bannerItems.map((item) => (
						<SwiperSlide key={item.id}>
							<div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
								{/* Image with gradient overlay */}
								<div className="absolute inset-0">
									<Image
										src={item.image}
										alt={item.title}
										className="h-full w-full object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
								</div>

								{/* Photo count badge */}
								<div className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-sm text-white">
									<span>24</span>
								</div>

								{/* Content */}
								<div className="absolute bottom-0 left-0 p-6 text-white">
									<h3 className="mb-2 text-xl font-bold">{item.title}</h3>
									<p className="mb-3 text-sm text-white/80">{item.subtitle}</p>
									<p className="text-lg font-bold">
										{item.price.toLocaleString()}원
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Navigation Buttons */}
				<button className="swiper-button-prev">
					<ChevronLeft className="h-6 w-6" />
				</button>
				<button className="swiper-button-next">
					<ChevronRight className="h-6 w-6" />
				</button>
			</div>

			{/* Special Banner */}
			<div className="relative mb-8 h-32 overflow-hidden rounded-xl bg-[#f5f5f0]">
				<div className="absolute inset-0 flex items-center justify-between p-6">
					<div className="flex-1">
						<div className="text-xs text-gray-500">골드트립 특급 숙소</div>
						<div className="mt-2 text-lg font-bold">
							빌 페츠 로고 전시회 근처 숙소 특가 예약
						</div>
					</div>
					<div className="h-24 w-24 rounded-full bg-gray-200" />
				</div>
			</div>

			{/* Search Section */}
			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-bold">
					여기에서만 예약할 수 있는 숙소
				</h2>
				<div className="mb-4 flex gap-2">
					<div className="flex gap-2">
						<button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
							예약 가능 숙소
						</button>
						<button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
							예약 마감 숙소
						</button>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex flex-1 gap-2">
						<div className="relative flex-1">
							<div className="absolute left-3 top-1/2 -translate-y-1/2">
								<Calendar className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="YYYY.MM.DD - YYYY.MM.DD"
								className="w-full rounded-lg bg-gray-100 py-3 pl-10 pr-4"
								value={dateRange}
								onChange={(e) => setDateRange(e.target.value)}
							/>
						</div>
						<div className="relative flex-1">
							<div className="absolute left-3 top-1/2 -translate-y-1/2">
								<Search className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="제목을 검색해 주세요."
								className="w-full rounded-lg bg-gray-100 py-3 pl-10 pr-4"
								// value={searchKeyword}
								// onChange={(e) => setSearchKeyword(e.target.value)}
							/>
						</div>
					</div>
					<button className="rounded-lg bg-black px-6 py-3 font-medium text-white">
						검색
					</button>
					<button className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white">
						<PenSquare className="h-5 w-5" />
						숙박권 판매하기
					</button>
				</div>
			</div>

			{/* Category Icons */}
			<div className="mb-8 grid grid-cols-9 gap-4">
				{categories.map((category) => (
					<button
						key={category.id}
						className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
					>
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
							{category.icon}
						</div>
						<span className="text-xs text-gray-600">{category.label}</span>
					</button>
				))}
			</div>

			{/* Product Grid */}
			<div className="grid grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, idx) => (
					<div key={idx} className="group cursor-pointer">
						<div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
							<img
								src="https://placehold.co/296x296"
								alt="Room"
								className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							{/* Photo count badge */}
							<div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-sm text-white">
								<span>24</span>
							</div>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium leading-tight">
								살어리 살어리랏다 청산(青山)애 살어리랏다...
							</h3>
							<p className="text-sm leading-tight text-gray-500">
								살어리 살어리랏다 청산(青山)애 살어리랏다멀위랑...
							</p>
							<div className="flex gap-1">
								{['6인 이하', '#2식', '사우나', '#레전동물 가능'].map((tag) => (
									<span key={tag} className="text-xs text-blue-500">
										#{tag}
									</span>
								))}
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="h-6 w-6 overflow-hidden rounded-full">
										<Image
											src={hostProfile}
											alt="Host"
											className="h-full w-full object-cover"
										/>
									</div>
									<span className="text-sm text-gray-600">빈아트리</span>
								</div>
								<span className="font-bold">32,900원</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
