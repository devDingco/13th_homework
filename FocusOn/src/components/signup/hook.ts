import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./queries";
import { useRouter } from "next/navigation";
import { successModal } from "@/utils/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

export default function useSignUp() {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);

  const methods = useForm({
    resolver: zodResolver(schema),
    // onChange할 때마다 실행
    mode: "onChange",
  });

  // 로그인페이지 이동
  const routerLogin = () => {
    router.push("/login");
  };

  // 회원가입 mutation 로직
  const onClickSignUp = async (data) => {
    const { email, password, name } = data;
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
            name,
          },
        },
      });
      console.log(result.data.createUser);
      successModal("회원가입에 성공하였습니다😊", routerLogin);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onClickSignUp,
    methods,
  };
}
