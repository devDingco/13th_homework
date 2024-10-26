"use client";

import Image from "next/image";
import logo from "/public/img/logo.png";
import Button from "@/components/Atoms/_Button";

export default function LayoutNav() {
    return (
        <>
            <nav style={NavWrap}>
                <div style={NavMenu}>
                    <Image src={logo} alt="logo" width={200} height={0} />

                    <div style={NavButton}>성북구 도서관</div>
                    <div style={NavButton}>도서 대출</div>
                    <div style={NavButton}>마이 페이지</div>
                </div>

                <Button label="로그인" />
            </nav>
        </>
    );
}

const NavWrap = {
    width: "120rem",
    height: "8rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const NavMenu = {
    display: "flex",
    gap: "2rem",
};

const NavButton = {
    width: "12rem",
    height: "4rem",
    borderBottom: "1px solid #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
