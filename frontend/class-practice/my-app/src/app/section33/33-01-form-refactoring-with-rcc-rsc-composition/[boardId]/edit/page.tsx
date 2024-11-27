// "use client"; => 서버컨포넌트
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Zod와 react-hook-form 연결

import { ButtonSoftFull } from "@/commons/ui/25-05-button-base-typescript-generic-npm-publish";
import { InputSoftFull } from "@/commons/ui/25-05-input-base-typescript-generic-npm-publish";
import Form from "@/commons/ui/33-01-form-refactoring-with-rcc-rsc-composition";
import { useInitialize } from "./form.initialize";
import { ISchema, schema } from "./form.schema";

export default function GrapgqlMutationPage() {
  return (
    <Form<ISchema> schema={schema} useInitialize={useInitialize}>
      제목(컴포넌트): <InputSoftFull<ISchema> type="text" keyname="title" />
      내용(컴포넌트):
      <InputSoftFull<ISchema> type="text" keyname="contents" />
      <ButtonSoftFull<ISchema>>제출하기</ButtonSoftFull>
    </Form>
  );
}
