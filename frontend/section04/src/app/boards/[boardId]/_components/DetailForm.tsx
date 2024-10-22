"use client";

import { FETCH_BOARD } from "../../queries";
import DetailFormInfo from "./DetailFormInfo";
import DetailFormContent from "./DetailFormContent";
import DetailFormLike from "./DetailFormLike";
import DetailFormButton from "./DetailFormButton";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

export default function DetailForm() {
  const params = useParams();
  console.log(params);
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  console.log(data);

  return (
    <div className="flex-col py-10 flex gap-5">
      <div className="prose-b_28_36">{data?.fetchBoard?.title}</div>
      <DetailFormInfo value={data?.fetchBoard?.writer} />
      <DetailFormContent value={data?.fetchBoard?.contents} />
      <DetailFormLike />
      <DetailFormButton value={data?.fetchBoard?._id} />
    </div>
  );
}
