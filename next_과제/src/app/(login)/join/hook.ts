"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
// import { CREATE_USER } from "./queries";
import { CreateUserDocument } from "@/commons/graphql/graphql";

export const useJoinPage = () => {
  const [createUser] = useMutation(CreateUserDocument);

  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
  });

  // 회원가입 제출 함수
  const joinSubmit = async () => {
    const { joinEmail, joinName, joinPassword } = methods.getValues();

    // 1. 이메일 중복 확인과 비밀번호 확인을 통과했는지 확인
    if (!methods.formState.isValid || !methods.formState.isDirty) return;

    // 2. 회원가입 요청
    const result = await createUser({
      variables: {
        createUserInput: {
          email: joinEmail,
          name: joinName,
          password: joinPassword,
        },
      },
    });

    console.log(result);

    // 회원가입 성공 시 로그인 페이지로 이동
    router.push("/login");
  };

  return {
    joinSubmit,
    methods,
  };
};
