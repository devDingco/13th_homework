"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
// import { CREATE_USER } from "./queries";
import { CreateUserDocument } from "@/commons/graphql/graphql";

export const useJoinPage = () => {
  const [createUser] = useMutation(CreateUserDocument);

  const router = useRouter();
  const {
    control,
    getValues,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm({
    mode: "onChange",
  });

  // 비밀번호 확인 일치 여부 체크
  control.register("joinPasswordConfirm", {
    validate: (value) => {
      if (value === watch("joinPassword")) {
        return true;
      } else {
        return "비밀번호가 일치하지 않습니다.";
      }
    },
  });

  // 회원가입 제출 함수
  const joinSubmit = async () => {
    const { joinEmail, joinName, joinPassword } = getValues();

    // 1. 이메일 중복 확인과 비밀번호 확인을 통과했는지 확인
    if (!isValid || !isDirty) return;

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
    control,
    joinSubmit,
    errors,
    isValid,
    isDirty,
  };
};
