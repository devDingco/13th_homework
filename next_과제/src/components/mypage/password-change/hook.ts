import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
// import { RESET_USER_PASSWORD } from "@/components/mypage/password-change/queries";
import { ResetUserPasswordDocument } from "@/commons/graphql/graphql";

export const usePasswordChange = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const [resetUserPassword] = useMutation(ResetUserPasswordDocument);
  const passwordChange = async () => {
    const password = methods.getValues("newPassword");
    try {
      const result = await resetUserPassword({
        variables: {
          password,
        },
      });
      console.log(result);
      alert("비밀번호가 변경되었습니다.");

      // 비밀번호 변경 후 input 초기화
      methods.reset();
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return {
    methods,
    passwordChange,
  };
};
