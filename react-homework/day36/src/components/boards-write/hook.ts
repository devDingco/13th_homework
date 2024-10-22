import {
  BoardAddressInput,
  CreateBoardDocument,
  FetchBoardDocument,
  FetchBoardQuery,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
  UploadFileDocument,
} from "@/commons/graphql/graphql";
import { IErrors, IInputs } from "./types";
import { ApolloError, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { errorModal, successModal } from "@/utils/modal";
import { Address } from "react-daum-postcode";
import { checkValidationFile } from "@/utils/validation-file";

export const useBoardsWrite = (data?: FetchBoardQuery | undefined) => {
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
    zipcode: "",
    address: "",
  });

  // 상세주소 state
  const [addressDetail, setAddressDetail] = useState("");
  // youtube Url
  const [youtubeUrl, setYoutubeUrl] = useState("");
  // image Url
  const [imageUrl, setImageUrl] = useState(["", "", ""]);

  // 새로고침해도 주소 인풋, 파일 유지
  useEffect(() => {
    if (!data) return;
    setAddressInfo({
      zipcode: data?.fetchBoard?.boardAddress?.zipcode || "",
      address: data?.fetchBoard?.boardAddress?.address || "",
    });
    setImageUrl(data?.fetchBoard?.images || ["", "", ""]);
  }, [data]);
  const fileRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // modal 토글 - password
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // modal password
  const [modalPassword, setModalPassword] = useState("");
  // modal 토글 - zipcode
  const [isZipCodeModalOpen, setIsZipCodeModalOpen] = useState(false);

  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

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
      return newInputs;
    });
  };

  // input state들의 값이 모두 빈 문자열이 아니면
  const allInputFilled = Object.values(inputs).every((input) => input !== "");

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

  // 이미지업로드버튼 클릭 시
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    let imageId = Number(event.target.id);
    const file = event.target.files?.[0];
    console.log(file);

    // 검증 실패시 OnChangeFile함수 즉시 종료
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });

    const fileUrl = result?.data?.uploadFile?.url;
    if (!fileUrl) return;

    setImageUrl((prev) =>
      prev.map((image, index) => (index === imageId ? fileUrl : image))
    );
  };

  // delete버튼 클릭 시 이미지 미리보기 삭제
  const onClickDelete = (event: MouseEvent<HTMLImageElement>) => {
    // 이벤트버블링 막기 (파일 열기)
    event.stopPropagation();
    const imageId = event.currentTarget.id;
    console.log("삭제할 이미지 아이디: ", imageId);
    // 선택된 아이디 는 빈문자열로 , 아니면 그대로
    const deletedImageUrl = imageUrl.map((image, index) =>
      index !== Number(imageId) ? image : ""
    );
    setImageUrl(deletedImageUrl);
  };
  console.log(imageUrl);

  // file버튼 클릭해주기
  const onClickImage = (event: MouseEvent<HTMLInputElement>) => {
    const id = event.currentTarget.id;
    const index = Number(id);
    fileRefs[index]?.current?.click();
  };

  // 구조분해할당
  const { writer, password, title, contents } = inputs;
  const { zipcode, address } = addressInfo;
  // 등록하기 - graphql state 전달
  const boardSubmit = async () => {
    try {
      // graphql 요청
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
            images: imageUrl,
            youtubeUrl,
            boardAddress: {
              zipcode,
              address,
              addressDetail,
            },
          },
        },
      });
      console.log("등록한 게시글:", result?.data?.createBoard);
      const navigateToDetail = () => {
        router.push(`/boards/${result.data?.createBoard._id}`);
      };
      successModal("게시글을 등록하였습니다 😊", navigateToDetail);
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

  // 수정하기
  const updateBoardSubmit = async () => {
    const { title, contents } = inputs;
    const variables: UpdateBoardMutationVariables = {
      updateBoardInput: {
        ...(title && { title }),
        ...(contents && { contents }),
        ...(youtubeUrl && { youtubeUrl }),
        images: imageUrl,
      },
      password: modalPassword,
      boardId,
    };

    const boardAddress: BoardAddressInput = {};

    // 주소가 수정되었으면 boardAddress 객체에 넣기
    if (addressInfo.zipcode !== data?.fetchBoard?.boardAddress?.zipcode)
      boardAddress.zipcode = addressInfo.zipcode;
    if (addressInfo.address !== data?.fetchBoard?.boardAddress?.address)
      boardAddress.address = addressInfo.address;
    if (addressDetail) boardAddress.addressDetail = addressDetail;
    // 주소객체 있으면 넣기
    if (Object.keys(boardAddress).length !== 0)
      variables.updateBoardInput.boardAddress = boardAddress;

    try {
      const result = await updateBoard({
        variables,
        refetchQueries: [{ query: FetchBoardDocument, variables: { boardId } }],
      });
      console.log("update: ", result);

      // (success모달에서 확인 누르면) 디테일페이지로 이동하는 함수
      const navigateToDetail = () => {
        router.push(`/boards/${boardId}`);
      };
      successModal("수정이 완료되었습니다😊", navigateToDetail);
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
  };

  // password modal 완료 버튼
  const handleOkPasswordModal = () => {
    // 수정하기
    updateBoardSubmit();
    // 모달 닫기
    onTogglePasswordModal();
  };

  // 모달 창 password 입력
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setModalPassword(event.target.value);
  };

  // 우편번호 검색하여 주소 선택 했을 때
  const handleCompleteZipcodeModal = (data: Address) => {
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
    addressInfo,
    errors,
    allInputFilled,
    isPasswordModalOpen,
    isZipCodeModalOpen,
    fileRefs,
    imageUrl,
    onChangeInput,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onChangeFile,
    onChangePassword,
    onClickImage,
    onClickDelete,
    onClickRegister,
    onClickEditCancel,
    onClickRegisterCancel,
    onTogglePasswordModal,
    onToggleZipCodeModal,
    handleOkPasswordModal,
    handleCompleteZipcodeModal,
  };
};
