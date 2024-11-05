"use client"

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument, FetchBoardsCountDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";

export default function useBoardsList(props:any){
    const router = useRouter();
    const { data, refetch } = useQuery(FetchBoardsDocument);
    const { data:dataBoardsCount } = useQuery(FetchBoardsCountDocument);
    console.log(data);

    // const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);


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
        refetch,
    }
}