import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import type { IBoardsWriteProps, IupdateVariables, IInput } from "./types";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from "@/commons/gql/graphql";
import { Address } from "react-daum-postcode";

export const useBoardsWrite = (props: IBoardsWriteProps) => {
  const params = useParams();
  const router = useRouter();
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [isOpen, setIsOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [address, setAddress] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  const [errorMessage, setErrorMessage] = useState<IInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [validation, setValidation] = useState<IInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedValidation = {
      ...validation,
      [event.target.name]: event.target.value,
    };

    const isAllFilled = props.isEdit
      ? updatedValidation.title !== "" && updatedValidation.contents !== ""
      : Object.values(updatedValidation).every((value) => value !== "");

    setValidation(updatedValidation);
    setIsActive(isAllFilled);
  };

  const onClickSubmit = async () => {
    try {
      const errors: IInput = {
        writer: "",
        password: "",
        title: "",
        contents: "",
      };

      // 빈 값 검증
      if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
      if (!validation.password) errors.password = "필수 입력 사항입니다.";
      if (!validation.title) errors.title = "필수 입력 사항입니다.";
      if (!validation.contents) errors.contents = "필수 입력 사항입니다.";

      setErrorMessage(errors);

      if (
        validation.writer &&
        validation.password &&
        validation.title &&
        validation.contents
      ) {
        alert("게시글 등록이 가능한 상태입니다!");
        const result = await createBoard({
          variables: {
            createBoardInput: {
              ...validation,
              boardAddress: address,
              youtubeUrl,
            },
          },
        });
        console.log(result, "등록결과");
        router.push(`/boards/${result.data?.createBoard._id}`);
      }
    } catch (error) {
      console.error("에러가 발생하였습니다. 다시 시도해 주세요.", error);
    }
  };

  const onClickEdit = async () => {
    try {
      const checkPassWord = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );

      const errors: IInput = {
        writer: "",
        password: "",
        title: "",
        contents: "",
      };

      // 빈 값 검증
      if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
      if (!validation.password) errors.password = "필수 입력 사항입니다.";
      if (!validation.title) errors.title = "필수 입력 사항입니다.";
      if (!validation.contents) errors.contents = "필수 입력 사항입니다.";

      setErrorMessage(errors);

      if (checkPassWord && validation.title && validation.contents) {
        const updateVariables: IupdateVariables = {};

        if (validation.title) updateVariables.title = validation.title;
        if (validation.contents) updateVariables.contents = validation.contents;

        const result = await updateBoard({
          variables: {
            updateBoardInput: {
              ...updateVariables,
              youtubeUrl,
              boardAddress: address,
            },
            password: checkPassWord,
            boardId: String(params.boardId),
          },
        });
        console.log(result, "수정결과");
        router.push(`/boards/${params.boardId}`);
      }
    } catch (error: any) {
      alert(error.graphQLErrors[0].message);
    }
  };

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data, "어드레스 데이타");
    let addr = "";

    if (data.userSelectedType === "R") {
      addr = data.roadAddress;
    } else {
      addr = data.jibunAddress;
    }

    setAddress({
      zipcode: String(data.zonecode),
      address: String(addr),
      addressDetail: "",
    });

    onToggleModal();
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      addressDetail: event.target.value,
    });
  };

  const onChangeYouTube = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  return {
    onChange,
    onClickSubmit,
    onClickEdit,
    onToggleModal,
    handleComplete,
    onChangeAddress,
    onChangeYouTube,
    youtubeUrl,
    isActive,
    errorMessage,
    isOpen,
    address,
  };
};
