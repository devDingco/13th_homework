'use client';
import { Input } from 'antd';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface IInputType<V> {
  keyname: Path<V>;
  type: string;
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
}

function InputBase<T extends FieldValues>({
  keyname,
  type,
  placeholder,
  size,
}: IInputType<T>) {
  const { control } = useFormContext<T>();
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

export function InputRoundedLarge<U extends FieldValues>(props: IInputType<U>) {
  return <InputBase<U> {...props} size="large" />;
}

// Password 전용 컴포넌트
interface IInputPasswordType<V> {
  keyname: Path<V>;
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
  visibilityToggle?: {
    visible: boolean;
    onVisibleChange: (visible: boolean) => void;
  };
}

export function InputPassword<T extends FieldValues>({
  keyname,
  placeholder,
  size,
  visibilityToggle,
}: IInputPasswordType<T>) {
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
