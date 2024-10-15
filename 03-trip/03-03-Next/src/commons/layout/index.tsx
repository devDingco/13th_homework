"use client";

import LayoutHeader from "./header";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import { usePathname } from "next/navigation";
// import LayoutPagination from "./pagination";

const SHOW_BANNER = [`/`, `/boards`];

// const SHOW_PAGES = [`/`, `/boards`];

interface IChildren {
    children: React.ReactNode;
}

export default function PageLayout({ children }: IChildren) {
    const pathname = usePathname();
    const isShowBanner = SHOW_BANNER.includes(pathname);
    // const isShowPages = SHOW_PAGES.includes(pathname);

    return (
        <>
            <LayoutHeader />
            {isShowBanner && <LayoutBanner />}
            {children}
            <LayoutFooter />
        </>
    );
}
