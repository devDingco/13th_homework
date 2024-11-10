import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

export default function KakaoMap({ lat, lng }) {
  const [_, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY!, // 발급 받은 APPKEY
  });

  if (error) return <div>Error</div>;

  // 지도 마커 커스텀
  const markerSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ce5f5f" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
  `;
  const markerImageUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    markerSvg
  )}`;

  return (
    <Map
      center={{ lat, lng }} // 전달받은 위도와 경도 사용
      style={{ borderRadius: "16px", width: "100%", height: "360px" }}
    >
      <MapMarker
        position={{ lat, lng }}
        image={{ src: markerImageUrl, size: { width: 36, height: 36 } }}
      />{" "}
      {/* 마커 위치 */}
    </Map>
  );
}
