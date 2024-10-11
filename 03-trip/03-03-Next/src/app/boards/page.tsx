"use client";

import { Rate } from "antd";
import { CarouselUI } from "@/components/Molecules/_Carousel";
import BoardsListUI from "@/components/Organisms/BoardsList";
import Button from "@/components/Atoms/_Button";
import { useRouter } from "next/navigation";

export default function BoardsListPage() {
    const Router = useRouter();
    const TempFunc = (e) => {
        e.preventDefault();
        Router.push(`/boards/new`);
    };

    return (
        <>
            <CarouselUI />
            <br />
            <Button label="등록하기" onClick={TempFunc} />
            <br />
            <BoardsListUI />
        </>
    );
}
