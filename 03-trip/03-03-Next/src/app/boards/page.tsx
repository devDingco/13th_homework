"use client";

import { Rate } from "antd";
import { CarouselUI } from "@/components/Molecules/_Carousel";
import BoardsListUI from "@/components/Organisms/BoardsList";

export default function BoardsListPage() {
    return (
        <>
            <CarouselUI />
            <br />
            <Rate />
            <br />
            <BoardsListUI />
        </>
    );
}
