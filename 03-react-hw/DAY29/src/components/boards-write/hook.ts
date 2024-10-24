import { IFormDataProps, IUseBoardFormProps } from "./types";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  UploadFileDocument,
} from "@/commons/graphql/graphql";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// #region 필수 입력 필드 배열 정의
const REQUIRED_FIELDS: (keyof IFormDataProps)[] = [
  "writer",
  "password",
  "title",
  "contents",
];

export default function useBoardForm({ isEdit }: IUseBoardFormProps) {
  const [images, setImages] = useState<string[]>(["", "", ""]);

  //#region 폼 데이터 상태 관리
  const [formData, setFormData] = useState<IFormDataProps>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    boardAddress: { zipcode: "", address: "", addressDetail: "" },
    youtubeUrl: "",
    images: ["", "", ""],
  });
  //#endregion

  //#region 초기 데이터 상태 관리 (수정페이지에서)
  const [initialData, setInitialData] = useState<IFormDataProps | null>(null);

  //#region 우편번호 모달창
  const [isOpen, setIsopen] = useState(false);

  //#region GraphQL 뮤테이션 훅
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  const router = useRouter();
  const fileRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const params = useParams(); //동적 라우팅, boardID에 접근한다
  const boardId = params.boardId as string;

  //등록페이지에서 fetchBoard 실행됨 ----> 수정페이지에서만 되어야함
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId,
    },
    skip: !isEdit, // 수정 페이지가 아닌 경우 쿼리 실행을 건너뜀
  });

  //#region useEffect: 그려질 때 처음에 딱 한번 실행?함
  useEffect(() => {
    // 수정 모드, 데이터가 존재할 때만 실행
    if (isEdit && data?.fetchBoard) {
      const initialFormData: IFormDataProps = {
        writer: data.fetchBoard.writer || "",
        password: "",
        title: data.fetchBoard.title || "",
        contents: data.fetchBoard.contents || "",
        boardAddress: {
          zipcode: data.fetchBoard.boardAddress?.zipcode || "",
          address: data.fetchBoard.boardAddress?.address || "",
          addressDetail: data.fetchBoard.boardAddress?.addressDetail || "",
        },
        youtubeUrl: data.fetchBoard.youtubeUrl || "",
        images: data.fetchBoard.images || ["", "", ""],
      };
      // formData와 initialData 상태 업데이트
      setFormData(initialFormData);
      setInitialData(initialFormData);
    }
  }, [isEdit, data]);
  // isEdit와 data를 포함시켜 이 값들이 변경될 때만 효과가 실행되도록 함
  //#endregion

  const onToggleModal = () => {
    setIsopen((prev) => !prev);
  };

  const handleComplete = (data) => {
    console.log("zipcode: ", data.zonecode);
    setFormData((prev) => ({
      ...prev,
      boardAddress: {
        ...prev.boardAddress,
        zipcode: data.zonecode,
        address: data.address,
      },
    }));
    onToggleModal();
  };

  //#region 입력 필드 변경 핸들러
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // 주소 관련 필드들은 boardAddress 객체 안에 넣기
    if (["zipcode", "address", "addressDetail"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        boardAddress: {
          ...prevData.boardAddress,
          [name]: value,
        },
      }));
    } else {
      // 다른 필드들은 최상위 레벨에 유지
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  //#endregion

  //#region 이미지 업로드
  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      const imageUrl = result.data?.uploadFile.url || "";
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = imageUrl;
        return newImages;
      });
      setFormData((prev) => ({
        ...prev,
        images: prev.images?.map((img, i) => (i === index ? imageUrl : img)),
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onClickImage = (index: number) => {
    fileRefs[index].current?.click();
  };

  //#region 버튼 활성화 여부 결정
  const isButtonEnabled = useMemo(() => {
    if (isEdit) {
      // 수정일때: 하나의 필드라도 변경되었는지 확인
      return Object.keys(formData).some(
        (key) =>
          formData[key as keyof IFormDataProps] !==
          initialData?.[key as keyof IFormDataProps]
      );
    } else {
      // 등록일때: 필수 필드가 채워져 있는지 확인
      return REQUIRED_FIELDS.every(
        (field) => (formData[field] as string).trim() !== ""
      );
    }
  }, [formData, initialData, isEdit]);
  // formData, initialData, isEdit이 변경될 때만 재계산
  //#endregion

  //#region 폼 제출 핸들러
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isButtonEnabled) return;

    const variables = {
      ...formData,
      boardAddress: {
        zipcode: formData.boardAddress?.zipcode,
        address: formData.boardAddress?.address,
        addressDetail: formData.boardAddress?.addressDetail,
      },
      images,
    };

    try {
      let updateResult;
      let createResult;
      if (isEdit) {
        // 수정 모드일 때 비밀번호 입력 받기
        const password = prompt(
          "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
        );

        if (password === null) {
          console.log("비밀번호 입력이 취소.");
          return;
        }

        if (!boardId) {
          console.error("boardId가 없습니다.");
          alert("게시글 ID를 찾을 수 없습니다.");
          return;
        }

        // 수정 로직
        updateResult = await updateBoard({
          variables: {
            updateBoardInput: variables,
            password,
            boardId,
          },
        });
        console.log("게시글 수정 성공: ", updateResult);
      } else {
        // 등록 로직
        createResult = await createBoard({
          variables: {
            createBoardInput: variables,
          },
        });
        console.log("게시글 등록 성공: ", createResult);
      }

      // true 시 상세 페이지로 이동 , false 시 등록 페이지로 이동
      const resultBoardId = isEdit
        ? boardId
        : createResult?.data?.createBoard._id;

      router.push(`/boards/${resultBoardId}/`);
    } catch (error: unknown) {
      console.error("Error details:", error);

      if (error instanceof ApolloError) {
        console.log("GraphQL errors:", error.graphQLErrors);
        console.log("Network error:", error.networkError);

        const passwordError = error.graphQLErrors.find(
          (err) => err.extensions?.code === "INVALID_PASSWORD"
        );

        if (passwordError) {
          alert("비밀번호가 틀렸습니다. 다시 시도해주세요.");
        } else {
          alert(
            isEdit
              ? "게시글 수정에 실패했습니다."
              : "게시글 등록에 실패했습니다."
          );
        }
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return {
    handleChange,
    handleSubmit,
    formData,
    isButtonEnabled,
    router,
    onClickImage,
    onChangeFile,
    fileRefs,
    images,
    setIsopen,
    isOpen,
    handleComplete,
    onToggleModal,
  };
}
