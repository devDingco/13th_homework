import { FETCH_SOLPLACE_LOG } from "@/common/apis/graphql/queries/fetch-solplace-log.query";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MapView() {
  const params = useParams();
  const id = params.solplaceLogId;
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id },
  });

  const useKakaoLoader = () => {
    useKakaoLoaderOrigin({
      appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API as string,
      libraries: ["clusterer", "drawing", "services"],
    });
  };

  useKakaoLoader();

  return (
    <Map
      center={{
        lat: data?.fetchSolplaceLog?.lat,
        lng: data?.fetchSolplaceLog?.lng,
      }}
      className="h-160 rounded-lg"
    >
      <MapMarker
        position={{
          lat: data?.fetchSolplaceLog?.lat,
          lng: data?.fetchSolplaceLog?.lng,
        }}
      ></MapMarker>
    </Map>
  );
}

// 카카오 개발자에서 사이트 도메일 (ios 애뮬레이터,, 등 설정해놓기)
