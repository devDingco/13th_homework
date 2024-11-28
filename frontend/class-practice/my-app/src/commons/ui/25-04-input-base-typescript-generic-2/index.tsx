"use client";

import { useFormContext, Path, FieldValues } from "react-hook-form";
import styles from "./styles.module.css";
import { HTMLInputTypeAttribute, useState } from "react";
import { ISchema } from "@/app/section25/25-04-common-components-base-typescript-generic-2/02-after/schema";

interface IInputBaseProps<프롭스의제네릭타입> {
  className?: string;
  type: HTMLInputTypeAttribute;
  keyname: Path<프롭스의제네릭타입>;
}

// 1.뼈대만들기
function InputBase<나의제네릭타입 extends FieldValues>(
  props: IInputBaseProps<나의제네릭타입>
) {
  const { register } = useFormContext<나의제네릭타입>();
  return (
    <input
      type={props.type}
      {...register(props.keyname)}
      className={props.className}
    />
  );
}

// 2. 인풋 찍기
export function InputSoftFull<인풋제네릭타입 extends FieldValues>(
  props: IInputBaseProps<인풋제네릭타입>
) {
  // const [] = useState<인풋제네릭타입>();
  return (
    <InputBase<인풋제네릭타입>
      className={styles.input_soft_s_full}
      {...props}
    />
  );
}
