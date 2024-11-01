'use client';
import { Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

interface IInputType {
  keyname: string;
  type: string;
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
}

function InputBase({ keyname, type, placeholder, size }: IInputType) {
  const { control } = useFormContext();
  return (
    <Controller
      name={keyname}
      control={control}
      render={({ field }) => (
        <Input {...field} placeholder={placeholder} size={size} type={type} />
      )}
    />
  );
}

export function InputRoundedLarge(props: IInputType) {
  return <InputBase {...props} size="large" />;
}

// Password 전용 컴포넌트
interface IInputPasswordType {
  keyname: string;
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
  visibilityToggle?: {
    visible: boolean;
    onVisibleChange: (visible: boolean) => void;
  };
}

export function InputPassword({
  keyname,
  placeholder,
  size,
  visibilityToggle,
}: IInputPasswordType) {
  const { control } = useFormContext();
  return (
    <Controller
      name={keyname}
      control={control}
      render={({ field }) => (
        <Input.Password
          {...field}
          placeholder={placeholder}
          size={size}
          visibilityToggle={visibilityToggle}
        />
      )}
    />
  );
}
