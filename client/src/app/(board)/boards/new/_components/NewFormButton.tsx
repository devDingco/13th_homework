/** @format */
'use client';

import { IButtonDisabled } from '@/models/formButton';

// import onFormBoard from '@/utils/onFormBoard';

export default function NewFormButton({ isButtonDisabled }: IButtonDisabled) {
	return (
		<div className="w-full flex justify-end items-center gap-4">
			<button className="h-12 rounded-lg border-[1px] border-black px-3 py-4 flex justify-center items-center cursor-pointer prose-sb_18_24">
				취소
			</button>
			<button
				className={`h-12 rounded-lg px-3 py-4 flex justify-center items-center prose-sb_18_24 text-gray-100 ${
					isButtonDisabled ? 'bg-gray-300' : 'bg-[#2974E5]'
				}`}
				disabled={isButtonDisabled}
			>
				등록 하기
			</button>
		</div>
	);
}
