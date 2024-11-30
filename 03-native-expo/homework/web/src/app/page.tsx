"use client";
import { css } from "@/styled-system/css";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>Hello 🐼!</div>
            <br />

            <div
                onClick={() => router.push(`place/new`)}
                className={css({ _hover: { color: "#ffbe98" } })}
            >
                솔플NEW: 등록페이지로 이동하기
            </div>
        </>
    );
}
