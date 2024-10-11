/** @format */
'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export default function RootBanner() {
	return (
		<Carousel
			className="flex w-[70dvw] justify-center"
			plugins={[
				Autoplay({
					delay: 6000,
				}),
			]}
		>
			<CarouselContent>
				{[...Array(3)].map((_, index) => {
					return (
						<CarouselItem key={index} className="flex items-center justify-center">
							<Image
								src={`/Images/banner_${index}.png`}
								alt={`banner_${index}`}
								width={600}
								height={400}
								priority
								className="flex w-[60dvw]"
							/>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
