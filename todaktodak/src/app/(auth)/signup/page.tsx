"use client";

import { SignupCompleteModal } from "@/components/modals/SignupCompleteModal";
import { AgreementModal } from "@/components/signUp/AgreementModal";
import { StepIndicator } from "@/components/signUp/common/StepIndicator";
import { ImageCropModal } from "@/components/signUp/ImageCropModal";
import { AgreementStep } from "@/components/signUp/steps/AgreementStep";
import { BasicInfoStep } from "@/components/signUp/steps/BasicInfoStep";
import { ProfileStep } from "@/components/signUp/steps/ProfileStep";
import { agreements } from "@/types/agreements";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function SignupPage() {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // 약관 동의
    agreements: new Array(agreements.length).fill(false),
    // 기본 정보
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: {
      zipcode: "",
      address1: "",
      address2: "",
    },
    // 프로필
    profileImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // 모달 상태
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState("");

  const steps = [
    { label: "약관동의", component: AgreementStep },
    { label: "기본정보", component: BasicInfoStep },
    { label: "프로필설정", component: ProfileStep },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 유효성 검사 및 제출 로직

    setShowCompleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* 진행 단계 표시 */}
        <div className="mb-8">
          <div className="relative">
            <div className="flex justify-between mb-2">
              {steps.map((stepItem, index) => (
                <StepIndicator
                  key={index}
                  label={stepItem.label}
                  step={index + 1}
                  currentStep={step}
                />
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <AgreementStep
                agreements={formData.agreements}
                onAgreementChange={(index) => {
                  const newAgreements = [...formData.agreements];
                  newAgreements[index] = !newAgreements[index];
                  setFormData({ ...formData, agreements: newAgreements });
                }}
                onShowDetail={(content) => {
                  setSelectedAgreement(content);
                  setShowAgreementModal(true);
                }}
              />
            )}

            {step === 2 && (
              <BasicInfoStep
                formData={formData}
                errors={errors}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({ ...formData, [name]: value });
                }}
              />
            )}

            {step === 3 && (
              <ProfileStep
                profileImage={formData.profileImage}
                onUpload={() => setShowImageModal(true)}
              />
            )}

            {/* 하단 버튼 */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  이전
                </button>
              )}
              <button
                type={step === 3 ? "submit" : "button"}
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {step === 3 ? "가입완료" : "다음"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 모달 */}
      <AgreementModal
        isOpen={showAgreementModal}
        onClose={() => setShowAgreementModal(false)}
        content={selectedAgreement}
      />

      <ImageCropModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSave={(file) => {
          setFormData({ ...formData, profileImage: file });
          setShowImageModal(false);
        }}
      />
      <SignupCompleteModal
        isOpen={showCompleteModal}
        onClose={() => router.push("/")}
        onLogin={() => router.push("/login")}
      />
    </div>
  );
}
