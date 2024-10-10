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

export default function BoardCarousel() {
	return (
		<div className="mx-auto">
			<Carousel
				className="flex w-full justify-center"
				plugins={[
					Autoplay({
						delay: 6000,
					}),
				]}
			>
				<CarouselContent>
					{[...Array(3)].map((_, index) => {
						return (
							<CarouselItem key={index}>
								<Image
									src={`/Images/banner_${index}.png`}
									alt={`banner_${index}`}
									width={800}
									height={400}
									priority
								/>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
