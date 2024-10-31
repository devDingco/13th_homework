"use client";

import { useFormContext } from "react-hook-form";

export default function MyInput(props) {
  const { register, formState } = useFormContext();
  const { title, type, keyname } = props;

  return (
    <div className="grid grid-cols-[2fr_8fr]">
      <span>{title}</span>
      <input className="border" type={type} {...register(keyname)} />

      {formState.errors && (
        <div className="text-red-600">
          {formState.errors.message?.toString()}
        </div>
      )}
    </div>
  );
}
