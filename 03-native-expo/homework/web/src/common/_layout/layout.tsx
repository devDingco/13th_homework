import { css } from "@/styled-system/css";
import { HeaderGlobal } from "./header/header";

export default function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={app}>
            <header className={css_header}>
                <HeaderGlobal />
            </header>

            <section className={css_section}>{children}</section>
        </div>
    );
}

const app = css({
    display: "flex",
    flexDir: "column",
    alignItems: "center",

    minW: "32rem",
    minH: "100vh",

    w: "100vw",
    bg: "#fefefe",

    p: "2rem",
    boxShadow: "0px 4px 8px #bbb",
});

const css_header = css({
    w: "100%",
    h: "100%",
});

const css_section = css({
    w: "100%",
    h: "100%",
});
