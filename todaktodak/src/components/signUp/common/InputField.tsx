import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  onChange,
}: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // errors 객체에서 현재 필드의 에러 메시지
  const errorMessage = errors[name]?.message as string | undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange: registerOnChange } = register(name);
    registerOnChange(event);
    // onChange가 있다면 실행
    onChange?.(event);
  };

  return (
    <div className="space-y-2">
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
        {...register(name)}
        onChange={handleChange}
        className={`${errorMessage ? "border-red-500" : ""}`}
      />

      {/* 에러 메시지 표시 영역 */}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
