"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";
const KAKAO_MAP_URL = "https://dapi.kakao.com/v2/maps/sdk.js";

interface KakaoMapProps {
  address: string;
  apiKey: string;
  width?: string;
  height?: string;
}

const KakaoMap = ({
  address,
  apiKey,
  width = "100%",
  height = "300px",
}: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const geocoder = useRef<any>(null);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.id = KAKAO_MAP_SCRIPT_ID;
        script.src = `${KAKAO_MAP_URL}?appkey=${apiKey}&libraries=services&autoload=false`;
        script.async = true;
        script.onload = () => {
          window.kakao.maps.load(() => {
            resolve();
          });
        };
        document.head.appendChild(script);
      });
    };

    const initializeMap = async () => {
      try {
        // 스크립트가 이미 있는지 확인
        const existingScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

        if (!existingScript) {
          await loadKakaoMapScript();
        }

        // Kakao 맵 초기화
        if (!window.kakao?.maps) {
          console.error("Kakao maps SDK not loaded");
          return;
        }

        // Geocoder 서비스 초기화
        geocoder.current = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표 검색
        geocoder.current.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            const options = {
              center: coords,
              level: 3,
            };

            if (!mapContainer.current) return;

            // 지도 생성
            mapInstance.current = new window.kakao.maps.Map(
              mapContainer.current,
              options
            );

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: coords,
            });
            marker.setMap(mapInstance.current);
          } else {
            console.error("Failed to convert address:", status);
          }
        });
      } catch (error) {
        console.error("Error initializing Kakao map:", error);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      const script = document.getElementById(KAKAO_MAP_SCRIPT_ID);
      if (script) {
        script.remove();
      }
      if (mapInstance.current) {
        // Clean up map instance if needed
        mapInstance.current = null;
      }
    };
  }, [address, apiKey]);

  return <div ref={mapContainer} style={{ width, height }} />;
};

export default KakaoMap;
