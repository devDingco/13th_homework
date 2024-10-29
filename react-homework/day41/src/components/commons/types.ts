import { ChangeEvent, ReactNode } from "react";

// input props 타입 정의
export interface IInputGroupProps {
  label: string;
  type?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  defaultValue?: string;
  error?: string;

  isRequired?: boolean;
  isDisabled?: boolean;
}

export interface IFieldWrapperProps {
  children: ReactNode;
  label?: string;
  isRequired?: boolean;
}

export interface IInputFieldProps {
  as?: "input" | "textarea";
  type?: string;
  value?: string;
  name?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // 수정된 부분
  placeholder?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export interface IErrorMessageProps {
  errorMessage?: string;
}

// 버튼 컴포넌트 props
export interface IButton {
  children: ReactNode;
  onClick?: () => void;
  variant?: string;
  disabled?: boolean;
}
