"use client"


import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "./queries";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export default function useBoardsDetail (){
    const params = useParams();
    const router = useRouter();
    const id = params.boardId.toString();
    
    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId: id },
    });
    console.log("전체 데이터", data);
    console.log("boardId", id);
    console.log("주소",data?.fetchBoard.boardAddress?.address);

    const onClickEdit = () => {
        router.push(`${id}/edit`)
    }

    return{
        data,
        onClickEdit,
    }
}