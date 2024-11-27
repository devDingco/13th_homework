"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function IsSubmittingPage() {
  // react-hook-form 에 이미 있는 기능임
  // const {formState} = useForm
  // formState.isSubmitting

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onClickSubmit = async () => {
    setIsSubmitting(true);

    const result = await fetch("https://koreanjson.com/posts/1");
    const data = await result.json();
    console.log(data);

    setIsSubmitting(false);
  };

  return (
    <button onClick={onClickSubmit} disabled={isSubmitting}>
      게시글 등록하기
    </button>
  );
}
