"use client";
import { useForm } from "react-hook-form";

export const useLoginPage = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return { control };
};
