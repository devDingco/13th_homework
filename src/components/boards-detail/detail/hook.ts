"use client";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD } from "components/boards-write/queries";
import { useRouter } from "next/navigation";
import { FetchBoardDocument } from "commons/graphql/graphql";

export const useBoardDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.boardId.toString();
  // 보여줄 board 정보 받아오기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: id },
  });
  //수정하기 페이지로 이동
  const goToEditPage = () => {
    router.push(`${id}/edit`);
  };

  return {
    data,
    goToEditPage,
  };
};
