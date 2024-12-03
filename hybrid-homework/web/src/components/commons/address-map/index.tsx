"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Map } from "react-kakao-maps-sdk";
import useKakaoMapLoader from "@/commons/hooks/use-kakao-loader";

interface ISolplaceMapProps {
  initialCenter: { lat: number; lng: number };
}

export default function AddressMap({ initialCenter }: ISolplaceMapProps) {
  // 쿼리스트링 값 추출
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const contents = searchParams.get("contents");
  const redirectUrl = searchParams.get("redirectUrl");

  const [loading, error] = useKakaoMapLoader();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  if (!window.kakao || !kakao.maps.services) return;

  const geocoder = new kakao.maps.services.Geocoder();

  // 지도 이동 후 중심 좌표 업데이트
  const handleMapMove = (map: kakao.maps.Map) => {
    const center = map.getCenter();

    // 좌표를 주소로 변환
    geocoder.coord2Address(
      center.getLng(),
      center.getLat(),
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0]?.address?.address_name;
          // 변환된 주소를 쿼리스트링으로 넣어주기
          window.history.pushState(
            null,
            "",
            `?name=${name}&contents=${contents}&address=${address}&redirectUrl=${redirectUrl}`
          );
        }
      }
    );
  };

  return (
    <>
      <div className={styles.mapWrapper}>
        <Map
          className={styles.map}
          center={initialCenter}
          onDragEnd={(e) => handleMapMove(e)}
          level={3}
        >
          <Image
            className={styles.marker}
            src="/assets/marker.svg"
            width={0}
            height={0}
            alt="마커"
          />
        </Map>
      </div>
    </>
  );
}
