"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, IMyCreateType } from "./schema";
import { InputSoftMM } from "@/commons/ui/25-02-input-base";
import { ButtonSoftMFull } from "@/commons/ui/25-02-button-base";

// 1. baseComponents
// 조건: 뼈대가 같다 (html 구조)
// 기능, 스타일이 다르다

export default function Page() {
  const methods = useForm<IMyCreateType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: IMyCreateType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2 w-[300px]"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <InputSoftMM title="작성자" keyname="writer" type="text" />

        <InputSoftMM title="제목" keyname="title" type="text" />

        <InputSoftMM title="내용" keyname="contents" type="text" />

        <ButtonSoftMFull>전송</ButtonSoftMFull>
      </form>
    </FormProvider>
  );
}
