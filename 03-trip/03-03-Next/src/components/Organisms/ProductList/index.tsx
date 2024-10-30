"use client";

import Button from "@/components/Atoms/_Button";
import ProductCardUI from "@/components/Molecules/ProductCard";
import RecommendCardUI from "@/components/Molecules/RecommendCard";
import SearchUI from "@/components/Molecules/Search";
import { CSSProperties } from "react";

export default function ProductListUI() {
    return (
        <section>
            <div style={CSSTitle}>2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
            <div style={CSSWrap}>
                <RecommendCardUI />
                <RecommendCardUI />
            </div>

            <div style={CSSBanner}>대충 나중에 배너 이미지 들어올 것</div>

            <div style={CSSTitle}>여기에서만 예약할 수 있는 숙소</div>
            <div style={{ display: "flex", gap: "1rem" }}>
                <Button label="예약가능" />
                <Button label="예약마감" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <SearchUI />
            </div>

            <div style={CSSList}>
                <ProductCardUI />
                <ProductCardUI />
                <ProductCardUI />
                <ProductCardUI />

                <ProductCardUI />
                <ProductCardUI />
                <ProductCardUI />
                <ProductCardUI />
            </div>
        </section>
    );
}

const CSSTitle = {
    fontSize: "2.4rem",
    fontWeight: "700",
    padding: "2rem 0rem 4rem 0rem",
};

const CSSWrap = {
    display: "flex",
    gap: "2rem",
};

const CSSBanner = {
    width: "100%",
    height: "24rem",
    backgroundColor: "#F2f3f7",
    borderRadius: "2rem",
    margin: "6rem 0rem",
};

const CSSList: CSSProperties = {
    width: "100%",
    height: "100%",

    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    padding: "2rem 0rem",
};
