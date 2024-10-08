import { CreateBoardDocument, FetchBoardDocument, UpdateBoardDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export const useBoardsWrite = (props: any) => {
  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // router
  const router = useRouter();
  const params = useParams();

  const editId = props.isEdit ? params.boardId : null;

  const { data } = useQuery(FetchBoardDocument);

  // state
  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState(props.isEdit ? data?.fetchBoard?.title : "");
  const [content, setContent] = useState(props.isEdit ? data?.fetchBoard?.contents : "");
  const [files, setFiles] = useState<string[]>([]);

  // error state
  const [errorWriter, setErrorWriter] = useState("");
  const [errorPw, setErrorPw] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");

  // active state
  const disabledBtn = !writer.trim() || !pw.trim() || !title?.trim() || !content?.trim();
  // const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   if (writer !== "" && title !== "" && pw !== "" && content !== "") {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [writer, title, pw, content]);

  // onChange
  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkWriter = event.target.value;
    setWriter(checkWriter);
  };
  const onChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // onClick
  // const onClickSignup = async () => {
  //   // 등록버튼 클릭시 입력창이 비어있는지 안 비어있는지 확인 후 에러메세지
  //   if (writer === "") {
  //     setErrorWriter("작성자명을 입력해 주세요!");
  //   } else if (writer !== "") {
  //     setErrorWriter("");
  //   }
  //   if (pw === "") {
  //     setErrorPw("비밀번호를 입력해 주세요!");
  //   } else if (pw !== "") {
  //     setErrorPw("");
  //   }
  //   if (title === "") {
  //     setErrorTitle("제목을 입력해 주세요!");
  //   } else if (title !== "") {
  //     setErrorTitle("");
  //   }
  //   if (content === "") {
  //     setErrorContent("내용을 입력해 주세요!");
  //   } else if (content !== "") {
  //     setErrorContent("");
  //   }
  //   if (writer !== "" && pw !== "" && title !== "" && content !== "") {
  //     // alert("게시글 등록이 가능한 상태입니다!");
  //     console.log("게시글등록가능");
  //   }

  //   // 클릭시 게시글등록
  //   try {
  //     const { data } = await createBoard({
  //       variables: {
  //         createBoardInput: {
  //           title: title,
  //           writer: writer,
  //           contents: content,
  //           password: pw,
  //           youtubeUrl: "",
  //           boardAddress: {
  //             zipcode: "",
  //             address: "",
  //             addressDetail: "",
  //           },
  //           images: ["", ""],
  //         },
  //       },
  //     });
  //     router.push(`/boards/${data.createBoard._id}`);
  //   } catch (error) {
  //     console.log(error);
  //     alert("에러가 발생하였습니다. 다시 시도해 주세요.");
  //   }
  // };

  const onClickSignup = async () => {
    //등록하기
    if (props.isEdit === false) {
      let hasError = false;

      if (writer.trim() === "") {
        setErrorWriter("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorWriter("");
      }

      if (pw.length === 0) {
        setErrorPw("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorPw("");
      }

      if (title?.trim() === "") {
        setErrorTitle("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorTitle("");
      }

      if (content?.trim() === "") {
        setErrorContent("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorContent("");
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: writer,
              password: pw,
              title: String(title),
              contents: String(content),
              youtubeUrl: "",
              boardAddress: {
                zipcode: "",
                address: "",
                addressDetail: "",
              },
              images: ["", ""],
            },
          },
        });

        console.log("data", data);
        alert("게시글이 등록되었습니다!");
        router.push(`/boards/${data?.createBoard._id}`);
      }
    }
    // 수정
    else if (props.isEdit === true) {
      if (content?.trim() === "" && title?.trim() === "") {
        setErrorContent("필수입력 사항입니다.");
        setErrorTitle("필수입력 사항입니다.");
        return;
      }
      if (content?.trim() === "") {
        setErrorContent("필수입력 사항입니다.");
        return;
      }
      if (title?.trim() === "") {
        setErrorTitle("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기

      const 입력받은비밀번호 = prompt("글을 작성할때 입력하셨던 비밀번호를 입력해주세요");
      const editInput: any = {};
      if (title?.trim() && title !== data?.fetchBoard?.title) {
        editInput.title = title;
      }

      if (content?.trim() && content !== data?.fetchBoard?.contents) {
        editInput.contents = content;
      }

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(editInput).length > 0) {
        console.log(editInput);
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: editInput,
              password: 입력받은비밀번호,
              boardId: String(editId),
            },
          });

          if (result.data) {
            console.log("기존의 글을 수정하는 경우:::", result);
            alert("게시글이 성공적으로 수정되었습니다!");
          } else {
            alert("수정에 실패했습니다.");
          }
          // 수정이 완료되면 상세 화면으로 이동하기
          router.push(`/boards/${editId}`);
        } catch (error: any) {
          // 에러 발생 시 처리
          if (error.graphQLErrors) {
            const errorMessages = error.graphQLErrors.map((err: any) => err.message);
            alert(errorMessages.join(", "));
          } else {
            console.error("네트워크에러 발생");
          }
        }
      } else {
        alert("수정된 내용이 없습니다.");
      }
    }
  };

  // 이미지 업로드 시 미리보기 input의 onChange
  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const newFilePreviews: string[] = [];

    if (files.length + uploadedFiles.length > 5) {
      alert("최대 5개의 이미지만 업로드 할 수 있습니다.");
      return; // 경고 후 함수 종료
    }

    uploadedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        newFilePreviews.push(reader.result as string);
        // 모든 파일을 읽은 후 상태를 업데이트
        if (newFilePreviews.length === uploadedFiles.length) {
          setFiles((prevFiles: string[]) => [...prevFiles, ...newFilePreviews]);
        }
      };
    });
  };

  return {
    saveImgFile,
    onClickSignup,
    onChangeContent,
    onChangeTitle,
    disabledBtn,
    onChangePw,
    onChangeWriter,
    errorWriter,
    errorPw,
    errorTitle,
    errorContent,
    files,
  };
};
