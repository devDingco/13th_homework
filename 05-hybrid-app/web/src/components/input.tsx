interface IInputProps {
  placeholder: string;
  className?: string;
}

export default function Input({ placeholder, className }: IInputProps) {
  return (
    <input
      className={`h-44 w-full py-12 px-16 rounded-lg border border-[#d4d3d3]  ${className}`}
      placeholder={placeholder}
    />
  );
}
