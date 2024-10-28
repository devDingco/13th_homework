"use client";

import Image from "next/image";
import logo from "/public/img/logo_hoz.png";
import Button from "@/components/Atoms/_Button";
import { CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";
import { FETCH_USER } from "@/commons/queries/queries";

export default function LayoutNav() {
    const router = useRouter();

    const { data: login } = useQuery(FETCH_USER);
    console.log(login);

    return (
        <>
            <nav style={NavWrap}>
                <div style={NavMenu}>
                    <div onClick={() => router.push(`/boards`)}>
                        <Image src={logo} alt="logo" width={200} height={0} />
                    </div>

                    <div style={NavButton}>성북구 도서관</div>
                    <div style={NavButton}>도서 대출</div>
                    <div style={NavButton}>마이 페이지</div>
                </div>

                {login ? (
                    <div>
                        <span style={{ color: "#5C0000", fontSize: "2rem" }}>
                            {login.fetchUserLoggedIn.name}
                        </span>{" "}
                        님 안녕하세요!
                    </div>
                ) : (
                    <Button
                        label="로그인"
                        onClick={() => router.push(`/login`)}
                    />
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
