"use client";

import Image from "next/image";
import cover from "/public/img/cover.jpg";
import logoVer from "/public/img/logo_ver.png";

// import Input from "@/components/Atoms/_Input";
// import Button from "@/components/Atoms/_Button";
// import InputField from "@/components/Molecules/_InputField";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import useLoginUser from "./useLoginUser";
import { css } from "@/common/styled-system/css";

import { Input_Radii_Full } from "@/components/Atoms/_Input/input";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { I_schema, loginSchema, signupSchema } from "./schema";

import { CreateUserDocument, LoginUserDocument } from "@/common/graphql/graphql";
import { ApolloError, useMutation } from "@apollo/client";
import { Button_Radii_Primary, Button_Radii_White } from "@/components/Atoms/_Button/button";
import InputField from "@/components/Molecules/_InputField/field";
import withSweetAlert from "@/common/library/withSweetAlert";
import { useTokenStore } from "@/common/stores/useTokenStore";

export default function LoginPage() {
    const router = useRouter();
    const { plainAlert, errorAlert } = withSweetAlert();
    const { setToken } = useTokenStore();

    // const { loginError, onLoginChange, onLoginInClick, onSignUpChange, onSignUpClick } = useLoginUser();

    const [isLogin, setIsLogin] = useState(true);

    const methods = useForm<I_schema>({
        resolver: zodResolver(isLogin ? loginSchema : signupSchema),
        mode: "onChange",
    });

    const [loginUser] = useMutation(LoginUserDocument);
    const [createUser] = useMutation(CreateUserDocument);

    async function onClickLogin(data: I_schema) {
        try {
            const result = await loginUser({
                variables: {
                    email: data.email,
                    password: data.password,
                },
            });

            const token = result.data?.loginUser.accessToken;
            if (!token) {
                return errorAlert("로그인에 실패하였습니다! 다시 시도하여 주세요.");
            }
            setToken(token);
            // sessionStorage.setItem("@_¡¡", token);

            plainAlert(`로그인 성공!!`, "success");
            router.push(`/boards`);
        } catch (error) {
            const err = error as ApolloError;
            errorAlert(`${err.message}
                다시 시도해 주세요.`);
        }
    }

    async function onClickSignup(data: I_schema) {
        if (data.password !== data.pwConfirm) return;

        try {
            const user = await createUser({
                variables: {
                    createUserInput: {
                        email: data.email,
                        name: data.name as string,
                        password: data.password,
                    },
                },
            });
            if (user) plainAlert("회원가입 되셨습니다!!", "success");
            setIsLogin(true);
        } catch (error) {
            const err = error as ApolloError;
            errorAlert(`${err.message}
                다시 시도해 주세요.`);
        }
    }

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
                                    <InputField keyname="email" formState={methods.formState} required />
                                    <InputField keyname="name" formState={methods.formState} required />
                                    <InputField keyname="password" formState={methods.formState} required />
                                    <InputField keyname="pwConfirm" formState={methods.formState} required />

                                    <div className={CSS_ButtonWrap}>
                                        <Button_Radii_White
                                            label="취소"
                                            type="button"
                                            onClick={() => setIsLogin(true)}
                                        />
                                        <Button_Radii_Primary label="회원가입" />
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
    gap: "2rem",
});

const CSS_Text = css({
    fontSize: "2rem",
    margin: "1rem",
});
