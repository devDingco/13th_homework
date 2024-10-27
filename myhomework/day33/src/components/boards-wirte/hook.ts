"use client";

import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "antd";
import { Address } from "react-daum-postcode";

import {
  CreateBoardDocument,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
  FetchBoardDocument,
} from "@/commons/graphql/graphql";
import { IBoardsWriteProps } from "./types";
import { GraphQLError } from "graphql";

export const useBoardsWrite = ({ isEdit }: IBoardsWriteProps) => {
  const router = useRouter();
  const params = useParams();
  console.log("Params:", params);

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

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // 수정 모드에서 기존 데이터 불러오기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
    skip: !isEdit, // 수정 모드일 때만 데이터 요청
  });

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
              zipcode: zipcode || null,
              address: basicAddress || null,
              addressDetail: detailAddress || null,
            },
            youtubeUrl: youtubeLink || null,
          },
        },
      });
      console.log(result);
      resetFormData();
      Modal.success({ content: "게시글 등록에 성공하였습니다." });
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      Modal.error({ content: "에러가 발생하였습니다. 다시 시도해주세요." });
    }
  };

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

    try {
      const myvariables: UpdateBoardMutationVariables = {
        boardId: String(params.boardId),
        password: promptPassword,
        updateBoardInput: {
          boardAddress: {},
        },
      };

      if (inputs.title) myvariables.updateBoardInput.title = inputs.title;
      if (inputs.contents)
        myvariables.updateBoardInput.contents = inputs.contents;

      if (zipcode || basicAddress || detailAddress) {
        // 주소가 하나라도 있을 때만 주소 정보를 포함
        myvariables.updateBoardInput.boardAddress = {
          zipcode: zipcode || null,
          address: basicAddress || null,
          addressDetail: detailAddress || null,
        };
      }

      if (youtubeLink) myvariables.updateBoardInput.youtubeUrl = youtubeLink;

      const result = await updateBoard({ variables: myvariables });

      // 성공적으로 수정된 경우
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/boards/${result.data?.updateBoard._id}`);
      console.log(result.data?.updateBoard._id);
    } catch (error) {
      // 조건부 타입 검사 적용: 에러가 Error 타입인지 확인
      if (error instanceof Error) {
        console.error("Update error:", error.message);

        if (
          (error as { graphQLErrors?: GraphQLError[] }).graphQLErrors?.some(
            (e: GraphQLError) => e.message === "Invalid password"
          )
        ) {
          Modal.error({ content: "비밀번호가 틀렸습니다." });
        } else {
          Modal.error({ content: "오류가 발생했습니다. 다시 시도해주세요." });
        }
      } else {
        console.error("Unknown error", error);
        Modal.error({
          content: "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    }
  };

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const titlePlaceholder = "제목을 입력해 주세요.";
  const contentsPlaceholder = "내용을 입력해 주세요.";
  const adrNum = "01234";
  const adrType = "주소를 입력해 주세요.";
  const adrDetail = "상세주소";
  const youtube = "링크를 입력해 주세요.";

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
    writername,
    passwordPlaceholder,
    titlePlaceholder,
    contentsPlaceholder,
    adrNum,
    adrType,
    adrDetail,
    youtube,
    zipcode,
    basicAddress,
    detailAddress,
    youtubeLink,
  };
};
