import { css } from "@/common/styled-system/css";
import Link from "next/link";
import TEST_InputForm from "./temp/page";

export default function Home() {
    return (
        <>
            <div className={css({ fontSize: "8xl", color: "rose.500", fontWeight: "bold" })}>Hello 🐼!</div>
            <Link href="/boards" className={css({ fontSize: "4xl", _hover: { color: "rose.500" } })}>
                Getting Started!
            </Link>

            <TEST_InputForm />
        </>
    );
}
