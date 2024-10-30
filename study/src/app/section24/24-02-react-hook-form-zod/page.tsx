"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

export default function Page() {
  const {
    register,
    handleSubmit,

    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form className="flex flex-col gap-2 w-[300px]">
      <div>
        <div className="grid grid-cols-[2fr_8fr]">
          <span>작성자</span>{" "}
          <input className="border" type="text" {...register("writer")} />
        </div>

        {errors.writer && (
          <div className="text-red-600">
            {errors.writer.message?.toString()}
          </div>
        )}
      </div>

      <div>
        <div className="grid grid-cols-[2fr_8fr]">
          제목 <input className="border" type="text" {...register("title")} />
        </div>
        {errors.title && (
          <div className="text-red-600">{errors.title.message?.toString()}</div>
        )}
      </div>
      <div>
        <div className="grid grid-cols-[2fr_8fr]">
          내용{" "}
          <input className="border" type="text" {...register("contents")} />
        </div>
        {errors.contents && (
          <div className="text-red-600">
            {errors.contents.message?.toString()}
          </div>
        )}
      </div>
      {/* 취미 : <Input type="text" {...register("hobby")} />
      비밀번호 : <Input type="password" {...register("password")} />
      전화번호 : <Input type="text" {...register("phone")} /> */}
      <button
        className="btn btn-primary text-white"
        type="button"
        onClick={() => onSubmit()}
        disabled={!isDirty || !isValid}
      >
        등록하기
      </button>
    </form>
  );
}
