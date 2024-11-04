import { Heart } from "lucide-react";

interface EmpathyButtonProps {
  count: number;
  isEmpathized: boolean;
  onToggle: () => void;
}

export default function EmpathyButton({
  count,
  isEmpathized,
  onToggle,
}: EmpathyButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        isEmpathized
          ? "bg-indigo-100 text-indigo-700"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Heart className={`w-5 h-5 ${isEmpathized ? "fill-current" : ""}`} />
      <span className="font-medium">공감하기</span>
      <span className="text-sm">({count})</span>
    </button>
  );
}
