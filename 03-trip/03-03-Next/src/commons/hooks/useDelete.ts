"use client";
import {
    DeleteBoardDocument,
    FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";

export default function useDelete() {
    const [deleteBoard] = useMutation(DeleteBoardDocument, {
        // variables: {boardId: }
    });

    const onClickDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        const target = e.target as HTMLButtonElement;
        deleteBoard({
            variables: {
                boardId: target.id,
            },
            refetchQueries: [
                { query: FetchBoardsDocument, variables: { number: 1 } },
            ],
        });
        alert("삭제완료!!");
    };

    return onClickDelete;
}
