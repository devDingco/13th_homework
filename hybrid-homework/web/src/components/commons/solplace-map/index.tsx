import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

export default function SolplaceMap({ lat, lng }) {
  const [_, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY!, // 발급 받은 APPKEY
  });

  if (error) return <div>Error</div>;

  return (
    <Map
      center={{ lat, lng }} // 전달받은 위도와 경도 사용
      style={{ borderRadius: "0.75rem", width: "100%", height: "160px" }}
    >
      <MapMarker position={{ lat, lng }} />
    </Map>
  );
}
