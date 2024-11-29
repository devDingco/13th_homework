'use client';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

interface FormButtonProps {
  label: string;
  className?: string;
}

export function FormButton({ label, className }: FormButtonProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={!formState.isValid}
      className={`
        ${className}
        ${
          formState.isValid
            ? 'bg-blue-700 text-white font-bold'
            : 'bg-gray-300 text-gray-500'
        }
      `}
    >
      {label}
    </Button>
  );
}
