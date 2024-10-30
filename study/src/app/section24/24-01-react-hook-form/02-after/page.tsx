"use client";
import { useForm } from "react-hook-form";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form className="flex flex-col gap-3 w-[300px]">
      작성자 : <input className="border" type="text" {...register("writer")} />
      내용 : <input className="border" type="text" {...register("contents")} />
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => onSubmit()}
      >
        등록하기
      </button>
    </form>
  );
}
