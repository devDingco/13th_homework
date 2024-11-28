import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { writeFormSchema } from '@/schemas/writeFormSchema';

export default function useWriteForm() {
  const methods = useForm({
    resolver: zodResolver(writeFormSchema),
    mode: 'onChange',
  });

  return { methods };
}
