import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MapView() {
  const useKakaoLoader = () => {
    useKakaoLoaderOrigin({
      appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API as string,
      libraries: ["clusterer", "drawing", "services"],
    });
  };

  useKakaoLoader();

  return (
    <Map center={{ lat: 37.5666, lng: 126.979 }} className="h-160 rounded-lg">
      <MapMarker position={{ lat: 37.5666, lng: 126.979 }}></MapMarker>
    </Map>
  );
}

// 카카오 개발자에서 사이트 도메일 (ios 애뮬레이터,, 등 설정해놓기)
