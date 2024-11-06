"use client";

import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "antd";
import { Address } from "react-daum-postcode";

import {
  CreateBoardDocument,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
  FetchBoardDocument,
  UploadFileDocument,
} from "@/commons/graphql/graphql";
import { IBoardsWriteProps } from "./types";
import { checkValidationFile } from "@/commons/libraries/validation";
import { GraphQLError } from "graphql";

export const useBoardsWrite = ({ isEdit }: IBoardsWriteProps) => {
  const router = useRouter();
  const params = useParams();

  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [zipcode, setZipcode] = useState("");
  const [basicAddress, setBasicAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");

  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(Array(3).fill(false));

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  // 수정 모드에서 기존 데이터 불러오기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
  });

  // 원래 작성되어 있던 값 가져오는 useEffect
  useEffect(() => {
    if (isEdit && data) {
      setInputs((prev) => ({
        ...prev,
        writer: data.fetchBoard?.writer || "",
        title: data.fetchBoard?.title || "",
        contents: data.fetchBoard?.contents || "",
      }));
      setZipcode(data.fetchBoard?.boardAddress?.zipcode || "");
      setBasicAddress(data.fetchBoard?.boardAddress?.address || "");
      setDetailAddress(data.fetchBoard?.boardAddress?.addressDetail || "");
      setYoutubeLink(data.fetchBoard?.youtubeUrl || "");
      setImageUrl(data.fetchBoard?.images || ["", "", ""]);
    }
  }, [isEdit, data]);

  // useEffect로 입력값 유효성 체크하여 버튼 활성화
  useEffect(() => {
    if (isEdit) {
      setIsActive(!inputs.title.trim() || !!inputs.contents.trim());
    } else {
      const isFieldsFilled =
        !!inputs.writer.trim() &&
        !!inputs.password.trim() &&
        !!inputs.title.trim() &&
        !!inputs.contents.trim();

      setIsActive(isFieldsFilled);
    }
  }, [inputs, isEdit]);

  const onChangeInputs = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onClickSearchAddress = () => {
    setIsOpen((prev) => !prev);
  };

  const postcodeComplete = (data: Address) => {
    setZipcode(data.zonecode);
    setBasicAddress(data.address);
    onClickSearchAddress();
  };

  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  const onChangeYoutube = (event: ChangeEvent<HTMLInputElement>) => {
    const youtubeLink = event.target.value;
    setYoutubeLink(youtubeLink);
  };

  const onMouseHover = (index: number) => {
    const newHoverState = [...isHover];
    newHoverState[index] = true; // 해당 인덱스만 true로 설정
    setIsHover(newHoverState);
  };

  const onMouseNoneHover = (index: number) => {
    const newHoverState = [...isHover];
    newHoverState[index] = false; // 해당 인덱스만 false로 설정
    setIsHover(newHoverState);
  };

  // string 또는 비어있는 array를 기본값으로 둔 useState
  const [imageUrl, setImageUrl] = useState<string[]>(["", "", ""]);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // 배열로 들어오는 이유 : <input type="file" multiple /> 일 때, 여러개 드래그 가능
    event.stopPropagation();
    if (!event.target.files) return;
    const file = event.target.files?.[0];
    const id = event.target.id;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });

    const newImages = [...imageUrl];
    newImages[Number(id)] = result.data?.uploadFile.url ?? ""; // 기존 이미지들을 복사한 뒤, 추가로 올린 사진을 뒤에 덧붙여서 연결하기
    setImageUrl(newImages);
  };

  const onClickRemovePrevImg = (
    event: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    event.stopPropagation();

    const updatedImageUrls = [...imageUrl];
    updatedImageUrls[index] = ""; // 해당 인덱스의 이미지를 제거

    // 상태 업데이트
    setImageUrl(updatedImageUrls);
  };

  const fileRefArray = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // ref array 구조
  const onClickImage = (index: number) => {
    if (fileRefArray[index].current) {
      fileRefArray[index].current.click();
      // 해당 Input 요소 클릭
    }
  };

  const registButton = async () => {
    if (
      !inputs.writer.trim() ||
      !inputs.password.trim() ||
      !inputs.title.trim() ||
      !inputs.contents.trim()
    ) {
      Modal.error({
        content: "작성자, 비밀번호, 제목, 내용은 비워둘 수 없습니다.",
      });
      return;
    }

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...inputs,
            boardAddress: {
              zipcode: zipcode,
              address: basicAddress,
              addressDetail: detailAddress,
            },
            images: imageUrl,
            youtubeUrl: youtubeLink,
          },
        },
      });
      resetFormData();
      Modal.success({ content: "게시글 등록에 성공하였습니다." });
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      console.log("🚀 ~ registButton ~ error:", error);
      Modal.error({ content: "에러가 발생하였습니다. 다시 시도해주세요." });
    }
  };

  // 유효성 검증을 if문 여러개 걸어서 했더니 데이터가 정상적으로 들어가지는데도 어디서 문제가 생겨 수정 기능이 작동하지 않는지 확인이 어려워서 유효성 체크를 필수적인 것만 하도록 간단하게 변경
  const onClickUpdate = async () => {
    // 입력값 유효성 체크: 수정에 필요한 필드가 모두 채워졌는지 확인
    if (!inputs.title.trim() || !inputs.contents.trim()) {
      Modal.warning({ content: "제목과 내용은 비워둘 수 없습니다." });
      return;
    }

    const promptPassword = prompt("비밀번호를 입력해주세요");
    if (!promptPassword) {
      Modal.warning({ content: "비밀번호가 입력되지 않았습니다." });
      return;
    }
    console.log("🚀 ~ onClickUpdate ~ promptPassword:", promptPassword);

    const myvariables: UpdateBoardMutationVariables = {
      boardId: String(params.boardId), // boardId는 ID! 타입, String으로 변환 후 전달
      password: promptPassword, // 비밀번호는 optional, 필수로 전달되면 문제 없음
      updateBoardInput: {
        title: inputs.title.trim() || null,
        contents: inputs.contents.trim() || null,
        boardAddress: {
          zipcode: zipcode || null,
          address: basicAddress || null,
          addressDetail: detailAddress || null,
        },
        youtubeUrl: youtubeLink || null,
        images: imageUrl || null,
      },
    };

    try {
      const result = await updateBoard({ variables: myvariables });
      console.log("🚀 ~ onClickUpdate ~ result:", result);
      // 성공적으로 수정된 경우
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error) {
      console.log("🚀 ~ onClickUpdate ~ error:", error);
      if (
        (error as { graphQLErrors?: GraphQLError[] }).graphQLErrors?.some(
          (e: GraphQLError) => e.message === "Invalid password"
        )
      ) {
        Modal.error({ content: "비밀번호가 틀렸습니다." });
      } else {
        Modal.error({ content: "오류가 발생했습니다. 다시 시도해주세요." });
      }
    }
  };

  function resetFormData() {
    // 폼 초기화
    setInputs({
      writer: "",
      password: "",
      title: "",
      contents: "",
    });
    setZipcode("");
    setBasicAddress("");
    setDetailAddress("");
    setYoutubeLink("");
  }

  const cancelButton = () => {
    resetFormData();
    Modal.info({
      content: `${isEdit ? "수정" : "등록"}이 취소되었습니다.`,
      onOk: () => {
        router.push(`/boards/${params.boardId}`); // 확인 버튼 클릭 시 이동
      },
    });
  };

  return {
    onChangeInputs,
    registButton,
    onClickUpdate,
    cancelButton,
    onClickSearchAddress,
    postcodeComplete,
    onChangeDetailAddress,
    onChangeYoutube,
    isActive,
    isOpen,
    zipcode,
    basicAddress,
    detailAddress,
    youtubeLink,
    onClickImage,
    onChangeFile,
    imageUrl,
    fileRefArray,
    isHover,
    onMouseHover,
    onMouseNoneHover,
    onClickRemovePrevImg,
  };
};
