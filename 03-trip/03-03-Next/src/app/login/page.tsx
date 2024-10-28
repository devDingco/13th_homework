"use client";

import Image from "next/image";
import cover from "/public/img/cover.jpg";
import logoVer from "/public/img/logo_ver.png";

import Input from "@/components/Atoms/_Input";
import Button from "@/components/Atoms/_Button";
import InputField from "@/components/Molecules/_InputField";

import { ChangeEvent, CSSProperties, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "@/commons/queries/queries";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/commons/stores/useTokenStore";

export default function LoginUI() {
    const [isLogIn, setIsLogIn] = useState(true);
    const router = useRouter();

    const [loginInput, setLoginInput] = useState({
        email_ID: "",
        password_ID: "",
    });
    const [signUpInput, setSignUpInput] = useState({
        email_ID: "",
        name_ID: "",
        password_ID: "",
    });

    function onLoginChange(e: ChangeEvent<HTMLInputElement>) {
        setLoginInput((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
        console.log(loginInput);
    }

    function onSignUpChange(e: ChangeEvent<HTMLInputElement>) {
        setSignUpInput((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
        console.log(signUpInput);
    }

    const { setToken } = useTokenStore();

    const [loginUser] = useMutation(LOGIN_USER);

    async function onLoginInClick() {
        const result = await loginUser({
            variables: {
                email: loginInput.email_ID,
                password: loginInput.password_ID,
            },
        });
        console.log(result);

        const token = result.data.loginUser.accessToken;
        if (!token) {
            alert("로그인에 실패하였습니다! 다시 시도하여 주세요.");
        }
        setToken(token);

        alert(`로그인 성공
            ${token}`);
        router.push(`/`);
    }

    const [createUser] = useMutation(CREATE_USER);

    async function onSignUpClick() {
        try {
            const result = await createUser({
                variables: {
                    createUserInput: {
                        email: signUpInput.email_ID,
                        password: signUpInput.password_ID,
                        name: signUpInput.name_ID,
                    },
                },
            });
            if (result) alert(`등록되었습니다!!`);

            setIsLogIn(true);
            router.push(`/login`);
        } catch {
            alert("등록에 실패하였습니다. 다시 시도해 주세요.");
        }
    }

    return (
        <div style={CSSLoginWrap}>
            <div style={CSSLoginImg}>
                <Image src={cover} alt="greeting" style={CSSImgAdjust} />
            </div>

            <div style={CSSLineBG}></div>

            <div style={CSSLoginBG}>
                <div style={CSSLoginForm}>
                    <p style={{ fontSize: "2.4rem", margin: "1rem" }}>
                        {isLogIn ? (
                            <Image
                                src={logoVer}
                                alt="logo_ver"
                                style={CSSLogoAdjust}
                                onClick={() => router.push(`/`)}
                            />
                        ) : (
                            "회원 가입"
                        )}
                    </p>
                    <p style={{ fontSize: "2rem", margin: "1rem" }}>
                        {isLogIn
                            ? "성북 통합 구립도서관 사이트에 오신 것을 환영합니다."
                            : "회원 가입을 위해 아래 빈 칸을 모두 채워 주세요."}
                    </p>

                    {isLogIn ? (
                        <>
                            <Input id="email_ID" onChange={onLoginChange} />
                            <Input id="password_ID" onChange={onLoginChange} />
                        </>
                    ) : (
                        <>
                            <InputField
                                id="email_ID"
                                onChange={onSignUpChange}
                                value={signUpInput.email_ID}
                                required
                            />
                            <InputField
                                id="name_ID"
                                onChange={onSignUpChange}
                                value={signUpInput.name_ID}
                                required
                            />
                            <InputField
                                id="password_ID"
                                onChange={onSignUpChange}
                                value={signUpInput.password_ID}
                                required
                            />
                            <InputField id="passwordConfirm_ID" required />
                        </>
                    )}

                    {isLogIn ? (
                        <Button label="로그인" onClick={onLoginInClick} />
                    ) : (
                        <Button
                            label="취소"
                            onClick={() => setIsLogIn((prev) => !prev)}
                        />
                    )}

                    {isLogIn ? (
                        <Button
                            label="회원가입"
                            onClick={() => setIsLogIn((prev) => !prev)}
                        />
                    ) : (
                        <Button label="회원가입" onClick={onSignUpClick} />
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
    fontSize: "1.8rem",
};

const CSSLineBG: CSSProperties = {
    width: "1%",
    height: "100%",
    backgroundColor: "#faa634",
    position: "absolute",
    right: "23%",
    zIndex: "1",
};
