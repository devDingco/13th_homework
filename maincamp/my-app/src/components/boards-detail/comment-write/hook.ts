"use client"

import { CreateBoardCommentDocument, FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

export default function useBoardCommentWrite(){

    // const [value, setValue] = useState(3);

    const [createComment] = useMutation(CreateBoardCommentDocument)
    const [commentWriter, setCommentWriter] = useState("");
    const [commentPassword, setCommentPassword] = useState("");
    const [commentContent, setCommentContent] = useState("");

    const params = useParams();
    const id = params.boardId

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentWriter(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentPassword(event.target.value);
    };

    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(event.target.value);
    };

    const CreateBoardComment = async () => {
        try{
            const {data} = await createComment({
                variables: {
                    createBoardCommentInput:{
                        writer: commentWriter,
                        password: commentPassword,
                        contents: commentContent,
                        rating: 0,
                    },
                    boardId: id,
                },
                refetchQueries:[
                    {
                        query: FetchBoardCommentsDocument,
                        variables: {boardId: id},
                    }
                ]
            });
            console.log(data);
            if(data?.createBoardComment){
                alert("댓글이 등록 되었습니다.");
                setCommentWriter("");
                setCommentPassword("");
                setCommentContent("");
            }
            else{
                alert("댓글 등록을 실패했습니다.");
            }

        }catch(err){
            console.error(err);
        }
    }

    return{
        commentContent,
        commentPassword,
        commentWriter,
        onChangeContent,
        onChangeWriter,
        onChangePassword,
        setCommentContent,
        setCommentPassword,
        setCommentWriter,
        CreateBoardComment,
    }
}