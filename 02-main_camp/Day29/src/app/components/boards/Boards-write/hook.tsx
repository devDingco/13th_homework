import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useState } from "react";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from "@/commons/gql/graphql";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_ALERT_MESSAGE from "@/commons/constants/alert";
import { Modal } from "antd";

export const useBoardWrite = (isEdit?: boolean) => {
  const router = useRouter();
  const params = useParams();

  const [isActive, setIsActive] = useState(isEdit ? true : false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const requiredInputList = ["writer", "password", "title", "contents"];
  const [boardInput, setBoardInput] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
    boardAddress: {
      address: "",
      addressDetail: "",
      zipcode: "",
    },
    youtubeUrl: "",
  });

  const defaultErrorMessage = isEdit ? "" : CONSTANTS_DESCRIPTION.ERROR_MESSAGE;
  const [requiredInputDescription, setRequiredInputDescription] = useState({
    writer: defaultErrorMessage,
    password: defaultErrorMessage,
    title: defaultErrorMessage,
    contents: defaultErrorMessage,
  });

  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const onChangeBoardWriteInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const changedInputName = event.target.name;
    setBoardInput((prev) => {
      return {
        ...prev,
        [changedInputName]: value,
      };
    });

    if (requiredInputList.includes(changedInputName)) {
      setRequiredInputDescription((prev) => {
        return {
          ...prev,
          [changedInputName]: "",
        };
      });
    }
    return setIsActive(true);
  };

  // onChange
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBoardInput({ ...boardInput, writer: value });
    // checkTextInput(value, setWriterErrorMessage);
    // if (value && password && title && contents) return setIsActive(true);
    return setIsActive(false);
  };

  // onClick
  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: boardInput,
        },
      });
      const boardId = result.data?.createBoard._id;
      showSuccessModal("게시글이 작성 되었습니다.", () => {
        router.push(`/boards/${boardId}`);
      });
    } catch {
      showErrorModal(
        "게시글 작성 오류",
        CONSTANTS_ALERT_MESSAGE.CREATE_BOARD_FAILED
      );
    }
  };

  const onClickEdit = async () => {
    const passwordInput = prompt(
      CONSTANTS_ALERT_MESSAGE.UPDATE_BOARD_INPUT_PASSWORD
    );
    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: boardInput.title,
            contents: boardInput.contents,
            youtubeUrl: boardInput.youtubeUrl,
          },
          password: passwordInput,
          boardId: params.boardId as string,
        },
      });
      showSuccessModal(CONSTANTS_ALERT_MESSAGE.UPDATE_BOARD_SUCCEED, () => {
        router.push(`/boards/${params.boardId}`);
      });
    } catch (error: any) {
      showErrorModal("게시글 수정 오류", error.graphQLErrors[0].message);
    }
  };

  const onClickCancel = () => {
    if (isEdit) {
      router.push(`/boards/${params.boardId}`);
    } else {
      router.push(`/boards`);
    }
  };

  // Modal
  const showSuccessModal = (
    content: string,
    completionHandler?: () => void
  ) => {
    Modal.success({
      content: content,
      onOk: completionHandler,
    });
  };

  const showErrorModal = (
    title: string,
    content: string,
    completionHandler?: () => void
  ) => {
    Modal.error({
      title: title,
      content: content,
      onOk: completionHandler,
    });
  };

  const showAddressSearchModal = () => {
    setIsAddressModalOpen((prev) => !prev);
  };

  // const checkTextInput = (input: string) => {
  //   if (input && !checkSpace(input)) {
  //     handler("");
  //   } else if (checkString(input)) {
  //     handler("");
  //   } else if (isEdit) {
  //     handler("");
  //   } else {
  //     handler(defaultErrorMessage);
  //   }
  // };

  const checkSpaceInString = (str: string) => {
    const regex = /[ㄱ-ㅎ가-힣a-zA-Z0-9]/;
    if (str.search(regex) != -1) return true;
    return false;
  };

  const checkSpace = (str: string) => {
    if (str.search(/\s/) != -1) return true;
    return false;
  };

  return {
    onChangeWriter,
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    showSuccessModal,
    showErrorModal,
    showAddressSearchModal,
    onChangeBoardWriteInput,
    requiredInputDescription,
    isAddressModalOpen,
    isActive,
  };
};
