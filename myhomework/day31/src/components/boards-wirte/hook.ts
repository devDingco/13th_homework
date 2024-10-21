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

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      setWriter(data.fetchBoard?.writer || "");
      setTitle(data.fetchBoard?.title || "");
      setContent(data.fetchBoard?.contents || "");
      setZipcode(data.fetchBoard?.boardAddress?.zipcode || "");
      setBasicAddress(data.fetchBoard?.boardAddress?.address || "");
      setDetailAddress(data.fetchBoard?.boardAddress?.addressDetail || "");
      setYoutubeLink(data.fetchBoard?.youtubeUrl || "");
    }
  }, [isEdit, data]);

  // useEffect로 입력값 유효성 체크하여 버튼 활성화
  useEffect(() => {
    if (isEdit) {
      setIsActive(!!title.trim() || !!content.trim());
    } else {
      setIsActive(
        !!writer.trim() &&
          !!password.trim() &&
          !!title.trim() &&
          !!content.trim()
      );
    }
  }, [writer, password, title, content, isEdit]);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickSearchAddress = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
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
      !writer.trim() ||
      !password.trim() ||
      !title.trim() ||
      !content.trim()
    ) {
      Modal.error({
        content: "작성자, 비밀번호, 제목, 내용은 비워둘 수 없습니다.",
      });
      return; // 유효성 검사를 통과하지 못하면 함수 실행 중단
    }

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: writer,
            password: password,
            title: title,
            contents: content,
            boardAddress: {
              zipcode: zipcode || null,
              address: basicAddress || null,
              addressDetail: detailAddress || null,
            },
          },
        },
      });
      console.log(result);
      resetFormData();
      Modal.success({ content: "게시글 등록에 성공하였습니다." });

      router.push(`/boards/${result.data?.createBoard._id}`);
      console.log(result.data?.createBoard._id);
    } catch {
      Modal.error({ content: "에러가 발생하였습니다. 다시 시도해주세요." });
    }
  };

  const onClickUpdate = async () => {
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
          boardAddress: {
            zipcode: zipcode || undefined,
            address: basicAddress || undefined,
            addressDetail: detailAddress || undefined,
          },
        },
      };

      if (title) myvariables.updateBoardInput.title = title;
      if (content) myvariables.updateBoardInput.contents = content;
      if (zipcode) {
        myvariables.updateBoardInput.boardAddress = {
          ...myvariables.updateBoardInput.boardAddress,
          zipcode,
        };
      }
      if (basicAddress) {
        myvariables.updateBoardInput.boardAddress = {
          ...myvariables.updateBoardInput.boardAddress,
          address: basicAddress,
        };
      }
      if (detailAddress) {
        myvariables.updateBoardInput.boardAddress = {
          ...myvariables.updateBoardInput.boardAddress,
          addressDetail: detailAddress,
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
    const el = document.querySelectorAll("input, textarea");
    for (let i = 0; i < el.length; i++) {
      const element = el[i] as HTMLInputElement | HTMLTextAreaElement;
      element.value = "";
    }
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
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    registButton,
    onClickUpdate,
    cancelButton,
    onClickSearchAddress,
    handleComplete,
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
