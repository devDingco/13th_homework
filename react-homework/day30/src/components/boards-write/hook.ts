import {
  CreateBoardDocument,
  FetchBoardQuery,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
} from "@/commons/graphql/graphql";
import { IErrors, IInputs } from "./types";
import { ApolloError, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { errorModal, successModal } from "@/utils/modal";
import { Address } from "react-daum-postcode";

export const useBoardsWrite = (data: FetchBoardQuery | undefined) => {
  console.log("받아온 data: ", data);
  // input state
  const [inputs, setInputs] = useState<IInputs>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });
  // error state
  const [errors, setErrors] = useState<IErrors>({});
  // address state
  const [addressInfo, setAddressInfo] = useState({
    zipcode: data?.fetchBoard?.boardAddress?.zipcode ?? "",
    address: data?.fetchBoard?.boardAddress?.address ?? "",
  });
  // 상세주소 state
  const [addressDetail, setAddressDetail] = useState("");
  // youtube Url
  const [youtubeUrl, setYoutubeUrl] = useState("");
  // 등록하기버튼 비활성화 or 활성화 state
  const [isDisabled, setIsDisabled] = useState(true);

  // modal 토글 - password
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // modal password
  const [modalPassword, setModalPassword] = useState("");
  // modal 토글 - zipcode
  const [isZipCodeModalOpen, setIsZipCodeModalOpen] = useState(false);

  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const router = useRouter();
  const params = useParams();

  const boardId = params.boardId as string;

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setInputs((prev) => {
      const newInputs = {
        ...prev,
        [name]: value,
      };
      // input state들의 값이 모두 빈 문자열이 아니면
      const allInputFilled = Object.values(newInputs).every(
        (input) => input !== ""
      );
      setIsDisabled(!allInputFilled);
      return newInputs;
    });
  };

  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddressDetail(event.target.value);
  };

  const onChangeYoutubeUrl = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setYoutubeUrl(event.target.value);
  };

  // 등록하기 - graphql state 전달
  const boardSubmit = async () => {
    try {
      // graphql 요청
      const result = await createBoard({
        variables: {
          // 구조분해할당 써보기
          createBoardInput: {
            writer: inputs.writer,
            password: inputs.password,
            title: inputs.title,
            contents: inputs.contents,
            youtubeUrl: youtubeUrl,
            boardAddress: {
              zipcode: addressInfo.zipcode,
              address: addressInfo.address,
              addressDetail: addressDetail,
            },
          },
        },
      });
      console.log("등록한 게시글:", result?.data?.createBoard);
      console.log("등록한 게시글 id: ", result.data?.createBoard?._id);

      successModal("게시글을 등록하였습니다 😊");

      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      console.error(error);

      errorModal("게시글을 등록할 수 없습니다. 다시 시도해 주세요 🧐");
    }
  };

  // 등록하기 버튼
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

  // password modal 토글 함수
  const onTogglePasswordModal = () => {
    setIsPasswordModalOpen((prev) => !prev);
  };

  // zipcode modal 토글 함수
  const onToggleZipCodeModal = () => {
    setIsZipCodeModalOpen((prev) => !prev);
  };

  // password modal 완료 버튼
  const handleOk = async () => {
    try {
      const variables: UpdateBoardMutationVariables = {
        updateBoardInput: {
          boardAddress: {
            zipcode: addressInfo.zipcode,
            address: addressInfo.address,
          },
        },
        password: modalPassword,
        boardId: boardId,
      };

      // state에 값이 있으면 넣기
      if (inputs.title) variables.updateBoardInput.title = inputs.title;
      if (inputs.contents)
        variables.updateBoardInput.contents = inputs.contents;
      if (youtubeUrl) variables.updateBoardInput.youtubeUrl = youtubeUrl;
      if (addressDetail)
        variables.updateBoardInput.boardAddress.addressDetail = addressDetail;

      const result = await updateBoard({
        variables: variables,
      });

      console.log("update: ", result);
      successModal("수정이 완료되었습니다😊");

      router.push(`/boards/${boardId}`);
      // prompt로 입력 받은 password, boardId는 미리 넣고, 변경이 필요한 부분은 일단 비워두기
    } catch (error) {
      // error가 ApolloError 타입인 경우에만 graphQLErrors를 확인
      console.log(error);
      if (error instanceof ApolloError) {
        console.error(error?.graphQLErrors[0].message);
        errorModal(error?.graphQLErrors[0].message);
      } else {
        console.error(error);
        errorModal("에러가 발생하였습니다.");
      }
    }

    // 모달 닫기
    onTogglePasswordModal();
  };

  // 모달 창 password 입력
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setModalPassword(event.target.value);
  };

  // 수정하기
  const onClickEdit = () => {
    // 비밀번호 입력 모달 열기
    onTogglePasswordModal();
  };

  const onClickZipCodeSearch = () => {
    // 우편번호 검색 모달 열기
    onToggleZipCodeModal();
  };

  // 우편번호 검색하여 주소 선택 했을 때
  const handleComplete = (data: Address) => {
    const address = data.address;
    const zipcode = data.zonecode;

    setAddressInfo((prev) => ({
      ...prev,
      zipcode,
      address,
    }));
    console.log(data);

    onToggleZipCodeModal();
  };

  const onClickEditCancel = () => {
    router.push(`/boards/${boardId}`);
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

    isPasswordModalOpen,
    onTogglePasswordModal,
    onChangePassword,
    handleOk,

    isZipCodeModalOpen,
    onToggleZipCodeModal,
    onClickZipCodeSearch,
    handleComplete,
    addressInfo,
    addressDetail,
    onChangeAddressDetail,

    youtubeUrl,
    onChangeYoutubeUrl,
  };
};
