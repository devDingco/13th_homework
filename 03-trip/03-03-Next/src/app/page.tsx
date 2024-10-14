"use client";

import BoardsListPage from "./boards/page";

import Button from "@/components/Atoms/_Button";
import { useRouter } from "next/navigation";

export default function Home() {
    const Router = useRouter();
    const TempFunc = (e) => {
        e.preventDefault();
        Router.push(`/boards/new`);
    };

    return (
        <>
            <br />
            <Button label="등록하기" onClick={TempFunc} />
            <br />

            <BoardsListPage />
        </>
    );
}
