import { FETCH_SOLPLACE_LOG } from "./../../../apis/graphql/queries/fetch-solplace-log.query";
import { useMutation, useQuery } from "@apollo/client";
import { placeNewSchema, type PlaceNewValues } from "@/schema/placeNew.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { UPDATE_SOLPLACE_LOG } from "@/common/apis/graphql/mutations/update-solplace-log.mutation";
import { useRouter } from "next/navigation";

export default function usePlaceEditForm() {
  const router = useRouter(); //페이지 이동
  const params = useParams();
  const id = params.solplaceLogId.toString();
  // 수정페이지에서 데이터 불러오기
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id },
  });

  const [updateSolplaceLog] = useMutation(UPDATE_SOLPLACE_LOG);

  // 플레이스 내용 글자수
  const [contentsLength, setContentsLength] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null); // form 참조하기(button이 form 밖에 있음)
  const methods = useForm<PlaceNewValues>({
    resolver: zodResolver(placeNewSchema),
    mode: "all", // 모든 입력이 유효성 검사 통과
  });

  useEffect(() => {
    if (data?.fetchSolplaceLog) {
      console.log("수정페이지 데이터:", data);
      methods.setValue("title", data.fetchSolplaceLog.title);
      methods.setValue("contents", data.fetchSolplaceLog.contents);
      methods.setValue("images", data.fetchSolplaceLog.images);
    }
  }, [data]);

  // 글자수
  const onChangeContents = (value: string) => {
    setContentsLength(value.length);
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const onSubmit = async (data: PlaceNewValues) => {
    console.log("사용자가 수정한 결과:", data);
    // 나중에 여기에 mutation 넣기
    try {
      const result = await updateSolplaceLog({
        variables: {
          id,
          updateSolplaceLogInput: {
            ...data,
          },
        },
      });
      console.log("수정 성공:", result);
      router.push(`/solplace-logs/${result.data.updateSolplaceLog.id}`);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return {
    methods,
    onSubmit,
    contentsLength,
    onChangeContents,
    handleSubmitClick,
    formRef,
    data,
  };
}
