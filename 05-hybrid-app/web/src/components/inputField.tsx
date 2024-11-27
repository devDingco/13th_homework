import type { ReactNode } from "react";

interface IINputFieldProps {
  name: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export default function InputField({
  name,
  required,
  className,
  children,
}: IINputFieldProps) {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex gap-4">
        <label className="text-[#333333] text-xs font-semibold leading-tight">
          {name}
        </label>
        {required && (
          <span className="text-[#f66a6a] text-xs font-semibold leading-none">
            *
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
