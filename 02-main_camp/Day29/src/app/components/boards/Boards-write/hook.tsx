import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
  CreateBoardInput,
  BoardAddressInput,
  FetchBoardQuery,
} from "@/commons/gql/graphql";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_ALERT_MESSAGE from "@/commons/constants/alert";
import { Modal } from "antd";
import { Address } from "react-daum-postcode";

export const useBoardWrite = (isEdit?: boolean, data?: FetchBoardQuery) => {
  const router = useRouter();
  const params = useParams();

  const [isActive, setIsActive] = useState(isEdit ? true : false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const requiredInputList = ["writer", "password", "title", "contents"];
  const [boardInput, setBoardInput] = useState<CreateBoardInput>({
    writer: data?.fetchBoard.writer ?? "",
    password: "",
    title: data?.fetchBoard.title ?? "",
    contents: data?.fetchBoard.contents ?? "",
    youtubeUrl: data?.fetchBoard.youtubeUrl ?? "",
  });

  const [boardAddress, setBoardAddress] = useState<BoardAddressInput>({
    address: data?.fetchBoard.boardAddress?.address ?? "",
    addressDetail: data?.fetchBoard.boardAddress?.addressDetail ?? "",
    zipcode: data?.fetchBoard.boardAddress?.zipcode ?? "",
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
    const inputName = event.target.name;
    if (inputName === "addressDetail") {
      updateAddress(inputName, value);
    } else {
      updateBoardInput(inputName, value);
    }
    validateRequiredInput(inputName, value);
    return setIsActive(true);
  };

  const updateBoardInput = (inputName: string, value: string) => {
    setBoardInput((prev) => {
      return {
        ...prev, // 기존 상태 유지
        [inputName]: value,
      };
    });
  };

  const updateAddress = (inputName: string, value: string) => {
    setBoardAddress((prev) => {
      return {
        ...prev,
        [inputName]: value,
      };
    });
    console.log(boardAddress);
  };

  const validateRequiredInput = (inputName: string, value: string) => {
    if (requiredInputList.includes(inputName)) {
      setRequiredInputDescription((prev) => {
        return {
          ...prev,
          [inputName]: checkWithSpace(value) ? defaultErrorMessage : "",
        };
      });
    }
  };

  const showAddressSearchModal = () => {
    onToggleModal();
  };

  const onCompletionSearchAddress = (data: Address) => {
    updateAddress("zipcode", data.zonecode);
    updateAddress("address", data.address);
    onToggleModal();
  };

  const onToggleModal = () => {
    setIsAddressModalOpen((prev) => !prev);
  };

  // onClick
  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...boardInput,
            boardAddress: boardAddress,
          },
        },
      });
      const boardId = result.data?.createBoard._id;
      console.log(result.data?.createBoard);
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
            boardAddress: boardAddress,
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

  const checkWithSpace = (input: string) => {
    const hasSpace = /\s/.test(input);
    const isOnlySpace = input.trim().length === 0;

    if (hasSpace) return true;
    if (isOnlySpace) return true;
    return false;
  };

  return {
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    showSuccessModal,
    showErrorModal,
    showAddressSearchModal,
    onChangeBoardWriteInput,
    updateBoardInput,
    onCompletionSearchAddress,
    boardInput,
    boardAddress,
    requiredInputDescription,
    isAddressModalOpen,
    isActive,
  };
};
