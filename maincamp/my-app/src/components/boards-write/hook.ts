"use client"

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { CreateBoardDocument, FetchBoardDocument, UpdateBoardDocument, UploadFileDocument } from "@/commons/graphql/graphql";
import { Address } from "react-daum-postcode";
import { UPLOAD_FILE } from "./queries";
import { checkValidationFile } from "@/commons/libraries";

export default function useBoardDetailEdit(isEdit: boolean){
    const router = useRouter();
    const params = useParams();

    const editId = isEdit ? params.boardId.toString() : "";

    // GraphQL
    const [createBoard] = useMutation(CreateBoardDocument);
    const [updateBoard] = useMutation(UpdateBoardDocument);

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    
    const [isActive, setIsActive] = useState(false)

    // 수정or등록하기 버튼 색 변경
    useEffect(() => {
        // 에러 메시지 초기화
        setNameError("");
        setPasswordError("");
        setTitleError("");
        setSubjectError("");

        // 제목과 내용이 모두 입력되었는지 확인하여 버튼 활성화 상태 업데이트
        if (isEdit === false) {
            if (name.trim() !== "" && password.trim() !== "" && title.trim() !== "" && subject.trim() !== "") {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        } else if (isEdit === true) {
            // 수정 모드에서도 제목과 내용만 체크
            if (title.trim() !== "" && subject.trim() !== "") {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }
    }, [name, password, title, subject, isEdit]); // 이 상태들이 변경될 때마다 실행
    
    const {data} = useQuery(FetchBoardDocument, {
        variables: {boardId: editId.toString()},
    }); // useQuery는 data로 받아야함
    console.log('data???????', data);

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

    
    // 주소
    const [isOpen, setIsOpen] = useState(false);
    const [writeAddress, setWriteAddress] = useState("");
    const [zoneAddress, setZoneAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    // useEffect (isEdit 또는 data가 변경될 때 상태를 업데이트 하도록 함)
    useEffect(() => {
        if(isEdit && data){
            setZoneAddress(data?.fetchBoard.boardAddress?.zipcode || "");
            setWriteAddress(data?.fetchBoard.boardAddress?.address || "");
        }
    }, [isEdit, data]);
    const onClickAddress = () => {
        setIsOpen(true);
    }
    const handleOk = () => {
        setIsOpen(false);
    };
    
    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleComplete = (data: Address) => {
        const fullAddress = data.address; // Address에 포함된 address
        const zonecode = data.zonecode; // Address에 포함된 zonecode
        setWriteAddress(fullAddress);
        setZoneAddress(zonecode);
        console.log(data);
        setIsOpen(false);
    };

    // 
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
                const {data} = await createBoard({
                    variables: {
                        createBoardInput:{
                            writer: name,
                            password: password,
                            title: title,
                            contents: subject,
                            youtubeUrl: "",
                            boardAddress: {
                                zipcode: zoneAddress,
                                address: writeAddress,
                                addressDetail: detailAddress,
                            },
                            // images: [imageUrl],
                        }
                    },
                })
                console.log("id:::" , data?.createBoard._id);
                alert("게시글이 등록되었습니다.")
        
                router.push(`/boards/${data?.createBoard._id}`)
            }
        }
        // 수정페이지
        else if(isEdit === true){
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

            // const updateBoardInput = {}; 타입 지정
            const updateBoardInput: {title?:string, contents?:string} = {};

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

    // 이미지업로드
    const [imageUrl, setImageUrl] = useState(["", "", ""]);
    const fileRef = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    const [imageUpload] = useMutation(UploadFileDocument);

    const onChangeImageUpload = async (index: number, event:ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0];

        const isValid = checkValidationFile(imageFile);
        if(!isValid) return;

        const result = await imageUpload({ variables: {file: imageFile}});
        console.log("업로드", result.data?.uploadFile.url);
        // setImageUrl(result.data?.uploadFile.url ?? "");

        setImageUrl(prev => {
            const newUrl = [...prev];
            newUrl[index] = result.data?.uploadFile.url ?? ""
            return newUrl;
        })
    };

    const onClickImageFile = (index: number) => {
        fileRef[index].current?.click();
        console.log("업로드클릭");
    };

    // 이미지삭제
    const imageDelete = (index: number) => {
        setImageUrl((prev) => { 
            const newUrl = [...prev];
            newUrl[index] = ""; // 해당 인덱스의 URL을 초기화
            return newUrl;
        });
    }

    // 등록하기 버튼 색
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
        isOpen,
        writeAddress,
        zoneAddress,
        fileRef,
        imageUrl,
        imageDelete,
        onChangeName,
        onChangePassword,
        onChangeSubject,
        onChangeTitle,
        onClickAddress,
        handleOk,
        handleCancel,
        handleComplete,
        setWriteAddress,
        setZoneAddress,
        setDetailAddress,
        onClickImageFile,
        onChangeImageUpload,
        register,
    };

}