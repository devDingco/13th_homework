import { zodResolver } from "@hookform/resolvers/zod";
import {
  placeNewSchema,
  type PlaceNewValues,
} from "./../../../schema/placeNew.schema";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

export function usePlaceForm() {
  // 플레이스 내용 글자수
  const [contentsLength, setContentsLength] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null); // form 참조하기(button이 form 밖에 있음)

  const methods = useForm<PlaceNewValues>({
    resolver: zodResolver(placeNewSchema),
    mode: "all", // 모든 입력이 유효성 검사 통과
    defaultValues: {
      name: "",
      contents: "",
    },
  });

  // 글자수
  const onChangeContents = (value: string) => {
    setContentsLength(value.length);
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const onSubmit = (data) => {
    console.log("사용자가 입력한 플레이스 등록 결과:", data);
    // 나중에 여기에 mutation 넣기
  };

  return {
    methods,
    onSubmit,
    contentsLength,
    onChangeContents,
    handleSubmitClick,
    formRef,
  };
}
