import ButtonComponent from "@/_components/button";
import InputComponent from "@/_components/input";

import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { schema } from "./schema";

const USER_LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const LoginFromComponent = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [loginUser] = useMutation(USER_LOGIN);

  const onClickSubmit = async (data) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      localStorage.setItem("accessToken", result.data.loginUser.accessToken);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onClickSignup = () => {
    router.push("/user/signup");
  };

  return (
    // TODO: form 박스 안에 느낌으로 (CSS)
    <form
      className="flex flex-col items-center gap-5"
      onSubmit={handleSubmit(onClickSubmit)}
    >
      <div className="w-3/4 max-w-xl flex content-center items-center gap-5">
        <span className="w-20">이메일</span>
        <InputComponent
          className=""
          placeholder="이메일을 입력해주세요."
          {...register("email")}
        />
      </div>
      <div className="text-sm font-light text-red-500">
        {formState.errors.email?.message}
      </div>

      {/* TODO: 비밀번호 입력 시 *** 안나오고 투명 */}
      <div className="w-3/4 max-w-xl flex content-center items-center gap-5">
        <span className="w-20">비밀번호</span>
        <InputComponent
          className=""
          placeholder="비밀번호를 입력해주세요."
          {...register("password")}
        />
      </div>
      <div className="text-sm font-light text-red-500">
        {formState.errors.password?.message}
      </div>
      <div className="flex gap-10">
        <ButtonComponent
          type="button"
          value={"회원가입"}
          className=""
          onClick={onClickSignup}
        />
        <ButtonComponent type="submit" value={"로그인"} className="" />
      </div>
    </form>
    // TODO: 회원가입, 홈 버튼
  );
};

export default LoginFromComponent;
