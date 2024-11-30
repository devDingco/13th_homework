import { css } from "@/styled-system/css";
import { HeaderGlobal } from "./header/header";

export default function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={app}>
            <HeaderGlobal />
            {children}
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
