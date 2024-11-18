"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form<F extends FieldValues>({
  children,
  schema,
  useInitialize,
}) {
  const methods = useForm<F>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { onSubmit } = useInitialize(methods);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
