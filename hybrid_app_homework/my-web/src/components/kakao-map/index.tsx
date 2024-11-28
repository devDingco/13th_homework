"use client";

import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "./hooks";

interface IKakaoMap {
  lat: number;
  lng: number;
}

export default function KaKaoMap({ lat, lng }: IKakaoMap) {
  useKakaoLoader();
  return (
    <>
      <Map
        className="rounded-xl"
        center={{ lat, lng }}
        style={{ width: "calc(100vw - 2.5rem)", height: "10rem" }}
        level={3}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        <MapMarker key={`marker__${lat}-${lng}`} position={{ lat, lng }} />
      </Map>
    </>
  );
}
