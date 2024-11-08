"use client";

import { useAccessTokenStore } from "@/commons/stores/accessToken";
import FormField from "@/components/FormField";
import Input from "@/components/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
      createdAt
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formSignUp, setFormSignUp] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();
  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 폼으로 전환
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  // 폼 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUp) {
      // 회원가입 처리
      try {
        const resultSignUp = await createUser({
          variables: {
            createUserInput: {
              email: formSignUp.email,
              name: formSignUp.name,
              password: formSignUp.password,
            },
          },
        });
        console.log("회원가입 성공: ", resultSignUp);
        // 회원가입 성공 후 처리 (예: 로그인 폼으로 전환)
        setIsSignUp(false);
      } catch (error) {
        console.error("회원가입 오류:", error);
      }
    } else {
      //로그인

      try {
        // 로그인 뮤테이션 날려서 accessToken 받아오기
        const result = await loginUser({
          variables: {
            email: formSignUp.email,
            password: formSignUp.password,
          },
        });
        const accessToken = result.data.loginUser.accessToken;

        // 받아온 accessToken을 globalState에 저장하기
        if (accessToken === undefined) {
          alert("로그인 실패했습니다. 다시 시도해주세요");
          return;
        }
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);

        console.log("로그인 성공", accessToken);
        router.push("/boards");
      } catch (error) {
        console.log("로그인 실패: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[400px] flex flex-col justify-center items-center gap-6  h-screen px-10">
        {!isSignUp ? (
          <>
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={120}
              height={74.53}
            />
            <p>트립트립에 오신걸 환영합니다</p>
            <div className="flex flex-col gap-3 w-full text-center">
              <p>트립트립에 로그인 하세요.</p>
              <Input
                name="email"
                placeholder="이메일을 입력해주세요"
                onChange={onChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                onChange={onChange}
              />
              <button
                type="submit"
                className="mt-4 bg-[#2974E5] text-white py-2 rounded"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={handleSignUpClick}
                className="mt-2 py-2 rounded"
              >
                회원가입
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 w-full text-center">
            <h2 className="text-xl font-bold mb-4">회원가입</h2>
            <p>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</p>
            <FormField label="이메일" required>
              <Input
                name="email"
                placeholder="이메일을 입력해 주세요"
                onChange={onChange}
              />
            </FormField>
            <FormField label="이름" required>
              <Input
                name="name"
                placeholder="이름을 입력해 주세요"
                onChange={onChange}
              />
            </FormField>
            <FormField label="비밀번호" required>
              <Input
                name="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                onChange={onChange}
              />
            </FormField>
            <FormField label="비밀번호 확인" required>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                onChange={onChange}
              />
            </FormField>
            <AlertDialog>
              <AlertDialogTrigger
                type="submit"
                className="mt-4 bg-[#2974E5] text-white py-2 rounded"
              >
                회원가입
              </AlertDialogTrigger>
              <AlertDialogContent className="flex flex-col justify-center items-center">
                <AlertDialogHeader className="flex flex-col justify-center items-center pb-4">
                  <AlertDialogTitle className="pb-4">
                    회원가입을 축하드려요
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <Image
                      src="/images/logo.svg"
                      width={100}
                      height={100}
                      alt="logo"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="bg-[#2974E5] border-none text-white"
                    onClick={() => setIsSignUp(false)}
                  >
                    로그인 하기
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </form>
  );
}
