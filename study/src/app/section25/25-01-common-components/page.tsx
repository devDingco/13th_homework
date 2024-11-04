"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, IMyCreateType } from "./schema";
import MyInput from "@/commons/ui/25-01-input";
import MyButton from "@/commons/ui/25-01-button";

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
        <div>
          <MyInput title="작성자" keyname="writer" type="text" />
        </div>

        <div>
          <MyInput title="제목" keyname="title" type="text" />
        </div>

        <div>
          <MyInput title="내용" keyname="contents" type="text" />
        </div>

        <MyButton>전송</MyButton>
      </form>
    </FormProvider>
  );
}
