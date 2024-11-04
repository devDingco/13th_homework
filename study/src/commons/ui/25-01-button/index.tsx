"use client";
import { useFormContext } from "react-hook-form";

export default function MyButton({ children }) {
  const { formState } = useFormContext();
  return (
    <button
      className="bg-black text-white"
      disabled={!formState.isDirty || !formState.isValid}
    >
      {children}
    </button>
  );
}
