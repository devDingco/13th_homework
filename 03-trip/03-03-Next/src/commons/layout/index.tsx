"use client";

import LayoutHeader from "./header";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import { usePathname } from "next/navigation";

const SHOW_BANNER = [`/`, `/boards`];

interface IChildren {
    children: React.ReactNode;
}

export default function PageLayout({ children }: IChildren) {
    const pathname = usePathname();
    const isShowBanner = SHOW_BANNER.includes(pathname);

    return (
        <>
            <LayoutHeader />
            {isShowBanner && <LayoutBanner />}
            {children}
            <LayoutFooter />
        </>
    );
}
