"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { MouseEvent } from "react";

export default function useBoardsList() {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  //   console.log(data);

  const handlerOnclickList = (id) => {
    router.push(`/boards/${id}`);
    // router.push(`/boards/${data?.fetchBoards._id}`);

    /**게시글을 클릭했을 때 _id가 undefined로 넘어가는 이유는
     * handleOnclickList 함수에서 data?.fetchBoards._id를 사용하고 있기 때문이야.
     * 이 경우 data?.fetchBoards는 배열이므로, 배열 자체에는 _id 속성이 없어.
     * 즉, 배열 안에 있는 각각의 게시글(el)이 _id 값을 가지고 있어.*/
  };

  // 게시물목록삭제기능
  const handlerDeleteList = (e: MouseEvent<HTMLImageElement>, id) => {
    e.stopPropagation(); // 이벤트버블링 막기
    deleteBoard({
      variables: {
        mydelete: id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
    alert("삭제함");
  };

  return {
    handlerOnclickList,
    handlerDeleteList,
  };
}
