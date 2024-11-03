"use client";

import Image from "next/image";
import logo from "/public/img/logo_raw.png";
import Button from "@/components/Atoms/_Button";
import { CSSProperties, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";
import { FetchUserLoggedInDocument } from "@/common/graphql/graphql";

export default function LayoutNav() {
    const [isSelect, setIsSelect] = useState("mainPage");
    const router = useRouter();

    const { data: login } = useQuery(FetchUserLoggedInDocument);

    function onNavClick(e: MouseEvent) {
        const target = e.target as HTMLLIElement;
        setIsSelect(target.id);

        switch (target.id) {
            case "mainPage": {
                router.push(`/boards`);
                break;
            }
            case "subPage": {
                router.push(`/product`);
                break;
            }
            case "myPage": {
                router.push(`/mypage`);
                break;
            }
        }
    }

    return (
        <>
            <nav style={NavWrap}>
                <ul style={NavMenu}>
                    <li onClick={() => router.push(`/`)}>
                        <Image src={logo} alt="logo" width={50} height={0} />
                    </li>

                    <li style={isSelect === "mainPage" ? selectedButton : NavButton} id="mainPage" onClick={onNavClick}>
                        메인페이지(보드)
                    </li>
                    <li style={isSelect === "subPage" ? selectedButton : NavButton} id="subPage" onClick={onNavClick}>
                        서브페이지(상품)
                    </li>
                    <li style={isSelect === "myPage" ? selectedButton : NavButton} id="myPage" onClick={onNavClick}>
                        마이페이지(유저)
                    </li>
                </ul>

                {login ? (
                    <div>
                        <span style={{ color: "#5C0000", fontSize: "2rem" }}>{login.fetchUserLoggedIn.name}</span> 님
                        안녕하세요!
                    </div>
                ) : (
                    <Button label="로그인" onClick={() => router.push(`/login`)} />
                )}
            </nav>
        </>
    );
}

const NavWrap = {
    width: "100vw",
    height: "8rem",
    borderBottom: "2px solid #eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
};

const NavMenu = {
    width: "110rem",
    display: "flex",
    gap: "2rem",
};

const NavButton: CSSProperties = {
    width: "11rem",
    height: "4rem",
    borderBottom: "1px solid #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const selectedButton: CSSProperties = {
    width: "11rem",
    height: "4rem",
    borderBottom: "2px solid #ffbe98",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
