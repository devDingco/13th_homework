/** @format */
'use client';

import { EButtonKorea, IButtonProps } from '@/models/button.type';

export default function CommonButton({ title, isButtonDisabled }: IButtonProps) {
	return (
		<button className="h-12 rounded-lg border-[1px] border-black px-3 py-4 flex justify-center items-center cursor-pointer prose-sb_18_24">
			{EButtonKorea[title]}
		</button>
	);
}
