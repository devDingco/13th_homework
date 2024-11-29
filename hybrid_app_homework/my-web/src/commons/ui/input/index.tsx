"use client";

import { useFormContext } from "react-hook-form";

interface IInputProps {
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  title?: string;
  type: string;
  keyname: string;
  isError?: boolean;
  hidden?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Input({
  className,
  placeholder,
  readOnly,
  title,
  type,
  keyname,
  isError = false,
  hidden = false,
  onChange,
  required,
}: IInputProps) {
  const { register, formState } = useFormContext();

  return (
    <label className="flex flex-col gap-2">
      {title && (
        <div className="flex items-start">
          <span className="font-semibold text-xs leading-[1.25rem]">
            {title}
          </span>
          {required && <span className="text-red-600 leading-none">*</span>}
        </div>
      )}
      <input
        className={`h-11 font-medium rounded-lg border border-gray-200 px-4 placeholder:text-gray-400 ${
          className || ""
        }`}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        hidden={hidden}
        {...register(keyname, {
          onChange: () => onChange && onChange,
          required: required,
        })}
      />

      {isError && formState.errors && (
        <div className="text-red-600">
          {formState.errors.message?.toString()}
        </div>
      )}
    </label>
  );
}
