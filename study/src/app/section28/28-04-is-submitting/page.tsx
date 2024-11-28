"use client";

import { Button } from "antd";
import { useState } from "react";
// import { useForm } from "react-hook-form";

//!! 여러번 클릭시 여러번 요청이 되는것을 방지하기 위해 isSubmitting을 사용한다.
export default function Page() {
  const { formState } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickSubmit = async () => {
    setIsSubmitting(true);

    const result = await fetch("https://koreanjson.com/posts/1");
    const data = await result.json();
    console.log(data);

    setIsSubmitting(false);
  };

  return (
    <>
      <Button onClick={() => onClickSubmit()} disabled={formState.isSubmitting}>
        게시글 등록하기
      </Button>
    </>
  );
}
