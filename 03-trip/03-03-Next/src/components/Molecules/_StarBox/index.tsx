"use client";
import Image from "next/image";
import star from "/public/svg/star.svg";

export default function StarBox() {
    return (
        <>
            <Image src={star} alt="star" style={{ filter: "invert(1)" }} />
            <Image src={star} alt="star" />
            <Image src={star} alt="star" />
            <Image src={star} alt="star" />
            <Image src={star} alt="star" />
        </>
    );
}
