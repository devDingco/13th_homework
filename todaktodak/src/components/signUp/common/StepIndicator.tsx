interface StepIndicatorProps {
  label: string;
  step: number;
  currentStep: number;
}

export function StepIndicator({
  label,
  step,
  currentStep,
}: StepIndicatorProps) {
  // 현재 단계이거나 이전 단계인 경우 활성화
  const isActive = currentStep >= step;

  return (
    <div
      className={`flex flex-col items-center w-1/4 ${
        isActive ? "text-indigo-600" : "text-gray-400"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
          isActive ? "bg-indigo-600 text-white" : "bg-gray-200"
        }`}
      >
        {step}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
