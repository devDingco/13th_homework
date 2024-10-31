interface StepButtonsProps {
  step: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function StepButtons({
  step,
  onPrevious,
  onNext,
  onSubmit,
}: StepButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      {step > 1 && (
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          이전
        </button>
      )}
      <button
        type={step === 4 ? "submit" : "button"}
        onClick={step === 4 ? onSubmit : onNext}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {step === 4 ? "가입완료" : "다음"}
      </button>
    </div>
  );
}
