"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => { lat: number; lng: number };
        Map: new (
          container: HTMLElement | null,
          options: { center: { lat: number; lng: number }; level: number }
        ) => { setCenter: (latlng: { lat: number; lng: number }) => void };
        Marker: new (options: { position: { lat: number; lng: number } }) => {
          setMap: (map: {
            setCenter: (latlng: { lat: number; lng: number }) => void;
          }) => void;
        };
      };
    };
  }
}

export default function KaKaoMap({ lat, lng }: { lat: number; lng: number }) {
  console.log(lat, lng);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
          marker: true,
        };
        new window.kakao.maps.Map(container, options);
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
        }).setMap(new window.kakao.maps.Map(container, options));
      });
    };
    document.head.appendChild(script);
  }, [lat, lng]);

  return (
    <>
      <div
        id="map"
        className="border rounded-2xl"
        style={{ width: "100%", height: "280px" }}
      ></div>
    </>
  );
}
