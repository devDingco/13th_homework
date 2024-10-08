import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "./queries";
import { useQuery } from "@apollo/client";
import { FetchBoardQuery, FetchBoardQueryVariables } from '@/commons/graphql/graphql'; // codegen으로 생성된 타입을 import

export const useBoardsDetail = () => {
  
    const params = useParams();
    const router = useRouter();
  
    // params 값 콘솔에 찍기
    console.log("Params:", params);
    
    const { data, loading, error } = useQuery<FetchBoardQuery>(FETCH_BOARD, {
      variables: {
        boardId: params.boardId as string, // boardId를 string으로 캐스팅
      }
    });

    const listButton = () => {
      router.push("/boards");
    };
  
    const editButton = () => {
      router.push(`/boards/${params.boardId}/edit`);
    };
    
    // data, loading, error도 반환하여 컴포넌트에서 사용할 수 있도록 함
    return {
      data,
      loading,
      error,
      listButton,   // 목록 버튼 핸들러
      editButton    // 수정 버튼 핸들러
    };
};
