"use client";

import { useEffect } from "react";

declare const window: Window & {
  kakao: any;
};

interface IKakaoMapProps {
  width: string;
  height: string;
  lat?: number;
  lng?: number;
}

export default function KakaoMap({ width, height, lat, lng }: IKakaoMapProps) {
  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      //!!! 지도 문제 많음. 주소 검색 후 지도가 그려졌을 때, 확대 축소하면 처음 생성된 지도가 보여짐. 매우 큰 문제 매우 거슬림.
      window.kakao.maps.load(function () {
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);

        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          center: markerPosition, //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        map.setCenter(markerPosition);
        marker.setMap(map);
      });
    };
  }, [lat, lng]);
  return <div id="map" style={{ width, height }}></div>;
}
