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
  return (
    <div
      className={`flex flex-col items-center w-1/4 ${
        currentStep > step ? "text-indigo-600" : "text-gray-400"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
          currentStep > step ? "bg-indigo-600 text-white" : "bg-gray-200"
        }`}
      >
        {step}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
}
