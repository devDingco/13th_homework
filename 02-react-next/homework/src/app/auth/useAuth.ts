"use client";

import { CreateUserDocument, LoginUserDocument } from "@/common/graphql/graphql";
import withSweetAlert from "@/common/library/withSweetAlert";
import { useTokenStore } from "@/common/stores/useTokenStore";
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { I_schema } from "./schema";
import { Dispatch, SetStateAction } from "react";

export default function useAuth({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter();

    const { plainAlert, errorAlert } = withSweetAlert();
    const { setToken } = useTokenStore();

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

    return {
        onClickLogin,
        onClickSignup,
    };
}
