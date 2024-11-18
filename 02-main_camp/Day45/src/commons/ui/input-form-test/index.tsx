import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import classNames from "classnames";

interface IInputFormBaseProps<T extends FieldValues> {
  type: HTMLInputTypeAttribute;
  keyName: Path<T>;
  className: string;
  placeholder: string;
}

export default function InputFormBase<T extends FieldValues>({
  type,
  keyName,
  className,
  placeholder,
}: IInputFormBaseProps<T>) {
  const { register } = useFormContext();

  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      {...register(keyName)}
    />
  );
}
