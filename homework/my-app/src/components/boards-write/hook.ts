import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { CREATE_BOARD, UPDATE_BOARD } from "./queries";
import { IBoardWriteprops } from "./type";

export const useBoardsWrite = (props: IBoardWriteprops) => {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAllFilled, setIsAllFilled] = useState(false);

  const [aboutUpLoadBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const router = useRouter();
  const params = useParams(); // useParams() 호출

  useEffect(() => {
    // 수정 모드가 아닌 경우에만 필수 입력사항을 체크하여 버튼 활성화
    if (!props.isEdit) {
      setIsAllFilled(!!(author && password && title && content));
    } else {
      setIsAllFilled(true); // 수정 모드에서는 항상 true로 설정하여 버튼 활성화
    }
  }, [author, password, title, content, props.isEdit]);

  const authorOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const signupButtonHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (props.isEdit) {
      await onClickUpdate(); // 수정하기
    } else {
      await onClickSubmit(); // 새 게시글 등록
    }
  };

  const onClickSubmit = async () => {
    try {
      const result = await aboutUpLoadBoard({
        variables: {
          createBoardInput: {
            writer: author,
            password: password,
            title: title,
            contents: content,
            youtubeUrl: "",
            boardAddress: {
              zipcode: "",
              address: "",
              addressDetail: "",
            },
            images: [],
          },
        },
      });
      console.log(result);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.log(error);
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    const enteredPassword = window.prompt("비밀번호를 입력하세요");

    if (!enteredPassword) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: title || "", // 제목 수정 여부 체크
            contents: content || "", // 내용 수정 여부 체크
            youtubeUrl: "",
            boardAddress: {
              zipcode: "",
              address: "",
              addressDetail: "",
            },
            images: [],
          },
          password: enteredPassword,
          boardId: params.boardId,
        },
      });

      console.log(result);
      alert("수정이 완료되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      console.log(error.message);
      alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
    }
  };

  return {
    authorOnChange,
    passwordOnChange,
    titleOnChange,
    contentOnChange,
    signupButtonHandler,
    isAllFilled,
  };
};
