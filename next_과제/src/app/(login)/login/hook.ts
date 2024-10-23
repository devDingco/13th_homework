import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLoginPage = () => {
  // const session: any = await getServerSession(authOptions) // server-side
  const { data: session } = useSession(); // client-side
  console.log("세션", session);
  const router = useRouter();

  const { control, getValues } = useForm({
    mode: "onChange",
  });

  const signInSubmit = async () => {
    const { email, password } = getValues();
    // 0. 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      return alert("이메일과 비밀번호를 입력해 주세요.");
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      alert(result.error);
    }
  };

  return { control, signInSubmit, router };
};
