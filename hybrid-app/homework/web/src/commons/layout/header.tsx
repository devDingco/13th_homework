'use client'

import { usePathname } from "next/navigation"
import { HEADER_OPTIONS } from "./constants"
import Image from "next/image"

export default function HeaderGlobal() {
    const pathname = usePathname()  // pathname = section02/02-02-layout-header-global
    const options = HEADER_OPTIONS.GLOBAL[pathname] // {title: "게시글등록", hasLog: false , hasBack: true}


    return(
        // <header style={{
        //     display: "flex",
        //     width: "100vw",
        //     backgroundColor: "yellow",
        //     height:"3.125rem",
        //     gap: "0.312rem"
        //  }}
        // >
        //     {options?.hasLog && <div>로고</div>}
        //     {options?.hasBack && <div>[뒤로가기버튼]</div>}
        //     {options?.title ? <div>{options.title}</div> : <></>}
        // </header>
            <header
            style={{
                display: "flex",
                alignItems: "center",
                width: "100vw",
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
            }}
            >
            {options?.hasarrow && (
                <Image
                src="/images/left_arrow.png"
                width={24}
                height={24}
                alt="왼쪽화살표"
                />
            )}
            {options.title ? <div
            style={{
                overflow: "hidden",
                color: "#000",
                textOverflow: "ellipsis",
                fontFamily: "SUIT Variable",
                fontSize: "1.125rem", // 18px
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "1.5rem", // 24px
                marginLeft: "0.5rem",
            }}
            >
            {options.title}
            </div> : <></>}

            </header>

        
    )
}