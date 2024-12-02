"use client";
import useKakaoLoader from "@/common/library/kakao-map";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const center = {
    lat: 37.5574860634693,
    lng: 127.173495116432,
};

/**
 * @notice 이 컴포넌트는 가로 세로가 지정되어 있지 않습니다. 컴포넌트를 호출할 때 div로 감싸서 스타일을 지정해주세요.
 */
export default function KakaoMap() {
    useKakaoLoader();

    const [position, setPosition] = useState<{
        lat: number;
        lng: number;
    }>();

    return (
        <Map
            id="map"
            center={center}
            style={{ width: "100%", height: "100%", flexShrink: "0" }}
            level={3}
            onClick={(_, mouseEvent) => {
                const latlng = mouseEvent.latLng;
                setPosition({
                    lat: latlng.getLat(),
                    lng: latlng.getLng(),
                });
            }}
        >
            <MapMarker position={position ?? center} />
        </Map>
    );
}
