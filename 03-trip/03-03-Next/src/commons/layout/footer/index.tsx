"use client";

export default function LayoutFooter() {
    return (
        <>
            <footer style={FooterWrap}>
                <div style={{ ...FooterText, flexDirection: "column" }}>
                    <p style={{ textAlign: "center" }}>
                        02827 서울시 성북구 아리랑로12길 4(돈암동, 시네마빌딩)
                        재단법인 성북문화재단 대표이사 서노원
                    </p>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "1.4rem",
                        }}
                    >
                        사업자등록번호. 209-82-11298 / T. 02-2038-4901 / F.
                        02-927-9509 / E. master@sbculture.or.kr
                    </p>
                </div>
            </footer>
        </>
    );
}

const FooterWrap = {
    width: "100vw",
    height: "100px",
    backgroundColor: "#f2f3f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const FooterText = {
    width: "100rem",
    display: "flex",
    gap: "0.4rem",
};
