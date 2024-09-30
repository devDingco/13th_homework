/** @format */
'use client';

import { IButtonDisabled } from '@/models/formButton';

export default function NewFormButton({ isButtonDisabled }: IButtonDisabled) {
	return (
		<div className="flex w-full items-center justify-end gap-4">
			<button className="prose-sb_18_24 flex h-12 cursor-pointer items-center justify-center rounded-lg border-[1px] border-black px-3 py-4">
				취소
			</button>
			<button
				className={`prose-sb_18_24 flex h-12 items-center justify-center rounded-lg px-3 py-4 text-gray-100 ${
					isButtonDisabled ? 'bg-gray-300' : 'bg-[#2974E5]'
				}`}
				disabled={isButtonDisabled}
			>
				등록 하기
			</button>
		</div>
	);
}
