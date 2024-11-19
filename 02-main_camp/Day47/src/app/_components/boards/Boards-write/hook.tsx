import { ApolloError, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
  CreateBoardInput,
  BoardAddressInput,
  FetchBoardQuery,
  UploadFileDocument,
  FetchBoardDocument,
} from "@/commons/gql/graphql";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_ALERT_MESSAGE from "@/commons/constants/alert";
import { Address } from "react-daum-postcode";
import useModal from "@/commons/ui/modal/hook";
import { NavigationPaths, useNavigate } from "@/utils/navigate";
import { checkValidationImage, checkWithSpace } from "@/utils/validation";

export const useBoardWrite = (isEdit?: boolean, data?: FetchBoardQuery) => {
  const navigate = useNavigate();
  // const router = useRouter();
  const params = useParams();
  const { showSuccessModal, showErrorModal } = useModal();

  const [isActive, setIsActive] = useState(isEdit ? true : false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const requiredInputList = ["writer", "password", "title", "contents"];
  const fileRefs = useRef<HTMLInputElement[]>([]);

  const [boardInput, setBoardInput] = useState<CreateBoardInput>({
    writer: data?.fetchBoard.writer ?? "",
    password: "",
    title: data?.fetchBoard.title ?? "",
    contents: data?.fetchBoard.contents ?? "",
    youtubeUrl: data?.fetchBoard.youtubeUrl ?? "",
    images: data?.fetchBoard.images ?? [],
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
  const [uploadFile] = useMutation(UploadFileDocument);

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
            boardAddress,
          },
        },
      });
      const boardId = result.data?.createBoard._id;
      console.log(result.data?.createBoard);
      showSuccessModal("게시글이 작성 되었습니다.", () => {
        navigate(NavigationPaths.boards, boardId);
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
      await updateBoard({
        variables: {
          updateBoardInput: {
            boardAddress: boardAddress,
            title: boardInput.title,
            contents: boardInput.contents,
            youtubeUrl: boardInput.youtubeUrl,
            images: boardInput.images,
          },
          password: passwordInput,
          boardId: params.boardId as string,
        },

        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: {
              boardId: String(params.boardId),
            },
          },
        ],
      });
      showSuccessModal(CONSTANTS_ALERT_MESSAGE.UPDATE_BOARD_SUCCEED, () => {
        navigate(NavigationPaths.boards, String(params.boardId));
      });
    } catch (error: unknown) {
      if (error instanceof ApolloError)
        showErrorModal("게시글 수정 오류", error.graphQLErrors[0].message);
    }
  };

  const onClickCancel = () => {
    if (isEdit) {
      navigate(NavigationPaths.boards, String(params.boardId));
    } else {
      navigate(NavigationPaths.boards);
    }
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    if (!checkValidationImage(file)) return;
    console.log(file);
    const result = await uploadFile({
      variables: {
        file,
      },
    });
    const id = Number(event.target.id);
    setBoardInput((prev) => {
      const newImages = prev.images ? [...prev.images] : [];
      newImages[id] = result.data?.uploadFile.url ?? "";
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const onClickImage = (event: MouseEvent<HTMLDivElement>) => {
    // 어떤 요소를 눌렀는지 알아야한다.
    const id = Number(event.currentTarget.id);
    console.log("onClickImage:: ID", id);
    fileRefs.current[id].click();
  };

  const onClickDeleteImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const id = Number(event.currentTarget.id);
    const newImages = [...(boardInput.images ?? [])];
    newImages[id] = "";
    setBoardInput((prev) => {
      return {
        ...prev,
        ...boardAddress,
        images: newImages,
      };
    });
  };

  // 새로 고침을 해도 데이터를 불러오도록 구현
  useEffect(() => {
    if (isEdit && data?.fetchBoard) {
      setBoardInput(() => {
        return {
          writer: data.fetchBoard.writer,
          title: data.fetchBoard.title,
          contents: data.fetchBoard.contents,
          youtubeUrl: data.fetchBoard.youtubeUrl,
          images: data.fetchBoard.images,
        };
      });
    }

    if (isEdit && data?.fetchBoard.boardAddress) {
      setBoardAddress(() => {
        return {
          address: data.fetchBoard.boardAddress?.address,
          addressDetail: data.fetchBoard.boardAddress?.addressDetail,
          zipcode: data.fetchBoard.boardAddress?.zipcode,
        };
      });
    }
    console.log(data);
  }, [data, isEdit]);

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
    fileRefs,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
  };
};
