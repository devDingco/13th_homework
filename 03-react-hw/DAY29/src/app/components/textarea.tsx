import { ChangeEvent } from "react";

interface ITextareaProps {
  name: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
}

export default function Textarea({
  name,
  onChange,
  placeholder,
  required,
  defaultValue,
  disabled,
  className,
  value,
}: ITextareaProps) {
  return (
    <textarea
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
      className={className}
      value={value}
    />
  );
}
