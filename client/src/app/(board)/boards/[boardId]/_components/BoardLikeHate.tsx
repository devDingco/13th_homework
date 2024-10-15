/** @format */
// NOTE 추후 증감 관련 api 호출이 되면 컴포넌트화할 예정
// [ ] 시발 Suspense / hoc / component composite / promise / use / custom hook.. 시발 제발

import Image from 'next/image';

export default function BoardLikeHate({ boardInfor }) {
	return (
		<div className="flex items-center justify-center gap-6">
			<div className="flex cursor-pointer flex-col items-center gap-1">
				<Image src="/Images/hate.svg" alt="hate" width={24} height={24} />
				<div className="prose-r_14_20 text-gray-700">{boardInfor.hate}</div>
			</div>
			<div className="flex cursor-pointer flex-col items-center gap-1">
				<Image src="/Images/like.svg" alt="like" width={24} height={24} />
				<div className="prose-r_14_20 text-[#F66A6A]">{boardInfor.like}</div>
			</div>
		</div>
	);
}
