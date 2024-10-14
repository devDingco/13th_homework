"use client";
import { useForm } from "react-hook-form";

export const useJoinPage = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return { control };
};
