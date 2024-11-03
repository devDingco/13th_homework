"use client";

import { css } from "@/common/styled-system/css";

import Button from "@/components/Atoms/_Button";
import ProductCardUI from "@/components/Molecules/ProductCard";
import RecommendCardUI from "@/components/Molecules/RecommendCard";
import SearchUI from "@/components/Molecules/Search";
import Image from "next/image";
import banner from "/public/img/logo_hoz.png";

export default function ProductListUI() {
    return (
        <section>
            <div className={CSS_Title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
            <div className={CSS_Wrap}>
                <RecommendCardUI />
                <RecommendCardUI />
            </div>

            <div className={CSS_Banner}>
                <Image src={banner} alt="banner" />
                대충 배너 들어올 곳
            </div>

            <div className={CSS_Title}>여기에서만 예약할 수 있는 숙소</div>
            <div className={CSS_Wrap}>
                <Button label="예약가능" />
                <Button label="예약마감" />
            </div>
            <div className={CSS_Between}>
                <SearchUI />
            </div>

            <div className={CSS_List}>
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

const CSS_Title = css({
    fontSize: "2.4rem",
    fontWeight: "700",
    padding: "2rem 0rem 4rem 0rem",
});

const CSS_Wrap = css({
    display: "flex",
    gap: "2rem",
});

const CSS_Banner = css({
    width: "100%",
    height: "24rem",
    backgroundColor: "#F2f3f7",
    borderRadius: "2rem",
    margin: "6rem 0rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDir: "column",
});

const CSS_Between = css({
    display: "flex",
    justifyContent: "space-between",
});

const CSS_List = css({
    width: "100%",
    height: "100%",

    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    padding: "2rem 0rem",
});
