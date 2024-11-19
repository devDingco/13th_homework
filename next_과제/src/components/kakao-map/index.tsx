"use client";
import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";

export default function KaKaoMap({ lat, lng }: { lat: number; lng: number }) {
  console.log(lat, lng);
  return (
    <>
      {lat && lng && (
        <Map
          className="border rounded-2xl"
          center={{ lat, lng }}
          style={{ width: "100%", height: "400px" }}
          level={3}
        >
          <MapTypeControl position={"TOPRIGHT"} />
          <ZoomControl position={"RIGHT"} />
          <MapMarker key={`marker__${lat}-${lng}`} position={{ lat, lng }} />
        </Map>
      )}
    </>
  );
}
