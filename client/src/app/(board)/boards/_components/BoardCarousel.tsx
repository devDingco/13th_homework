/** @format */

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import Image from 'next/image';

export default function BoardCarousel() {
	return (
		<Carousel>
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
		</Carousel>
	);
}
