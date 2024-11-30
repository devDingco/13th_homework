"use client";
import { css } from "@/styled-system/css";
import { ChevronLeft } from "lucide-react";

import { usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "../constants";

interface type_header {
    title: string;
    hasBack: boolean;
}

const HeaderBase = ({ title, hasBack }: type_header) => {
    return (
        <div className={css_header}>
            {hasBack && (
                <div className={css_icon}>
                    <ChevronLeft />
                </div>
            )}

            {title ? <div className={css_title}>{title}</div> : <></>}
        </div>
    );
};

export function HeaderGlobal() {
    const pathname = usePathname();
    // const params = useParams();
    const options = HEADER_OPTIONS().GLOBAL[pathname];

    return (
        <div style={{ display: options ? "block" : "none" }}>
            <HeaderBase {...options} />
        </div>
    );
}

// export function HeaderLocal({children, ...rest}) {
//     const pathname = usePathname();
//     const params = useParams();
//     const options = HEADER_OPTIONS(params).GLOBAL[pathname];

//     return (
//         <div style={{ display: options ? "block" : "none" }}>
//             <HeaderBase {...options} {...rest}>
//                 {children}
//             </HeaderBase>
//         </div>
//     );
// }

const css_header = css({
    w: "100%",
    h: "4.8rem",

    display: "flex",
    alignItems: "center",
});

const css_icon = css({
    w: "4rem",
    h: "4rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateX(-0.8rem)",
});

const css_title = css({
    fontSize: "2rem",
    fontWeight: "600",
    transform: "translateX(-0.8rem)",
});
