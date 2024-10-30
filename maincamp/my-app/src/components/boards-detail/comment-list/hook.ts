"use client";

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useBoardCommentList(){
    const params = useParams ();
    const [star, setStar] = useState(0);
    const id = params.boardId.toString();
    const { data } = useQuery(FetchBoardCommentsDocument, {
      variables: { page: 1, boardId: id },
    });
    const onChangeStar = (event: number) => {
      setStar(event);
  }
  
    return { data, onChangeStar };
}