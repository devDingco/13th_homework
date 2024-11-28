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
