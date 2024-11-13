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
import { undefined } from "zod";

// 회원가입의 각 단계
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
      "address.zoneCode",
      "address.address",
      "address.detailAddress",
    ],
  },
  {
    id: 2,
    label: "프로필설정",
    Component: ProfileStep,
    fields: [],
  },
] as const;

const SIGNUP = gql`
  mutation signup($signUpUserInput: SignUpUserInput!, $file: Upload) {
    signup(signUpUserInput: $signUpUserInput, file: $file)
  }
`;

export default function SignupContainer() {
  // 현재 회원가입 단계(0: 기본정보, 1: 프로필설정)
  const [currentStep, setCurrentStep] = useState(0);

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

  const router = useRouter();

  const [signup] = useMutation(SIGNUP);

  // React Hook Form 설정
  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", // 필드에서 포커스가 벗어날 때 유효성 검사
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: {
        zoneCode: "",
        address: "",
        detailAddress: "",
      },
      image: null,
    },
  });

  const currentStepData = SIGNUP_STEPS[currentStep];
  const isLastStep = currentStep === SIGNUP_STEPS.length - 1;
  // currentStep이 0일 때 50%, 1일 때 100%
  const progress = ((currentStep + 1) / SIGNUP_STEPS.length) * 100;

  // 다음
  const handleNext = async () => {
    // 유효성 검사
    const isValid = await methods.trigger(currentStepData.fields);

    if (isValid) {
      const currentFormData = methods.getValues();
      console.log("현재 스텝 데이터:", {
        step: currentStepData.label,
        formData: currentFormData,
      });

      // 다음 단계로 이동
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAlertClose = () => {
    setAlertState((prev) => ({ ...prev, open: false }));

    // 회원가입 성공 시 로그인 페이지로 이동
    if (!alertState.error) {
      router.push("/login");
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    if (!isLastStep) {
      handleNext();
      return;
    }

    try {
      // passwordConfirm 제외하고 나머지 데이터 사용(passwordConfirm는 안보내니까)
      const { passwordConfirm, image, ...signupData } = data;

      console.log("image: ", image);

      // 이미지 파일 처리
      let fileToUpload;
      if (image instanceof File) {
        // 사용자가 이미지를 선택한 경우
        fileToUpload = image;
      } else {
        // 이미지를 선택하지 않은 경우 기본 이미지 파일로 변환
        const response = await fetch("/images/defaultProfile.png");
        const blob = await response.blob();
        fileToUpload = new File([blob], "defaultProfile.png", {
          type: "image/png",
        });
      }

      console.log("제외 전송하는 비번확인: ", passwordConfirm);
      console.log("전송할 데이터: ", signupData);

      // 주소 데이터 처리
      const addressData = signupData.address?.zoneCode
        ? {
            zoneCode: Number(signupData.address?.zoneCode),
            address: signupData.address?.address || "",
            detailAddress: signupData.address?.detailAddress || "",
          }
        : undefined; // 주소를 입력하지 않은 경우 undefined로 처리

      // 회원가입 mutation 변수
      const variables = {
        signUpUserInput: {
          ...signupData,
          address: addressData,
        },
        file: fileToUpload, // 항상 File 객체 보냄
      };

      console.log("전송할 데이터:", variables);

      // 회원가입 mutation 실행
      const result = await signup({
        variables: variables,
      });
      // 성공 여부 확인
      if (result.data?.signup) {
        setAlertState({
          open: true,
          title: "회원가입 성공",
          description: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
          error: false,
        });
      } else {
        throw new Error("회원가입 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);

      // GraphQL 에러 메시지
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.originalError?.message?.message ||
        error.message ||
        "회원가입 처리 중 오류가 발생했습니다.";

      setAlertState({
        open: true,
        title: "오류 발생",
        description: Array.isArray(errorMessage)
          ? errorMessage.join("\n")
          : errorMessage,
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
                  className={
                    currentStep === 0 ? "ml-auto hover:bg-indigo-600" : ""
                  }
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
