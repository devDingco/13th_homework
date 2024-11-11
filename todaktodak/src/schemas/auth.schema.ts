import { z } from "zod";

// 비밀번호 공통 검증 로직
const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    "영문, 숫자, 특수문자를 포함해야 합니다"
  );

// 이메일 공통 검증 로직
const emailSchema = z.string().email("올바른 이메일 형식이 아닙니다");

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

// 회원가입 스키마
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 2글자 이상이어야 합니다")
      .max(10, "이름은 10글자 이하여야 합니다"),
    nickname: z
      .string()
      .min(2, "닉네임은 2글자 이상이어야 합니다")
      .max(10, "닉네임은 10글자 이하여야 합니다"),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
    addressInput: z.object({
      zoneCode: z.string().optional(),
      address: z.string().optional(),
      detailAddress: z.string().optional(),
    }),
    image: z.string().nullable(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

// 타입 추출
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
