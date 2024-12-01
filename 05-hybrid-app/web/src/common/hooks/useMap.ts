"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import { FETCH_SOLPLACE_LOG } from "../apis/graphql/queries/fetch-solplace-log.query";

interface IUseMapProps {
  isEdit?: boolean;
}

export default function useMap({ isEdit }: IUseMapProps) {
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

  // 중심 좌표와 마커 위치
  const [center, setCenter] = useState({
    lat: isEdit ? Number(data?.fetchSolplaceLog?.lat) : 37.5666,
    lng: isEdit ? Number(data?.fetchSolplaceLog?.lng) : 126.979,
  });

  const [address, setAddress] = useState("");

  // 주소를 가져오는 함수
  const getAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const latlng = new window.kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          let fullAddress = result[0].address.address_name; // 상세 주소
          // "서울"이 포함된 경우 "서울시"로 변경
          if (fullAddress.includes("서울")) {
            fullAddress = fullAddress.replace("서울", "서울시");
          }
          setAddress(fullAddress);
        } else {
          setAddress("주소를 찾을 수 없습니다.");
        }
      }
    );
  };

  // 지도 중심이 변경될 때
  const handleCenterChanged = (map) => {
    const latlng = map.getCenter();
    setCenter({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
    getAddressFromLatLng(latlng.getLat(), latlng.getLng()); // 주소 가져오기
  };

  // 데이터가 로드되면 중심 좌표를 업데이트
  useEffect(() => {
    if (isEdit && data?.fetchSolplaceLog) {
      const lat = Number(data.fetchSolplaceLog.lat);
      const lng = Number(data.fetchSolplaceLog.lng);
      setCenter({ lat, lng });
      getAddressFromLatLng(lat, lng); // 초기 주소 가져오기
    }
  }, [isEdit, data]);

  return {
    useKakaoLoader,
    center,
    handleCenterChanged,
    address, // 상세 주소
  };
}
