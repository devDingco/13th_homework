"use client";

import Image from "next/image";
import cover from "/public/img/cover.jpg";
import logoVer from "/public/img/logo_ver.png";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { css } from "@/common/styled-system/css";

import { Input_Radii_Full } from "@/components/Atoms/_Input/input";
import { Button_Radii_Primary, Button_Radii_White } from "@/components/Atoms/_Button/button";
import InputField from "@/components/Molecules/_InputField/field";
import useAuth from "./useAuth";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { I_schema, loginSchema, signupSchema } from "./schema";

export default function LoginPage() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);

    const { onClickLogin, onClickSignup } = useAuth({ setIsLogin });

    const methods = useForm<I_schema>({
        resolver: zodResolver(isLogin ? loginSchema : signupSchema),
        mode: "onChange",
    });

    return (
        <div className={CSS_LoginWrap}>
            <div className={CSS_LoginImg}>
                <Image src={cover} alt="greeting" className={CSS_ImgAdjust} />
            </div>
            <div className={CSS_LineBG}></div>
            <div className={CSS_LoginBG}>
                <div className={CSS_LoginForm}>
                    {isLogin ? (
                        <>
                            <Image
                                src={logoVer}
                                alt="logo_ver"
                                className={CSS_LogoAdjust}
                                onClick={() => router.push(`/`)}
                            />

                            <p className={CSS_Text}>성북 통합 구립도서관 사이트에 오신 것을 환영합니다.</p>

                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onClickLogin)}>
                                    <Input_Radii_Full keyname="email" />
                                    <Input_Radii_Full keyname="password" />

                                    <div className={CSS_ButtonWrap}>
                                        <Button_Radii_Primary label="로그인" />
                                        <Button_Radii_White
                                            label="회원가입"
                                            type="button"
                                            onClick={() => setIsLogin(false)}
                                        />
                                    </div>
                                </form>
                            </FormProvider>
                        </>
                    ) : (
                        <>
                            <p className={CSS_Text}>회원 가입</p>
                            <p className={CSS_Text}>회원 가입을 위해 아래 빈 칸을 모두 채워 주세요.</p>

                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onClickSignup)}>
                                    <InputField keyname="email" required />
                                    <InputField keyname="name" required />
                                    <InputField keyname="password" required />
                                    <InputField keyname="pwConfirm" required />

                                    <div className={CSS_ButtonWrap}>
                                        <Button_Radii_Primary label="회원가입" />
                                        <Button_Radii_White
                                            label="취소"
                                            type="button"
                                            onClick={() => setIsLogin(true)}
                                        />
                                    </div>
                                </form>
                            </FormProvider>
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
    justifyContent: "center",
    gap: "2rem",
});

const CSS_Text = css({
    fontSize: "2rem",
    margin: "1rem",
});
