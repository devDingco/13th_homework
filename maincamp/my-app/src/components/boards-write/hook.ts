"use client"

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { boardGraphql, FETCH_BOARD, UPDATE_BOARD } from "./queries";
import { CreateBoardDocument, UpdateBoardDocument } from "@/commons/graphql/graphql";

export default function useBoardDetailEdit(isEdit: boolean){
    const router = useRouter();
    const params = useParams();

    const editId = isEdit ? params.boardId.toString() : null;

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    const {data} = useQuery(FETCH_BOARD, {
        variables: {boardId: editId},
    }); // useQuery는 data로 받아야함
    console.log('data:::::', data);

    // 리팩토링 후 early-exit 패턴
    const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)

        if(event.target.value !== "" && password !== "" && title !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
    }
    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)

        if(name !== "" && event.target.value !== "" && title !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
    }
    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)

        if(name !== "" && password !== "" && event.target.value !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
    }
    const onChangeSubject = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setSubject(event.target.value)

        if(name !== "" && password !== "" && title !== "" && event.target.value !== "") return setIsActive(true)
        setIsActive(false)
    }

    // GraphQL
    const [createBoard] = useMutation(boardGraphql);
    const [updateBoard] = useMutation(UPDATE_BOARD);

    let registerError = false;

    const register = async (event:MouseEvent<HTMLButtonElement>) => {
        
        if(isEdit === false){
            if(name.trim() === ""){
                setNameError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setNameError("")
            }
        
            if(password.trim() === ""){
                setPasswordError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setPasswordError("")
            }
        
            if(title.trim() === ""){
                setTitleError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setTitleError("")
            }
        
            if(subject.trim() === ""){
                setSubjectError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setSubjectError("")
            }
        
            if(!registerError){
                const result = await createBoard({
                    variables: {
                        createBoardInput:{
                            writer: name,
                            password: password,
                            title: title,
                            contents: subject,
                            youtubeUrl: "",
                            boardAddress: {
                                zipcode: "",
                                address: "",
                                addressDetail: "",
                            },
                            images: ["", ""],
                        }
                    },
                })
                alert("게시글이 등록되었습니다.")
                console.log(data.createBoard._id);
        
                router.push(`/boards/${data?.createBoard._id}`)
            }
        }
        // 수정페이지
        else if(isEdit===true){
            if(title.trim() === ""){
                setTitleError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setTitleError("")
            }
            if(subject.trim() === ""){
                setSubjectError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setSubjectError("")
            }

            const editPassword = prompt(
                "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
            );
            const updateBoardInput = {};
            if (title.trim() && title !== data?.fetchBoard?.title) {
                updateBoardInput.title = title;
            }
    
            if (subject.trim() && subject !== data?.fetchBoard?.contents) {
                updateBoardInput.contents = subject;
            }
    
            try{
                const result = await updateBoard({
                    variables: {
                        updateBoardInput: updateBoardInput,
                        password: editPassword,
                        boardId: editId,
                    }
                });
                if(result.data){
                    alert("수정완료");
                } else{
                    alert("수정실패");
                }
                router.push(`/boards/${editId}`);
    
                console.log("수정?", result)
            } catch (error) {
                if (error.graphQLErrors) {
                  error.graphQLErrors.forEach(({ message }) => {
                    alert(`비밀번호 오류: ${message}`);
                  });
                } else {
                  alert(`알 수 없는 오류: ${error.message}`);
                }
              }
        }
        console.log("클릭",register)


    }
    const registerColor = {
        backgroundColor:"#c3c3c3",
        color:"#E4E4E4"
    }
    const registerActive = {
        backgroundColor:"#2974E5",
        color:"#fff"
    }  

    return{
        name,
        data,
        nameError,
        password,
        passwordError,
        title,
        titleError,
        subject,
        subjectError,
        registerColor,
        registerActive,
        isActive,
        onChangeName,
        onChangePassword,
        onChangeSubject,
        onChangeTitle,
        register,
    };

}