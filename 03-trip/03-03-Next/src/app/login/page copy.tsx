"use client";

import Image from "next/image";
import cover from "/public/img/cover.jpg";
import logoVer from "/public/img/logo_ver.png";

import Input from "@/components/Atoms/_Input";
import Button from "@/components/Atoms/_Button";
import InputField from "@/components/Molecules/_InputField";

import { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import useLoginUser from "@/commons/hooks/useLoginUser";

export default function LoginUI() {
    const router = useRouter();
    const {
        isLogIn,
        setIsLogIn,
        onLoginChange,
        onLoginInClick,
        onSignUpChange,
        onSignUpClick,
    } = useLoginUser();

    return (
        <div style={CSSLoginWrap}>
            <div style={CSSLoginImg}>
                <Image src={cover} alt="greeting" style={CSSImgAdjust} />
            </div>

            <div style={CSSLineBG}></div>

            <div style={CSSLoginBG}>
                <div style={CSSLoginForm}>
                    {isLogIn ? (
                        <>
                            <p style={{ fontSize: "2.4rem", margin: "1rem" }}>
                                <Image
                                    src={logoVer}
                                    alt="logo_ver"
                                    style={CSSLogoAdjust}
                                    onClick={() => router.push(`/`)}
                                />
                            </p>

                            <p style={{ fontSize: "2rem", margin: "1rem" }}>
                                성북 통합 구립도서관 사이트에 오신 것을
                                환영합니다.
                            </p>

                            <Input id="email_ID" onChange={onLoginChange} />
                            <Input id="password_ID" onChange={onLoginChange} />

                            <Button label="로그인" onClick={onLoginInClick} />

                            <Button
                                label="회원가입"
                                onClick={() => setIsLogIn((prev) => !prev)}
                            />
                        </>
                    ) : (
                        <>
                            <p style={{ fontSize: "2.4rem", margin: "1rem" }}>
                                회원 가입
                            </p>
                            <p style={{ fontSize: "2rem", margin: "1rem" }}>
                                회원 가입을 위해 아래 빈 칸을 모두 채워 주세요.
                            </p>

                            <InputField
                                id="email_ID"
                                onChange={onSignUpChange}
                                required
                            />
                            <InputField
                                id="name_ID"
                                onChange={onSignUpChange}
                                required
                            />
                            <InputField
                                id="password_ID"
                                onChange={onSignUpChange}
                                required
                            />
                            <InputField
                                id="passwordConfirm_ID"
                                onChange={onSignUpChange}
                                required
                            />

                            <Button
                                label="취소"
                                onClick={() => setIsLogIn((prev) => !prev)}
                            />
                            <Button label="회원가입" onClick={onSignUpClick} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const CSSLoginWrap: CSSProperties = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    position: "fixed",
};

const CSSLoginImg: CSSProperties = {
    position: "relative",
    width: "70%",
    overflow: "hidden",
};

const CSSImgAdjust: CSSProperties = {
    position: "absolute",
    objectFit: "cover",
    height: "100%",
};

const CSSLoginBG: CSSProperties = {
    position: "relative",
    width: "30%",
    backgroundColor: "#fcfcfc",
    padding: "2rem 4rem 2rem 8rem",
    flexShrink: "0",
};

const CSSLogoAdjust: CSSProperties = {
    width: "20rem",
    cursor: "pointer",
    // filter: "brightness(0) invert(100%)",
};

const CSSLoginForm: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    height: "80%",
};

const CSSLineBG: CSSProperties = {
    width: "1%",
    height: "100%",
    backgroundColor: "#faa634",
    position: "absolute",
    right: "28%",
    zIndex: "1",
};
