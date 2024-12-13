"use client";

import styles from "./styles.module.css";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { ZodSchema } from "zod";

interface IForm<T extends FieldValues> {
  children: ReactNode;
  schema: ZodSchema<T>;
  useInitialize: (methods: UseFormReturn<T>) => {
    onSubmit: (data: T) => Promise<void>;
  };
}

export default function Form<T extends FieldValues>({
  children,
  schema,
  useInitialize,
}: IForm<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { onSubmit } = useInitialize(methods);

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
