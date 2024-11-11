"use client"

import { CommentEditSuccessDocument, CreateBoardCommentDocument, FetchBoardCommentsDocument, FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";


export const useBoardCommentWrite = (
    comment: FetchBoardCommentsQuery["fetchBoardComments"][0] | null,
    setCommentEdit: Dispatch<SetStateAction<boolean>>
) => {

    const [star, setStar] = useState(0);

    const [createComment] = useMutation(CreateBoardCommentDocument);
    const [commentEditSuccess] = useMutation(CommentEditSuccessDocument);
    const [commentWriter, setCommentWriter] = useState("");
    const [commentPassword, setCommentPassword] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isActive, setIsActive] = useState(false)

    const params = useParams();
    const id = params.boardId.toString();

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentWriter(event.target.value);

        if(event.target.value !== "" && commentPassword !== "" && commentContent != "") return setIsActive(true)
        setIsActive(false)            
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentPassword(event.target.value);

        if(commentWriter !== "" && event.target.value !== "" && commentContent != "") return setIsActive(true)
        setIsActive(false)
    };

    const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(event.target.value);

        if(commentWriter !== "" && commentPassword !== "" && event.target.value != "") return setIsActive(true)
        setIsActive(false)
    };

    const registerColor = {
        backgroundColor:"#c3c3c3",
        color:"#E4E4E4"
    }
    const registerActive = {
        backgroundColor:"#2974E5",
        color:"#fff"
    }  

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
                        rating: star,
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
                setCommentWriter("");
                console.log("작성자: ", commentWriter);
                setCommentPassword("");
                console.log("비밀번호: ", commentPassword);
                setCommentContent("");
                console.log("내용: ", commentContent);
                alert("댓글이 등록 되었습니다.");
            }
            else{
                alert("댓글 등록을 실패했습니다.");
            }
        }catch(err){
            console.error(err);
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);
        if (comment) setCommentEdit(false);
    };
        const handleCancel = () => {
        setIsModalOpen(false);
        if (comment) setCommentEdit(false);
    };

    // 댓글 수정
    const changeComment = async () => {
        try {
            if (comment) {
              const {data} = await commentEditSuccess({
                variables: {
                  boardCommentId: comment?._id,
                  updateBoardCommentInput: {
                    contents: commentContent,
                    rating: star,
                  },
                  password: commentPassword,
                },
                refetchQueries: [
                  {
                    query: FetchBoardCommentsDocument,
                    // variables: { page: 1, boardCommentId: comment?._id },
                    variables: {page:1, boardId:id}
                  },
                ],
              });
      
              if (data) {
                setModalContent("댓글 수정이 완료 되었습니다");
                setIsModalOpen(true);
              }
            }
          } catch (err: any) {
            const errMsg = (err as ApolloError).graphQLErrors[0] as any;
            console.error(err);
            // 비밀번호 오류
            setModalContent(errMsg.message);
            setIsModalOpen(true);
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
        isActive,
        registerColor,
        registerActive,
        changeComment,
        isModalOpen,
        handleOk,
        handleCancel,
        modalContent,
    }
}