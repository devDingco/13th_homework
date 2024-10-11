/** @format */
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function BoardIcon({ address }) {
	const [hoveredItem, setHoveredItem] = useState(false);

	return (
		<div className="flex w-full items-center justify-end gap-2">
			<div
				className={`transition-opacity duration-300 ${hoveredItem ? 'opacity-100' : 'opacity-0'}`}
			>
				{address}
			</div>
			<Image src="/Images/link.svg" alt="link" width={24} height={24} />
			<Image
				src="/Images/location.svg"
				alt="location"
				width={24}
				height={24}
				onMouseEnter={() => setHoveredItem(true)}
				onMouseLeave={() => setHoveredItem(false)}
				className="cursor-pointer"
			/>
		</div>
	);
}
