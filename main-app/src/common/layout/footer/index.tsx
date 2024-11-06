"use client";

import { css } from "@/common/styled-system/css";

export default function LayoutFooter() {
    return (
        <>
            <div className={CSS_FooterWrap}>
                <div className={CSS_FooterText}>
                    <p>02827 서울시 성북구 아리랑로12길 4(돈암동, 시네마빌딩) 재단법인 성북문화재단 대표이사 서노원</p>
                    <p className={css({fontSize: "1.4rem"})}>
                        사업자등록번호. 209-82-11298 / T. 02-2038-4901 / F. 02-927-9509 / E. master@sbculture.or.kr
                    </p>
                </div>
            </div>
        </>
    );
}

const CSS_FooterWrap = css({
    width: "100vw",
    height: "10rem",
    backgroundColor: "#f2f3f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})

const CSS_FooterText = css({
    width: "100rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
})
