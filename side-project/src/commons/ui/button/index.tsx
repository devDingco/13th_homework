'use client';

import { Button } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface IButtonType {
  size?: 'small' | 'middle' | 'large';
  type?: 'primary' | 'dashed' | 'default' | 'text' | 'link';
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  shape?: 'default' | 'circle' | 'round';
  onClick?: MouseEventHandler<HTMLElement>;
  isDisabled?: boolean;
}

function ButtonBase({
  size,
  type,
  className,
  htmlType,
  children,
  shape,
  isDisabled = false,
  onClick,
}: IButtonType) {
  // const { formState } = useFormContext();
  const formContext = useFormContext();
  const isFormValid = formContext ? formContext.formState.isValid : true;
  return (
    <Button
      disabled={isDisabled ? !isFormValid : false}
      className={className}
      htmlType={htmlType}
      size={size}
      type={type}
      shape={shape}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function ButtonDefaultRounded(props: IButtonType) {
  return (
    <ButtonBase
      {...props}
      size="large"
      type="primary"
      className="py-3"
      htmlType="submit"
      isDisabled
    />
  );
}

export function ButtonSoftLink(props: IButtonType) {
  return (
    <ButtonBase
      {...props}
      size="large"
      className="py-3 text-blue-600 bg-white"
      htmlType="button"
      type="link"
    />
  );
}
