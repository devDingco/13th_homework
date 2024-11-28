"use server"; // 서버에서만 실행될 컴포넌트를 지정하는 명령어입니다. RSC와 마찬가지로, 서버 전용 코드를 클라이언트로 보내지 않도록 하는데 유용하며, 서버에서만 실행되고 클라이언트에서 하이드레이션되지 않습니다.

import { z } from "zod";
const schema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
});

export default async function onSubmit(prevState, formData) {
  // 여기는 NEXT 서버에서만 실행됩니다. 브라우저에서 실행되지 않습니다.
  console.log("폼데이터", formData);

  const title = formData.get("title");
  const contents = formData.get("contents");

  const schemaResult = schema.safeParse({ title, contents }); // zod 스키마를 이용한 데이터 검증
  console.log("🚀 ~ onSubmit ~ schemaResult:", schemaResult);

  if (schemaResult.success) {
    // 등록하기 await 등록
  } else {
    // 에러 처리
    return {
      error: schemaResult.error.flatten().fieldErrors,
    };
  }
}
