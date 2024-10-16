"use client"

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";

export default function useBoardsList(){
    const { data } = useQuery(FetchBoardsDocument);
    console.log(data);
    const router = useRouter();

    const [deleteBoard] = useMutation(DeleteBoardDocument)

    const onClickDetail = (id:string) => {
        // event.stopPropagation();
        console.log('id', id) // id를 잘 받아오는지 
        router.push(`/boards/${id}`)
    }

    const onClickDelete = async (id: string) => {
        try{
            const response = await deleteBoard({
                variables: {boardId: id},
                refetchQueries: [{ query: FetchBoardsDocument}],
            });
            console.log("성공", response.data?.deleteBoard);
        }catch(err){
            console.error(err)
        }

    };

    return{
        data,
        onClickDelete,
        onClickDetail,
    }
}