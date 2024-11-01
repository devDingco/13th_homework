import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import {
  CREATE_BOARD,
  FETCH_BOARD,
  UPDATE_BOARD,
  UPLOAD_FILE,
} from "./queries";
import { IBoardWriteprops } from "./type";
import { Address } from "react-daum-postcode";
import { FetchBoardQuery } from "@/commons/graphql/graphql";

export const useBoardsWrite = (props: IBoardWriteprops) => {
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    title: "",
  });

  const [aboutUpLoadBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const router = useRouter();
  const params = useParams(); // useParams() 호출

  const { data, refetch } = useQuery<FetchBoardQuery>(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  const [content, setContent] = useState(data?.fetchBoard.contents || "");

  // 수정 모드에서 데이터를 불러와 초기값 설정
  useEffect(() => {
    if (props.isEdit && data?.fetchBoard) {
      setInputs((prev) => ({
        ...prev,
        writer: data.fetchBoard.writer || "",
        title: prev.title || data.fetchBoard.title || "",
      }));
      setContent(data.fetchBoard.contents || "");
    }
  }, [props.isEdit, data]);

  const [imageUrl, setImageUrl] = useState(data?.fetchBoard.images?.[0] || "");
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const [uploadFile] = useMutation(UPLOAD_FILE);

  useEffect(() => {
    if (!props.isEdit) return; // isEdit이 false면 실행하지 않음
    const enteredPassword = prompt("비밀번호를 입력하세요");

    if (!enteredPassword) {
      alert("비밀번호가 입력되지 않았습니다.");
      router.push("/boards");
      return;
    }

    const updateBoardFunc = async () => {
      try {
        const result = await updateBoard({
          variables: {
            updateBoardInput: {
              title: inputs.title || "", // 제목 수정 여부 체크
              contents: content || "", // 내용 수정 여부 체크
              youtubeUrl: youtubeUrl || "",
              boardAddress: {
                zipcode: zoneCode || "",
                address: address || "",
                addressDetail: addressDetail || "",
              },
              images: [imageUrl],
            },
            password: enteredPassword,
            boardId: params.boardId,
          },
        });
        setInputs((prev) => ({
          ...prev,
          password: enteredPassword,
        }));
        console.log(result);
      } catch (error: any) {
        console.log(error.message);

        if (error.message.includes("비밀번호가 일치하지 않습니다.")) {
          alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
          router.push("/boards");
        } else {
          alert("다른 에러가 발생했습니다.");
          router.push("/boards");
          console.log("알수없는 에러", error);
        }
      }
    };

    updateBoardFunc();
  }, [props.isEdit]);

  useEffect(() => {
    // 수정 모드가 아닌 경우에만 필수 입력사항을 체크하여 버튼 활성화
    if (!props.isEdit) {
      setIsAllFilled(
        !!(inputs.writer && inputs.password && inputs.title && content)
      );
    } else {
      setIsAllFilled(true); // 수정 모드에서는 항상 true로 설정하여 버튼 활성화
    }
  }, [inputs.writer, inputs.password, inputs.title, content, props.isEdit]);

  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const youtubeOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
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
            writer: inputs.writer,
            password: inputs.password,
            title: inputs.title,
            contents: content,
            youtubeUrl: youtubeUrl,
            boardAddress: {
              zipcode: zoneCode,
              address: address,
              addressDetail: addressDetail,
            },
            images: [imageUrl],
          },
        },
      });
      console.log("result", result);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.log(error);
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    try {
      const updateBoardInput = {
        title: inputs.title || data?.fetchBoard.title,
        contents: content || data?.fetchBoard.contents,
        youtubeUrl: youtubeUrl !== "" ? youtubeUrl : null,
        boardAddress: {
          zipcode: zoneCode !== "" ? zoneCode : null,
          address: address !== "" ? address : null,
          addressDetail: addressDetail !== "" ? addressDetail : null,
        },
        images: isImageDeleted
          ? []
          : imageUrl
          ? [imageUrl]
          : data?.fetchBoard.images || [],
      };

      const result = await updateBoard({
        variables: {
          boardId: String(params.boardId),
          password: inputs.password,
          updateBoardInput,
        },
      });

      alert("수정이 완료되었습니다.");
      await refetch();
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      if (error.message.includes("비밀번호가 일치하지 않습니다.")) {
        alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
      } else {
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const [zoneCode, setZoneCode] = useState(
    data?.fetchBoard.boardAddress?.zipcode || ""
  );
  const [address, setAddress] = useState(
    data?.fetchBoard.boardAddress?.address || ""
  );
  const [addressDetail, setAddressDetail] = useState(
    data?.fetchBoard.boardAddress?.addressDetail || ""
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    data?.fetchBoard.youtubeUrl || ""
  );

  const handleComplete = (data: Address) => {
    setZoneCode(data.zonecode); // 우편번호를 상태에 저장

    // 사용자가 선택한 주소 타입에 따라 도로명 주소 또는 지번 주소를 설정
    if (data.userSelectedType === "R") {
      setAddress(data.roadAddress); // 도로명 주소 선택 시
    } else if (data.userSelectedType === "J") {
      setAddress(data.jibunAddress); // 지번 주소 선택 시
    }
    onToggleModal();
  };

  //이미지 업로드
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    try {
      const result = await uploadFile({
        variables: { file },
      });

      if (result.data?.uploadFile.url) {
        setImageUrl(result.data.uploadFile.url); // 새 이미지 URL 설정
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const onClickImage = () => {
    fileRef.current?.click(); //현재 참조하고 있는 파일 인풋태그를 클릭하게 된다.
  };
  const imgDeleted = (event) => {
    event.stopPropagation();
    setImageUrl("");
    setIsImageDeleted(true);
  };
  return {
    contentOnChange,
    signupButtonHandler,
    isAllFilled,
    handleComplete,
    setZoneCode,
    zoneCode,
    onToggleModal,
    isModalOpen,
    address,
    setAddress,
    addressDetail,
    setAddressDetail,
    data,
    youtubeOnChange,
    onChangeInputs,
    onChangeFile,
    fileRef,
    onClickImage,
    imageUrl,
    imgDeleted,
  };
};
