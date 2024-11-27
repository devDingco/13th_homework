"use client";

import { useEffect } from "react";

declare const window: Window & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    const script = document.createElement("script"); //<script></script>
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=e4a8cb9c7cf25f2e797e716b7ef9cae8&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      });
    };
  }, []);

  return (
    <>
      {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e4a8cb9c7cf25f2e797e716b7ef9cae8"
      ></script> */}
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </>
  );
}
