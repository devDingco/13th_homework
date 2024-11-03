import Link from "next/link";
import { css } from "../../styled-system/css";

export default function Home() {
    return (
        <>
            <div className={css({ fontSize: "10rem", color: "rose.500", fontWeight: "bold" })}>
                Hello 🐼!
            </div>
            <Link
                href={"/boards"}
                className={css({ fontSize: "2rem", _hover: { color: "rose.500" } })}
            >
                Getting Started!
            </Link>
        </>
    );
}
