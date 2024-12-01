"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import useKakaoMapLoader from "@/commons/hooks/use-kakao-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { Map } from "react-kakao-maps-sdk";

interface ISolplaceMapProps {
  initialCenter: { lat: number; lng: number };
  isEdit: boolean;
}

export default function AddressMap({
  initialCenter,
  isEdit,
}: ISolplaceMapProps) {
  const router = useRouter();
  // 쿼리스트링 값 추출
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address") || "";
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

  // 지도등록 / 지도수정 눌렀을 시 redirect-url 로 쿼리스트링과 함꼐 페이지 이동
  const onClickAddMap = () => {
    router.push(
      `${redirectUrl}?name=${name}&contents=${contents}&address=${address}`
    );
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Map
          center={initialCenter}
          style={{ width: "100vw", height: "100vh" }}
          onDragEnd={(e) => handleMapMove(e)}
          level={3}
        />

        {/* 화면 중앙에 고정된 마커 */}
        <div
          style={{
            zIndex: 10,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            pointerEvents: "none", // 클릭 이벤트 방지
          }}
        >
          <Image
            className={styles.marker}
            src="/assets/marker.svg"
            width={0}
            height={0}
            alt="Marker"
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <input
          type="text"
          className={styles.address}
          value={address}
          readOnly
        />
        <button onClick={onClickAddMap} className={styles.button}>
          이 위치로 {isEdit ? "수정" : "등록"}
        </button>
      </div>
    </>
  );
}
