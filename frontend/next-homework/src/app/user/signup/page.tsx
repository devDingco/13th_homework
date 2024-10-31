"use client";

import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

const SignupPage = () => {
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onClickSignup = async (data) => {
    console.log(data);

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });
      console.log(result);
      router.push("/user/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGoLogin = () => {
    router.push("/user/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onClickSignup)}>
        <div>
          <span>이름</span>
          <input type="text" {...register("name")} />
        </div>
        <div>{formState.errors.name?.message ?? ""}</div>
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
        <button disabled={!formState.isValid}>회원가입</button>
      </form>
      <button onClick={onClickGoLogin}>로그인</button>
    </div>
  );
};

export default SignupPage;
