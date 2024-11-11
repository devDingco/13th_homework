'use client';

import Images from 'next/image';
import banner1 from '@/assets/banner1.png';
import banner2 from '@/assets/banner2.png';
import banner3 from '@/assets/banner3.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export default function BoardBanner() {
	return (
		<Swiper
			className="h-96 w-full max-w-7xl"
			spaceBetween={50}
			slidesPerView={1}
			loop={true}
			autoplay={{
				delay: 4000,
				pauseOnMouseEnter: false,
				disableOnInteraction: false,
			}}
			modules={[Autoplay]}
		>
			<SwiperSlide>
				<Images
					src={banner1}
					alt="보드배너이미지1"
					className="h-full w-full object-cover"
					sizes="100vw"
				/>
			</SwiperSlide>
			<SwiperSlide>
				<Images
					src={banner2}
					alt="보드배너이미지2"
					className="h-full w-full object-cover"
					sizes="100vw"
				/>
			</SwiperSlide>
			<SwiperSlide>
				<Images
					src={banner3}
					alt="보드배너이미지3"
					className="h-full w-full object-cover"
					sizes="100vw"
				/>
			</SwiperSlide>
		</Swiper>
	);
}
