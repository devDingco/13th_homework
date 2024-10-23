"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, LOGOUT_USERS } from "./queries";

export const useLoginPage = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [logoutUser] = useMutation(LOGOUT_USERS);

  const router = useRouter();

  const { control, getValues } = useForm({
    mode: "onChange",
  });

  //! 로그아웃 함수
  const logOut = async () => {
    await logoutUser().then((res) => {
      console.log(res);
      localStorage.removeItem("accessToken");
    });
  };

  //! 로그인 제출 함수
  const signInSubmit = async () => {
    const { email, password } = getValues();
    // 0. 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      return alert("이메일과 비밀번호를 입력해 주세요.");
    }

    // 1. 로그인 요청
    await loginUser({
      variables: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        const accessToken = res.data.loginUser.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("이메일과 비밀번호를 확인해 주세요.");
      });
  };

  return { control, signInSubmit, router, logOut };
};
