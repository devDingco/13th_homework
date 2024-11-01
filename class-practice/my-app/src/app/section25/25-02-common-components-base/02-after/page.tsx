"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Zod와 react-hook-form 연결
import { ISchema, schema } from "./schema";
import { ButtonSoftFull } from "@/commons/ui/25-02-button-base";
import { InputSoftFull } from "@/commons/ui/25-02-input-base";

export default function MyForm() {
  // useForm 초기화 및 zod schema 설정
  const methods = useForm<ISchema>({
    resolver: zodResolver(schema), // zod 스키마 연결
    mode: "onChange", // 유효성 검사 모드 설정
  });

  const onSubmit = (data: ISchema) => {
    console.log(data); // 제출 시 데이터 출력
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* 작성자: <MyInput type="text" keyname="writer" />
        <div style={{ color: "red" }}>
          {methods.formState.errors.writer?.message}
        </div> */}
        제목: <InputSoftFull type="text" keyname="title" />
        <div style={{ color: "red" }}>
          {methods.formState.errors.title?.message}
        </div>
        내용: <InputSoftFull type="text" keyname="contents" />
        <div style={{ color: "red" }}>
          {methods.formState.errors.contents?.message}
        </div>
        <ButtonSoftFull>제출하기</ButtonSoftFull>
      </form>
    </FormProvider>
  );
}
