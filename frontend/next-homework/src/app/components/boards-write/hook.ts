"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { CreateBoardDocument, FetchBoardDocument, UpdateBoardDocument } from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { Address } from "react-daum-postcode";

const useBoardWrite = () => {
  const router = useRouter();
  const params = useParams();

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const [isVaild, setIsVaild] = useState(false);
  const [buttonActiveStyle, setButtonActiveStyle] = useState(false);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  // 이벤트 받아올 변수
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 경고 메시지 변수
  const [ownerVaild, setOwnerVaild] = useState("");
  const [passwordVaild, setPasswordVaild] = useState("");
  const [titleVaild, setTitleVaild] = useState("");
  const [contentVaild, setContentVaild] = useState("");

  // 주소 관련 변수
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  // 모듈
  const successModule = () => {
    Modal.success({
      content: "게시글 등록에 성공헀습니다.",
    });
  };

  const warningModule = () => {
    Modal.warning({
      title: "취소",
      content: "게시글 등록을 취소하시겠습니까?",
    });
  };

  const errorModule = () => {
    Modal.error({
      title: "게시글 등록 실패",
      content: "게시글 등록에 실패했습니다.",
    });
  };

  // 주소 찾기 모달
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data);
    setIsOpen((prev) => !prev);

    setZipcode(data.zonecode);
    setAddress(data.address);
  };

  // onChange 함수 모음
  const onChangeOwner = (event: ChangeEvent<HTMLInputElement>) => {
    setOwner(event.target.value);
    if (event.target.value && password && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setOwnerVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (owner && event.target.value && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setPasswordVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (owner && password && event.target.value && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setTitleVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (owner && password && title && event.target.value) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setContentVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onClickSubmitPostVaildation = async () => {
    try {
      if (isVaild && owner && password && title && content) {
        const result = await createBoard({
          variables: {
            writer: owner,
            password: password,
            title: title,
            contents: content,
          },
        });

        console.log(result);
        // alert("게시글 등록이 완료 되었습니다.");

        successModule();

        router.push(`/boards/${result.data?.createBoard._id}`);
      }
    } catch (error) {
      console.log(error);
      alert(`에러가 발생했습니다. 다시 시도하여 주세요. \n error: ${error}`);

      errorModule();
    }
  };

  const onClickEditPostVaildation = async () => {
    const promptPassword = prompt("게시글 생성 시 입력했던 비밀번호를 입력해주세요.", "");
    const myVariables = {
      boardId: params.boardId,
    };

    console.log(`myVariables: ${JSON.stringify(myVariables)}`);

    // if (title) myVariables.myTitle = title;
    // if (content) myVariables.myContents = content;

    try {
      const result = await updateBoard({
        variables: {
          boardId: String(params.boardId),
          password: promptPassword,
          updateBoardInput: {
            title: title,
            contents: content,
            // youtubeUrl: ,
            // boardArress: {
            //   zipcode: ,
            //   address: ,
            //   addressDetail: ,
            // },
            // image: [""]
          },
        },
      });
      console.log(result);

      alert("수정이 완료되었습니다.");
      // TODO: refetch 시키기
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      console.log(error);
      // alert(`${error?.message}`);
      router.push(`/boards`);
    }
  };

  const onClickCancle = () => {
    warningModule();
    window.location.href = "/boards";
  };

  return {
    data,
    owner,
    password,
    title,
    content,
    zipcode,
    address,
    buttonActiveStyle,
    ownerVaild,
    passwordVaild,
    titleVaild,
    contentVaild,
    onChangeOwner,
    onChangePassword,
    onChangeContent,
    onChangeTitle,
    onClickSubmitPostVaildation,
    onClickEditPostVaildation,
    onClickCancle,
    successModule,
    onToggleModal,
    handleComplete,
    isOpen,
  };
};

export default useBoardWrite;
