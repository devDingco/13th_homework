/** @format */
'use client';

import { IKakaoMapProps } from '@/types/detail.type';
import { useEffect } from 'react';

declare const window: typeof globalThis & {
	kakao: any;
};

export default function KakaoMap({ lat, lng }: IKakaoMapProps) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=dc12745fa93858bfeec28fd78ce89f07&autoload=false`;
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			if (typeof window.kakao !== 'undefined') {
				window.kakao.maps.load(() => {
					const container = document.getElementById('map');
					const options = {
						center: new window.kakao.maps.LatLng(lat, lng),
						level: 3,
					};
					const map = new window.kakao.maps.Map(container, options);

					const position = new window.kakao.maps.LatLng(lat, lng);

					const marker = new window.kakao.maps.Marker({
						position,
					});

					marker.setMap(map);
				});
			}
		};

		return () => {
			document.head.removeChild(script);
		};
	}, [lat, lng]);

	return <div id="map" style={{ width: '384px', height: '252px' }}></div>;
}
