/** @format */

'use client';

import Icon from '@/components/Icon';

export default function AddressInput() {
	return (
		<div className="border-[1px] border-black flex items-center justify-between rounded-lg px-3 py-2">
			<div className=" prose-sb_14_20">플레이스 주소 입력</div>
			<Icon name="right_arrow" />
		</div>
	);
}
