"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "../signUp/common/InputField";
import { AlertDialog } from "../signUp/common/AlertDialog";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";

export default function LoginForm() {
  const router = useRouter();

  // 알림창 상태 관리
  const [alertState, setAlertState] = useState({
    open: false,
    title: "",
    description: "",
  });

  // React Hook Form 설정
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 일반 로그인 처리
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        dev: true,
        redirect: false,
      });

      console.log("일반 로그인 결과:", result);

      if (result?.error) {
        setAlertState({
          open: true,
          title: "로그인 실패",
          description: "이메일 또는 비밀번호가 올바르지 않습니다.",
        });
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlertState({
        open: true,
        title: "오류 발생",
        description: "로그인 처리 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {/* 이메일 입력 필드 */}
        <InputField
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />

        {/* 비밀번호 입력 필드 */}
        <InputField
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />

        {/* 아이디/비밀번호 찾기 기능은 추후 구현 예정 */}
        {/* <div className="flex justify-end">
          <Button variant="link" className="text-sm text-gray-600">
            아이디/비밀번호 찾기
          </Button>
        </div> */}

        {/* 로그인 버튼 */}
        <Button type="submit" className="w-full bg-indigo-600">
          로그인
        </Button>
      </form>

      {/* 알림 다이얼로그 */}
      <AlertDialog
        open={alertState.open}
        onClose={() => setAlertState((prev) => ({ ...prev, open: false }))}
        title={alertState.title}
        description={alertState.description}
        variant="destructive"
      />
    </FormProvider>
  );
}
