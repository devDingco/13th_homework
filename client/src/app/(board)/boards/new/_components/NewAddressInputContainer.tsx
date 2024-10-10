/** @format */

import { ETitle, ITitle } from '@/models/board.type';
import { boardsUrlEndPoint, newUrlEndPoint } from '@/apis/config';

import NewInput from './NewInput';
import { useAddressStore } from '@/stores/useAddressStore';
import useOnClickPush from '@/hooks/useOnClickPush';

export default function NewAddressInputContainer({ title }: ITitle) {
	const onClickPush = useOnClickPush();
	// 타입 에러는 천천히.. 구현부터
	const { zonecode } = useAddressStore();

	return (
		<div className="flex flex-1 flex-col gap-2">
			<div className="prose-me_16_24 text-gray-800">주소</div>
			<div className="flex gap-2">
				<div className="flex items-center justify-center rounded-lg border-[1px] border-gray-200 px-3 text-gray-400 outline-none">
					{zonecode ? zonecode : '우편번호'}
				</div>

				<div
					className="prose-sb_18_24 cursor-pointer rounded-lg border-[1px] border-black bg-white px-3 py-4"
					onClick={(event) =>
						onClickPush(`${boardsUrlEndPoint}${newUrlEndPoint}/?address=true`, event)
					}
				>
					우편번호 검색
				</div>
			</div>
			<NewInput title={title} />
			<NewInput title={ETitle.DetailAddress} />
		</div>
	);
}
