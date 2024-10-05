/** @format */

import { ETitle, ITitle } from '@/models/board.type';

import NewInput from './NewInput';

export default function NewAddressInputContainer({ title }: ITitle) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<div className="prose-me_16_24 text-gray-800">주소</div>
			<div className="flex gap-2">
				<div className="flex items-center justify-center rounded-lg border-[1px] border-gray-200 px-3 text-gray-400 outline-none">
					01234
				</div>
				<button className="prose-sb_18_24 rounded-lg border-[1px] border-black bg-white px-3 py-4">
					우편번호 검색
				</button>
			</div>
			<NewInput title={title} />
			<NewInput title={ETitle.DetailAddress} />
		</div>
	);
}
