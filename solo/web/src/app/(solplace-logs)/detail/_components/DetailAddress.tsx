/** @format */
'use client';

import { IDetailAddressProps } from '@/types/detail.type';
import Icon from '@/components/Icon';
import KakaoMap from './KakaoMap';
import { useState } from 'react';

export default function DetailAddress({ address, lat, lng }: IDetailAddressProps) {
	const [isMap, setIsMap] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex w-full items-center gap-2 prose-sb_14_20">
				<Icon name="location" />
				<div className="text-[#777777]">{address}</div>
				<div
					className="flex items-center gap-1 cursor-pointer"
					onClick={() => setIsMap((prev) => !prev)}
				>
					<div className="text-[#333333]">지도 보기</div>
					<Icon name="down_arrow"></Icon>
				</div>
			</div>
			{isMap && <KakaoMap lat={lat} lng={lng} />}
		</div>
	);
}
