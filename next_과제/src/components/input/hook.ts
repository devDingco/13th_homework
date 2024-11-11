"use client";

import { formRegister } from "./contants";
import { useFormContext } from "react-hook-form";

export const useInput = () => {
  const { formState, control } = useFormContext();

  return { formRegister, formState, control };
};
