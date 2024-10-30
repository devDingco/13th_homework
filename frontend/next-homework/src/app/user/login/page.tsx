"use client";

import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useRouter } from "next/navigation";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const [logiunUser] = useMutation(LOGIN_USER);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onClickLogin = async (data) => {
    console.log(data);

    try {
      const result = await logiunUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      console.log(result);
      // TODO: 성공 Modal 넣어주기
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGoSignup = () => {
    router.push("/user/signup");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onClickLogin)}>
        <div>
          <span>이메일</span>
          <input type="text" {...register("email")} />
        </div>
        <div>{formState.errors.email?.message ?? ""}</div>
        <div>
          <span>비밀번호</span>
          <input type="text" {...register("password")} />
        </div>
        <div>{formState.errors.password?.message ?? ""}</div>
        <button>로그인</button>
      </form>
      <button onClick={onClickGoSignup}>회원가입</button>
    </div>
  );
};

export default LoginPage;
