import React, { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string; //작성했던 값
  disabled?: boolean;
  value?: string | number;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  onChange,
  placeholder,
  className,
  required,
  defaultValue,
  disabled,
  value,
}) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
      value={value}
    />
  );
};

export default Input;
