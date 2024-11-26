/** @format */

'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

export default function ImageContainer() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState([]);

	// const onChangeImage = (e) => {
	// 	window.ReactNativeWebView?.postMessage(e.target);
	// };

	return (
		<div className="flex gap-4 items-center overflow-x-scroll scrollbar-hide">
			{new Array(4).fill(null).map((_, index) => (
				<div
					key={index}
					className="shrink-0 size-[100px] bg-gray-100 rounded-lg flex justify-center items-center flex-col gap-2 cursor-pointer"
					onClick={() => inputRef.current?.click()}
				>
					<Image
						src={'/Images/add.png'}
						alt="plus"
						width={24}
						height={24}
						className="size-6"
					/>
					<p className="prose-r_12_20 text-[#777777]">사진 등록</p>
					<input
						type="file"
						className="hidden"
						ref={inputRef}
						onChange={(event) => {
							console.log(event.target);
						}}
					/>
				</div>
			))}
		</div>
	);
}
