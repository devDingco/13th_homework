import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
interface InputFieldProps {
  name: string; // 입력 필드 이름 (React Hook Form에서 사용)
  label: string; // 라벨 텍스트
  type?: string; // input 타입 (text, email, password 등)
  placeholder?: string; // placeholder 텍스트
  required?: boolean; // 필수 입력 여부
  disabled?: boolean; // 비활성화 여부
}

export function InputField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
}: InputFieldProps) {
  // React Hook Form의 메서드들을 가져옴
  const {
    register, // 입력 필드 등록
    formState: { errors }, // 폼 상태 (에러 포함)
  } = useFormContext();

  // errors 객체에서 현재 필드의 에러 메시지 추출
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      {/* 라벨 영역 */}
      <Label htmlFor={name} className="flex gap-1">
        {label}
        {/* 필수 입력인 경우 빨간색 별표 표시 */}
        {required && <span className="text-red-500">*</span>}
      </Label>

      {/* 입력 필드 */}
      <Input
        id={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)} // React Hook Form 필드 등록
        // 에러가 있는 경우 빨간색 테두리 표시
        className={`${errorMessage ? "border-red-500" : ""}`}
      />

      {/* 에러 메시지 표시 영역 */}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
