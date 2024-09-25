/** @format */

import { IBoardProps } from '@/models/apiResponse';
import Image from 'next/image';

export default function BoardImages({ infor }: IBoardProps) {
	return (
		<div className="w-full flex gap-2">
			{infor?.imageUrl?.map((img, idx) => (
				<Image
					src={`${img}`}
					alt="image"
					className="flex-1"
					key={idx}
					width={200}
					height={100}
				/>
			))}
		</div>
	);
}
