"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

import {
    CreateBoardCommentDocument,
    FetchBoardCommentsDocument,
} from "../graphql/graphql";

export default function useCommentNew(stars: number) {
    const params = useParams();

    const [commentData, setCommentData] = useState({
        author_ID: "",
        password_ID: "",
        content_ID: "",
    });

    const changeCommentData = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentData({
            ...commentData,
            [e.target.id]: e.target.value,
        });
    };

    const [createComment] = useMutation(CreateBoardCommentDocument);

    const createCommentNew = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const result = await createComment({
                variables: {
                    boardId: String(params.boardId),
                    createBoardCommentInput: {
                        writer: commentData.author_ID,
                        password: commentData.password_ID,
                        contents: commentData.content_ID,
                        rating: stars,
                    },
                },
                refetchQueries: [
                    {
                        query: FetchBoardCommentsDocument,
                        variables: { page: 1, boardId: String(params.boardId) },
                    },
                ],
            });
            if (result) alert("댓글이 등록 되었습니다!");
        } catch {
            alert("댓글 등록 실패!");
        }
    };

    return { changeCommentData, createCommentNew };
}
