import KakaoMap from "@/components/ui/kakao-map";
import { css } from "@/styled-system/css";

export default function PlaceIdUI() {
    return (
        <>
            <div>ididid</div>

            <div className={css_mapModify}>
                <KakaoMap />
            </div>
        </>
    );
}

const css_mapModify = css({
    w: "100%",
    h: "16rem",
    bg: "#f2f3f7",
    rounded: "0.8rem",
    overflow: "clip",
});
