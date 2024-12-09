'use client';

import { useEffect } from 'react';

declare const window: any;

export default function KakaoMap({ lat, lng }: { lat: number; lng: number }) {
  useEffect(() => {
    // 카카오맵 스크립트 로드
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOJSKEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(lat, lng), // 지도 중심 좌표
          level: 3, // 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };

    // 스크립트 로드 완료 시 호출
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, [lat, lng]);

  return <div id="map" style={{ width: '100%', height: '160px' }}></div>;
}
