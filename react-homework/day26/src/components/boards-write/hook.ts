import {
  CreateBoardDocument,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
} from "@/commons/graphql/graphql";
import { IErrors, IInputs } from "./types";
import { ApolloError, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const useBoardsWrite = () => {
  // input state
  const [inputs, setInputs] = useState<IInputs>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });
  // error state
  const [errors, setErrors] = useState<IErrors>({});
  // 등록하기버튼 비활성화 or 활성화
  const [isDisabled, setIsDisabled] = useState(true);
  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const router = useRouter();
  const params = useParams();

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newInputs = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInputs);

    // input state들의 값이 모두 빈 문자열이 아니면
    const allInputFilled = Object.values(newInputs).every(
      (input) => input !== ""
    );
    setIsDisabled(!allInputFilled);
    //console.log(inputs);
  };

  // 등록하기 - graphql state 전달
  const boardSubmit = async () => {
    try {
      // graphql 요청
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: inputs.writer,
            password: inputs.password,
            title: inputs.title,
            contents: inputs.contents,
          },
        },
      });
      console.log("등록한 게시글 id: ", result.data?.createBoard?._id);
      alert("게시글을 등록하였습니다😊");

      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      console.error(error);
      alert("에러가 발생하였습니다😮 다시 시도해 주세요.");
    }
  };

  // 등록하기
  const onClickRegister = () => {
    // 에러 담을 객체
    const newErrors: IErrors = {};

    Object.keys(inputs).forEach((key) => {
      const inputKey = key as keyof IInputs;
      // 각 input state가 빈 문자열이면 newErrors에 넣어주기
      if (!inputs[inputKey]) {
        newErrors[inputKey] = "필수입력 사항 입니다.";
      }
    });

    // input중에 하나라도 입력 안되어있으면 error state에 newErrors 넣어주기
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({}); // 에러 없으면 상태 초기화
      boardSubmit(); // 게시글 등록

      setInputs({ writer: "", password: "", title: "", contents: "" }); // value 없애서 필요 없을 듯?
    }
  };

  // 수정하기
  const onClickEdit = async () => {
    try {
      const password = prompt(
        "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
      );
      // 프롬프트에서 취소 누르면 null을 반환하기 때문에
      // 사용자가 취소 버튼을 눌렀을 때(null이면) 함수 종료
      if (password === null) return;

      // prompt로 입력 받은 password, boardId는 미리 넣고, 변경이 필요한 부분은 일단 비워두기
      const variables: UpdateBoardMutationVariables = {
        updateBoardInput: {},
        password: password,
        boardId: String(params.boardId),
      };

      // state에 값이 있으면 넣기
      if (inputs.title) {
        variables.updateBoardInput.title = inputs.title;
      }
      if (inputs.contents) {
        variables.updateBoardInput.contents = inputs.contents;
      }

      const result = await updateBoard({
        variables: variables,
      });

      console.log("update: ", result);
      alert("수정 완료👍");

      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      // error가 ApolloError 타입인 경우에만 graphQLErrors를 확인
      console.log(error);
      if (error instanceof ApolloError) {
        console.error(error?.graphQLErrors[0].message);
        alert(error?.graphQLErrors[0].message);
      } else {
        console.error(error);
        alert("에러가 발생했습니다.");
      }
    }
  };

  const onClickEditCancel = () => {
    router.push(`/boards/${params.boardId}`);
  };

  const onClickRegisterCancel = () => {
    router.push("/boards/");
  };

  return {
    onChangeInput,
    onClickRegister,
    onClickEdit,
    onClickEditCancel,
    onClickRegisterCancel,
    isDisabled,
    errors,
  };
};
