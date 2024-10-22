"use client"

import BoardListBanner from "./banner"
import LayoutNavigationPage from "./navigation"

export default function LayoutPage(){
    return(
        <>
            <LayoutNavigationPage /> 
            <BoardListBanner />
        </>
    )
}