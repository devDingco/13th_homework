"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { Modal } from "antd";
import { Address } from "react-daum-postcode";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";

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
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // 경고 메시지 변수
  const [writerVaild, setWriterVaild] = useState("");
  const [passwordVaild, setPasswordVaild] = useState("");
  const [titleVaild, setTitleVaild] = useState("");
  const [contentVaild, setContentVaild] = useState("");

  // 주소 관련 변수
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // 모듈
  // TODO: 게시글 등록 여부 알리는 토스트 띄워주기
  // TODO: 취소 버튼 누르면 아래 모달 보여주고 확인 시 넘어가기
  const warningModule = () => {
    Modal.warning({
      title: "취소",
      content: "게시글 등록을 취소하시겠습니까?",
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
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value && password && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setWriterVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (writer && event.target.value && title && content) {
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
    if (writer && password && event.target.value && content) {
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
    if (writer && password && title && event.target.value) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setContentVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onClickSubmitPostVaildation = async () => {
    try {
      if (isVaild && writer && password && title && content) {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: content,
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: zipcode,
                address: address,
                addressDetail: addressDetail,
              },
            },
          },
        });

        console.log(result);
        // alert("게시글 등록이 완료 되었습니다.");

        router.push(`/boards/${result.data?.createBoard._id}`);
      }
    } catch (error) {
      console.log(error);
      alert(`에러가 발생했습니다. 다시 시도하여 주세요. \n error: ${error}`);
    }
  };

  const onClickEditPostVaildation = async () => {
    const promptPassword = prompt(
      "게시글 생성 시 입력했던 비밀번호를 입력해주세요.",
      ""
    );
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
            youtubeUrl: youtubeUrl,
            // boardArress: {
            //   zipcode: ,
            //   address: ,
            //   addressDetail: ,
            // },
            // TODO: 이미지 수정
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
    writer,
    password,
    title,
    content,
    zipcode,
    address,
    buttonActiveStyle,
    writerVaild,
    passwordVaild,
    titleVaild,
    contentVaild,
    onChangeWriter,
    onChangePassword,
    onChangeContent,
    onChangeTitle,
    onChangeYoutubeUrl,
    onChangeAddressDetail,
    onClickSubmitPostVaildation,
    onClickEditPostVaildation,
    onClickCancle,
    onToggleModal,
    handleComplete,
    isOpen,
  };
};

export default useBoardWrite;
