"use client";

import { useFormState } from "react-dom";
import onSubmit from "./actions";

export default function RscWithFormExamplePage() {
  const [state, 게시글등록] = useFormState(onSubmit);

  console.log(state); // 서버에서 실행되고 브라우저 결과 받기

  return (
    <form action={게시글등록} className="flex flex-col gap-2 w-[300px]">
      <label htmlFor="title">
        제목 : <input className="border" type="text" name="title" />
      </label>
      <label htmlFor="contents">
        내용 : <input className="border" type="text" name="contents" />
      </label>
      <button className="bg-black text-white">등록하기</button>
    </form>
  );
}
