"use client";

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function useBoardCommentList(){
    const params = useParams ();
    const id = params.boardId.toString();
    const { data } = useQuery(FetchBoardCommentsDocument, {
      variables: { page: 1, boardId: id },
    });
  
    return { data };
}