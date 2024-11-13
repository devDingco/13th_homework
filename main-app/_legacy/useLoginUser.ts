"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useTokenStore } from "@/common/stores/useTokenStore";
import { useMutation } from "@apollo/client";
import { CreateUserDocument, LoginUserDocument } from "@/common/graphql/graphql";
import withSweetAlert from "@/common/library/withSweetAlert";

export default function useLoginUser() {
    const { plainAlert, errorAlert } = withSweetAlert();

    const router = useRouter();

    //** 글로벌 스테이트로 토큰 관리 */
    const { setToken } = useTokenStore();

    //** 로그인 인풋 관리용 스테이트 */
    const [loginInput, setLoginInput] = useState({
        email_ID: "",
        password_ID: "",
    });
    const [loginError, setLoginError] = useState(false);

    //** 회원가입 인풋 관리용 스테이트 */
    const [signUpInput, setSignUpInput] = useState({
        email_ID: "",
        name_ID: "",
        password_ID: "",
        passwordConfirm_ID: "",
    });

    //** 로그인 스테이트 업데이트 */
    function onLoginChange(e: ChangeEvent<HTMLInputElement>) {
        setLoginInput((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    //** 회원가입 스테이트 업데이트 */
    function onSignUpChange(e: ChangeEvent<HTMLInputElement>) {
        setSignUpInput((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    //** 로그인 로직 실행, 성공시 메인페이지로 */
    const [loginUser] = useMutation(LoginUserDocument);

    async function onLoginInClick() {
        if (!loginInput.email_ID || !loginInput.password_ID) {
            return setLoginError(true);
        } else {
            setLoginError(false);
        }

        try {
            const result = await loginUser({
                variables: {
                    email: loginInput.email_ID,
                    password: loginInput.password_ID,
                },
            });
            console.log(result);

            const token = result.data?.loginUser.accessToken;
            if (!token) {
                return errorAlert("로그인에 실패하였습니다! 다시 시도하여 주세요.");
            }
            setToken(token);
            // sessionStorage.setItem("@_¡¡", token);

            plainAlert(`로그인 성공!!`, "success");
            router.push(`/boards`);
        } catch (error) {
            errorAlert("로그인에 실패하였습니다");
            console.log(error);
        }
    }

    //** 회원가입 로직 실행, 성공시 로그인으로 */
    const [createUser] = useMutation(CreateUserDocument);

    async function onSignUpClick() {
        if (signUpInput.password_ID !== signUpInput.passwordConfirm_ID) {
            return errorAlert("비밀번호가 다릅니다!! 다시 확인해 주세요.");
        }

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
            if (result) plainAlert(`등록되었습니다!!`, "success");
            router.push(`/login`);
        } catch (error) {
            errorAlert("등록에 실패하였습니다. 다시 시도해 주세요.");
            console.log(error);
        }
    }

    //** 로그인 페이지 컴포넌트로 수출 */
    return {
        loginError,
        onLoginChange,
        onSignUpChange,
        onLoginInClick,
        onSignUpClick,
    };
}
