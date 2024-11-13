import InputComponent from "@/_components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/_components/button";

const USER_SIGNUP = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserInput: { name: $name, email: $email, password: $password }
    ) {
      _id
    }
  }
`;

const SignupFormComponent = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [signupUser] = useMutation(USER_SIGNUP);

  const onClickSubmit = async (data) => {
    try {
      await signupUser({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      router.push("/user/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const onClickLogin = () => {
    // ? : zod 잔상이 남음. Next Link를 사용해야 하나?
    router.push("/user/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onClickSubmit)}
      className="flex flex-col items-center gap-5"
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
      <div className="w-3/4 max-w-xl flex content-center items-center gap-5">
        <span className="w-20">이름</span>
        <InputComponent
          className=""
          placeholder="이름을 입력해주세요."
          {...register("name")}
        />
      </div>
      <div className="text-sm font-light text-red-500">
        {formState.errors.name?.message}
      </div>
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
      <div className="w-3/4 max-w-xl flex content-center items-center gap-5">
        <span className="w-20">비밀번호 재입력</span>
        <InputComponent
          className=""
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("passwordCheck")}
        />
      </div>
      <div className="text-sm font-light text-red-500">
        {formState.errors.passwordCheck?.message}
      </div>
      <div className="flex gap-10">
        <ButtonComponent
          type="button"
          value={"로그인"}
          className=""
          onClick={onClickLogin}
        />
        <ButtonComponent type="submit" value={"회원가입"} className="" />
      </div>
    </form>
  );
};

export default SignupFormComponent;
