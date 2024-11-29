import type { PlaceNewValues } from "@/schema/placeNew.schema";
import { useFormContext } from "react-hook-form";

interface IInputProps {
  placeholder: string;
  name: keyof PlaceNewValues;
  className?: string;
}

export default function Input({ placeholder, className, name }: IInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PlaceNewValues>();

  return (
    <div>
      <input
        className={`h-44 w-full py-12 px-16 rounded-lg border border-[#d4d3d3]  ${className}`}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">{errors[name]?.message}</p>
      )}
    </div>
  );
}
