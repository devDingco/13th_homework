"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import BasicInfoStep from "./steps/BasicInfoStep";
import { ProfileStep } from "./steps/ProfileStep";
import { StepIndicator } from "./common/StepIndicator";
import { Button } from "@/components/ui/button";
import { AlertDialog } from "./common/SignupAlertDialog";
import { signupSchema, type SignupFormValues } from "@/schemas/auth.schema";

export const BUCKET_NAME = "todakProfileImage";
export const DEFAULT_PROFILE_IMAGE = `/images/default-profile.png`;
export const STORAGE_URL = `https://storage.googleapis.com/${BUCKET_NAME}`;

// 회원가입의 각 단계를 정의하는 배열
// fields는 각 단계에서 검증해야 할 폼 필드들을 나타냄
const SIGNUP_STEPS = [
  {
    id: 1,
    label: "기본정보",
    Component: BasicInfoStep,
    fields: [
      "name",
      "nickname",
      "email",
      "password",
      "passwordConfirm",
      "addressInput.zoneCode",
      "addressInput.address",
      "addressInput.detailAddress",
    ],
  },
  {
    id: 2,
    label: "프로필설정",
    Component: ProfileStep,
    fields: ["image"],
  },
] as const;

// GraphQL mutation 쿼리 정의
const SIGNUP = gql`
  mutation signup($signUpUser: signUpUser!) {
    signup(signUpUser: $signUpUser)
  }
`;

export default function SignupContainer() {
  // 현재 회원가입 단계를 관리하는 상태 (0: 기본정보, 1: 프로필설정)
  const [currentStep, setCurrentStep] = useState(0);

  // 알림창(Alert) 상태 관리
  const [alertState, setAlertState] = useState<{
    open: boolean;
    title: string;
    description: string;
    error?: boolean;
  }>({
    open: false,
    title: "",
    description: "",
  });

  // Next.js 라우터
  const router = useRouter();

  // GraphQL mutation 훅
  const [signup] = useMutation(SIGNUP);

  // React Hook Form 설정
  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema), // zod를 사용한 유효성 검사
    mode: "onBlur", // 필드에서 포커스가 벗어날 때 유효성 검사
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      addressInput: {
        zoneCode: "",
        address: "",
        detailAddress: "",
      },
      image: null,
    },
  });

  // 현재 단계 관련 정보 계산
  const currentStepData = SIGNUP_STEPS[currentStep];
  const isLastStep = currentStep === SIGNUP_STEPS.length - 1;
  const progress = (currentStep / (SIGNUP_STEPS.length - 1)) * 100;

  // 다음 단계로 이동하는 함수
  const handleNext = async () => {
    // 현재 단계의 필드들에 대한 유효성 검사 실행
    const isValid = await methods.trigger(currentStepData.fields);

    if (isValid) {
      // 유효성 검사 통과 시 현재 데이터 로깅
      const currentFormData = methods.getValues();
      console.log("현재 스텝 데이터:", {
        step: currentStepData.label,
        formData: currentFormData,
      });

      // 다음 단계로 이동
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전 단계로 이동하는 함수
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // 알림창 닫기 처리
  const handleAlertClose = () => {
    setAlertState((prev) => ({ ...prev, open: false }));

    // 회원가입 성공 시 로그인 페이지로 이동
    if (!alertState.error) {
      router.push("/login");
    }
  };

  // 폼 제출 처리
  const onSubmit = async (data: SignupFormValues) => {
    if (!isLastStep) {
      handleNext();
      return;
    }

    try {
      // passwordConfirm 제외하고 나머지 데이터 사용(passwordConfirm는 안보내니까)
      const { passwordConfirm, ...signupData } = data;
      console.log("제외 전송하는 비번확인: ", passwordConfirm);
      console.log("전송할 데이터: ", signupData);

      // 회원가입 mutation 실행
      const result = await signup({
        variables: {
          signUpUser: {
            ...signupData,
            // image는 이미 Base64 문자열이거나 기본 이미지 경로
            // 주소는 zoneCode가 int!!!!!!!!
            addressInput: {
              ...signupData.addressInput,
              zoneCode: Number(signupData.addressInput.zoneCode), // 변환해주기
              address: signupData.addressInput.address,
              detailAddress: signupData.addressInput.detailAddress,
            },
          },
        },
      });

      console.log("회원가입 성공:", result.data);

      setAlertState({
        open: true,
        title: "회원가입 성공",
        description: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
        error: false,
      });
    } catch (error) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.originalError?.message?.message ||
        "회원가입 처리 중 오류가 발생했습니다.";

      setAlertState({
        open: true,
        title: "오류 발생",
        description: errorMessage,
        error: true,
      });
    }
  };

  // 현재 단계의 컴포넌트
  const StepComponent = currentStepData.Component;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* 진행 단계 표시 영역 */}
          <div className="mb-8">
            <div className="relative">
              {/* 단계 인디케이터 */}
              <div className="flex justify-around mb-2">
                {SIGNUP_STEPS.map((step) => (
                  <StepIndicator
                    key={step.id}
                    label={step.label}
                    step={step.id}
                    currentStep={currentStepData.id}
                  />
                ))}
              </div>
              {/* 진행 상태 바 */}
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* 폼 영역 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* 현재 단계의 컴포넌트 렌더링 */}
              <StepComponent />

              {/* 이전/다음 버튼 */}
              <div className="flex justify-between pt-4">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={handlePrev}>
                    이전
                  </Button>
                )}

                <Button
                  type="submit"
                  className={currentStep === 0 ? "ml-auto" : ""}
                >
                  {isLastStep ? "가입완료" : "다음"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* 알림 다이얼로그 */}
        <AlertDialog
          open={alertState.open}
          onClose={handleAlertClose}
          title={alertState.title}
          description={alertState.description}
        />
      </div>
    </FormProvider>
  );
}
