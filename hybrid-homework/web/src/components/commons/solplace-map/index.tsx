import useKakaoMapLoader from "@/commons/hooks/use-kakao-loader";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface ISolplaceMapProps {
  center: { lat: number; lng: number };
}

export default function SolplaceMap({ center }: ISolplaceMapProps) {
  const [loading, error] = useKakaoMapLoader();

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Map
      center={center} // 전달받은 위도와 경도 사용
      style={{ borderRadius: "0.75rem", width: "100%", height: "10rem" }}
    >
      <MapMarker
        position={center}
        image={{
          src: "/assets/marker.svg",
          size: { width: 28, height: 28 },
        }}
      />
    </Map>
  );
}
