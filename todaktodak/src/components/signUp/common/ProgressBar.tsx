interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  const progress = ((step - 1) / 3) * 100;

  return (
    <div className="h-2 bg-gray-200 rounded-full">
      <div
        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
