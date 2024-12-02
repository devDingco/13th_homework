import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { placeNewSchema, type PlaceNewValues } from "@/schema/placeNew.schema";
import { useMutation } from "@apollo/client";
import { CREATE_SOLPLACE_LOG_INPUT } from "@/common/apis/graphql/mutations/create-solplace-log.mutation";
import { useRouter } from "next/navigation";

export function usePlaceForm() {
  const router = useRouter(); //페이지 이동
  const [createSolplaceLog] = useMutation(CREATE_SOLPLACE_LOG_INPUT); //게시글 등록

  // 플레이스 내용 글자수
  const [contentsLength, setContentsLength] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null); // form 참조하기(button이 form 밖에 있음)

  const methods = useForm<PlaceNewValues>({
    resolver: zodResolver(placeNewSchema),
    mode: "all", // 유효성 검사
  });

  // 글자수
  const onChangeContents = (value: string) => {
    setContentsLength(value.length);
  };

  // form 밖에 있는 button과 연결
  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // 게시글 등록하기
  const onSubmit = async (data) => {
    console.log("register(react-hook-form)결과:", data);

    try {
      const result = await createSolplaceLog({
        variables: {
          createSolplaceLogInput: {
            title: data.title,
            contents: data.contents,
            images: data.images,
            address: data.address,
            lat: data.lat,
            lng: data.lng,
          },
        },
      });
      console.log("전송된 게시글: ", result);
      router.push(`/solplace-logs/${result.data.createSolplaceLog.id}`);
    } catch (error) {
      console.log("게시글 등록 실패", error);
      alert("게시글 등록 실패");
    }
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
