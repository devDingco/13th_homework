'use client';
import { FieldValues, useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface FormInputProps<T extends FieldValues> {
  name: keyof T;
  label?: string;
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
}: FormInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

export function FormTextArea<T extends FieldValues>({
  name,
  label,
  placeholder,
}: FormInputProps<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
