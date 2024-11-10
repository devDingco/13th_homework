"use client";

import Image from "next/image";
import cover from "/public/img/cover.jpg";
import logoVer from "/public/img/logo_ver.png";

import Input from "@/components/Atoms/_Input";
import Button from "@/components/Atoms/_Button";
import InputField from "@/components/Molecules/_InputField";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginUser from "@/common/hooks/useLoginUser";
import { css } from "@/common/styled-system/css";

export default function LoginPage() {
    const router = useRouter();
    const { loginError, onLoginChange, onLoginInClick, onSignUpChange, onSignUpClick } = useLoginUser();

    const [isLogIn, setIsLogIn] = useState(true);

    return (
        <div className={CSS_LoginWrap}>
            <div className={CSS_LoginImg}>
                <Image src={cover} alt="greeting" className={CSS_ImgAdjust} />
            </div>

            <div className={CSS_LineBG}></div>

            <div className={CSS_LoginBG}>
                <div className={CSS_LoginForm}>
                    {isLogIn ? (
                        <>
                            <Image
                                src={logoVer}
                                alt="logo_ver"
                                className={CSS_LogoAdjust}
                                onClick={() => router.push(`/`)}
                            />

                            <p className={CSS_Text}>성북 통합 구립도서관 사이트에 오신 것을 환영합니다.</p>

                            <Input id="email_ID" onChange={onLoginChange} />
                            <Input id="password_ID" onChange={onLoginChange} />
                            {loginError && (
                                <div className={css({ color: "var(--chroma-error)" })}>
                                    아이디 또는 비밀번호를 확인해 주세요.
                                </div>
                            )}

                            <div className={CSS_ButtonWrap}>
                                <Button label="로그인" onClick={onLoginInClick} />
                                <Button label="회원가입" onClick={() => setIsLogIn((prev) => !prev)} />
                            </div>
                        </>
                    ) : (
                        <>
                            <p className={CSS_Text}>회원 가입</p>
                            <p className={CSS_Text}>회원 가입을 위해 아래 빈 칸을 모두 채워 주세요.</p>

                            <InputField id="email_ID" onChange={onSignUpChange} required />
                            <InputField id="name_ID" onChange={onSignUpChange} required />
                            <InputField id="password_ID" onChange={onSignUpChange} required />
                            <InputField id="passwordConfirm_ID" onChange={onSignUpChange} required />

                            <div className={CSS_ButtonWrap}>
                                <Button label="취소" onClick={() => setIsLogIn((prev) => !prev)} />
                                <Button label="회원가입" onClick={onSignUpClick} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const CSS_LoginWrap = css({
    display: "flex",
    width: "100vw",
    height: "100vh",
    position: "fixed",
});

const CSS_LoginImg = css({
    position: "relative",
    width: "71%",
    overflow: "hidden",
});

const CSS_ImgAdjust = css({
    position: "absolute",
    objectFit: "cover",
    height: "100%",
});

const CSS_LineBG = css({
    width: "1%",
    height: "100%",
    backgroundColor: "#faa634",
    position: "absolute",
    right: "28%",
    zIndex: "1",
});

const CSS_LoginBG = css({
    position: "relative",
    width: "30%",
    backgroundColor: "#fcfcfc",
    padding: "2rem 4rem 2rem 8rem",
    flexShrink: "0",
});

const CSS_LoginForm = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    height: "80%",
});

const CSS_LogoAdjust = css({
    width: "20rem",
    cursor: "pointer",
    // filter: "brightness(0) invert(100%)",
});

const CSS_ButtonWrap = css({
    display: "flex",
    gap: "2rem",
});

const CSS_Text = css({
    fontSize: "2rem",
    margin: "1rem",
});
