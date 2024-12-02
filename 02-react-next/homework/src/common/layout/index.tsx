"use client";

import LayoutNav from "./nav";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import { usePathname } from "next/navigation";

const SHOW_BANNER = [`/boards`];
const HIDE_BANNER = [`/auth`];

interface IChildren {
    children: React.ReactNode;
}

export default function PageLayout({ children }: IChildren) {
    const pathname = usePathname();
    const isShowBanner = SHOW_BANNER.includes(pathname);
    const isHideBanner = HIDE_BANNER.includes(pathname);

    return (
        <>
            {!isHideBanner && <LayoutNav />}
            {isShowBanner && <LayoutBanner />}

            {children}

            {!isHideBanner && <LayoutFooter />}
        </>
    );
}
