"use client";

import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        console.log(map);
      });
    };
  }, []);

  return (
    <>
      <div id="map" className="w-full h-[300px]"></div>
    </>
  );
}
