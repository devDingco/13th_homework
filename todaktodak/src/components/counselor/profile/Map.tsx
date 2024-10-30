import { useEffect } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export default function Map({ latitude, longitude, address }: MapProps) {
  useEffect(() => {
    // 카카오맵 또는 네이버맵 API 초기화
    // 마커 추가
  }, [latitude, longitude]);

  return (
    <div className="rounded-lg overflow-hidden">
      <div id="map" className="w-full h-64"></div>
      <div className="p-4 bg-gray-50">
        <div className="text-sm font-medium">주소</div>
        <div className="text-gray-600 mt-1">{address}</div>
      </div>
    </div>
  );
}
