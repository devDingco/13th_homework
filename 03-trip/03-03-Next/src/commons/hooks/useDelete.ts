"use client";

import { useMutation } from "@apollo/client";

import {
    DeleteBoardDocument,
    FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import withSweetAlert from "../library/withSweetAlert";

export default function useDelete() {
    const { plainAlert } = withSweetAlert();

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
        plainAlert("삭제완료!!", "success");
    };

    return onClickDelete;
}
