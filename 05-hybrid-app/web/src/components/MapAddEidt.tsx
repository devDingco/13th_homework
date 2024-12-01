import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useMap from "@/common/hooks/useMap";

export default function MapAddEdit({ isEdit }) {
  const { useKakaoLoader, center, handleCenterChanged, address } = useMap({
    isEdit,
  });
  useKakaoLoader();

  return (
    <>
      <Map
        center={center}
        level={2}
        className="h-[calc(100vh-176px)] w-full" //h-full하면 지도 안보여서 전체 스크린 높이에서 아래 푸터 길이 빼주기
        onCenterChanged={handleCenterChanged} // 중심 좌표가 변경될 때
      >
        <MapMarker
          position={center} // 마커의 위치를 중심 좌표로 설정
          image={{
            src: "/images/icons/mapMarkup.svg",
            size: { width: 23, height: 32 }, // 마커 이미지 크기
          }}
        />
        <CustomOverlayMap position={center} yAnchor={2.5}>
          <div className="w-77 h-24 px-2 py-1 bg-black/50 rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-white text-[11px] font-semibold font-['SUIT Variable'] leading-3">
              플레이스 위치{address}
            </div>
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}
