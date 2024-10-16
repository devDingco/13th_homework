import React, { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  defaultValue: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  onChange,
  placeholder,
  className,
  required,
  defaultValue,
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
    />
  );
};

export default Input;
