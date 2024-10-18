"use client"


import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "./queries";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export default function useBoardsDetail (){
    const params = useParams();
    const router = useRouter();
    // const id = params.boardId.toString(); // 갑자기 타입에러
    const id = params.boardId;
    // console.log(id);
    
    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId: id },
    });
    console.log(data);

    const onClickEdit = () => {
        router.push(`${id}/edit`)
    }

    return{
        data,
        onClickEdit,
    }
}