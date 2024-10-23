"use client"

import { CreateBoardCommentDocument, FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";


export default function useBoardCommentWrite(){

    const [star, setStar] = useState(0);

    const [createComment] = useMutation(CreateBoardCommentDocument);
    const [commentWriter, setCommentWriter] = useState("");
    const [commentPassword, setCommentPassword] = useState("");
    const [commentContent, setCommentContent] = useState("");

    const params = useParams();
    const id = params.boardId.toString();

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentWriter(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentPassword(event.target.value);
    };

    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(event.target.value);
    };

    const onChangeStar = (event: number) => {
        setStar(event);
    }

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
                        variables: {page:1, boardId: id},
                    }
                ]
            });
            console.log("댓글등록클릭",data);
            if(data?.createBoardComment){
                alert("댓글이 등록 되었습니다.");
                setCommentWriter("");
                console.log("작성자: ", commentWriter);
                setCommentPassword("");
                console.log("비밀번호: ", commentPassword);
                setCommentContent("");
                console.log("내용: ", commentContent);
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
        onChangeStar,
    }
}