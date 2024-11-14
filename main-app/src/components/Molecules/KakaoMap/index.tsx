"use client";
import { useEffect } from "react";

// declare const window: Window & {
//     kakao: any;
// };

declare global {
    interface Window {
        kakao: kakao.maps.Map;
    }
}

export default function KakaoMapUI() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP}&autoload=false`;

        document.head.appendChild(script);
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map") as HTMLElement;
                const options = {
                    center: new window.kakao.maps.LatLng(37.609811, 127.026259),
                    level: 3,
                };

                new window.kakao.maps.Map(container, options);
                // console.log(map);
            });
        };
    }, []);

    return <div id="map" style={CSS_map}></div>;
}

const CSS_map = {
    width: "500px",
    height: "500px",
    backgroundColor: "#F2F3F7",
    borderRadius: "16px",
    overflow: "hidden",
};
