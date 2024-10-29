"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { CREATE_BOARD, FETCH_BOARD, UPDATE_BOARD } from "./queries";

// antd로 모달불러옴
import { Modal } from "antd";

export const useBoardsWrite = (props) => {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });
  // 작성자, 비번, 제목, 내용 인풋 싹다 모아서 관리함.
  const [requireInputs, setRequireInputs] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  //TODO: 에러부분도 충분히 리팩토링 가능해 보이지만 추후 시간이 나면 그때 바꿔보기

  // 작성자인풋, 작성자인풋에러
  const [writerError, setWriterError] = useState("");
  // 비번인풋, 비번인풋에러
  const [passwordError, setPasswordError] = useState("");
  // 제목인풋, 제목인풋에러
  const [titleError, setTitleError] = useState("");
  // 내용인풋, 내용인풋에러
  const [contentsError, setContentsError] = useState("");

  // 상황에 따른 버튼 활성화 or 비활성화
  const [isActive, setIsActive] = useState(false);

  const [zipcode, setZipcode] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.zipcode : ""
  ); // zonecode(우편번호) 상태 추가

  const [address, setAddress] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.address : ""
  ); // roadAddress(주소) 상태 추가
  const [addressDetail, setAddressDetail] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.addressDetail : ""
  ); // 상태 변수 선언

  console.log(data?.fetchBoard.boardAddress.zipcode);
  console.log("zipcode", zipcode);
  console.log(data?.fetchBoard.boardAddress.address);
  console.log(data?.fetchBoard.boardAddress.addressDetail);

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [images, setImages] = useState("");

  // 인풋 패스워드 검사해서 수정할지말지?
  const [isOpen, setIsOpen] = useState(false); // 주소모달 토글기능

  // 우편번호 조회하는 곳
  const onToggleModal = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data) => {
    // console.log(data);
    console.log(data?.zonecode);
    setZipcode(data?.zonecode); // zonecode 업데이트
    console.log(data?.roadAddress);
    setAddress(data?.roadAddress); // roadAddress 업데이트
    onToggleModal(event);
  };

  const onChangerequireInputs = (event) => {
    setRequireInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
    if (
      requireInputs.writer !== "" &&
      requireInputs.password !== "" &&
      requireInputs.title !== "" &&
      requireInputs.contents !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const [나의함수] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  //
  //
  //
  //
  //

  const onCLickUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputPassword = prompt(
      "글을 작성할 때 입력하셨던 비밀번호를 입력해주세요"
    );

    if (inputPassword === "") {
      Modal.error({
        content: "생성했던 비밀번호를 입력해주세요.",
      });
      return;
    }

    const myvariables = {
      boardId: params.boardId, // 수정할 게시물의 ID
      password: inputPassword, // 입력받은 비밀번호

      title: requireInputs.title || undefined, // 수정할 제목
      contents: requireInputs.contents || undefined, // 수정할 내용
      youtubeUrl: youtubeUrl || undefined,
      images: images || undefined,
      zipcode: zipcode || props.data?.fetchBoard.boardAddress?.zipcode, // 수정할 우편번호
      address: address || props.data?.fetchBoard.boardAddress?.addresss, // 수정할 주소
      //TODO 수정했다 안되면 돌려라
      addressDetail:
        addressDetail || props.data?.fetchBoard.boardAddress?.addressDetail, // 수정할 상세 주소

      // 추가적인 필드도 필요하다면 여기에 포함
    };

    try {
      const result = await updateBoard({
        variables: myvariables,
      });
      console.log(result);
      if (result.data) {
        Modal.success({
          content: "게시물 수정 완료되었습니다.",
        });
        router.push(`/boards/${result.data.updateBoard._id}`);
      }
      // 밑에 있는 error이 es린트때문에 줄생겨서 밑에 주석으로 지운상태
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Modal.error({
        content: "비밀번호가 맞지 않습니다.",
      });
    }
  };

  //
  //
  //
  //
  //

  const onClickSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("작성자 이름은:", requireInputs.writer);
    console.log("작성자 비번은:", requireInputs.password);
    console.log("게시물 제목은:", requireInputs.title);
    console.log("게시물 내용은:", requireInputs.contents);
    console.log("유튜브 링크는:", youtubeUrl);

    // 유효성을 우선 true로 박아두고 문제가 1개라도 생긴다면 즉시 false로 바뀌므로
    // 마지막에 alert로 알리는 것을 못함.

    let isValid = true;

    //TODO 이 부분도 유사해서 리팩토링해서 줄일 각이 보이는데 나중에 시간나면 시도해보기

    // 작성자 확인
    if (requireInputs.writer === "") {
      setWriterError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setWriterError("");
    }

    // 비밀번호 확인
    if (requireInputs.password === "") {
      setPasswordError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 제목 확인
    if (requireInputs.title === "") {
      setTitleError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // 내용 확인
    if (requireInputs.contents === "") {
      setContentsError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setContentsError("");
    }

    // 제출 전 모든 부분이 만족해서 true인지 확인하고 alert을 띄울지 정하는 곳

    try {
      if (isValid) {
        Modal.success({
          content: "게시물 등록이 완료되었습니다!",
        });

        // const result = await 나의함수({
        //   variables: {
        //     createBoardInput: {
        //       writer: writer,
        //       password: password,
        //       title: title,            => variables 이렇게 지정하면 에러남 그냥 키: 벨류만 딱 두기
        //       contents: content,
        //       youtubeUrl: youtubeUrl,
        //       boardAddress: {
        //         zipcode: zipcode,
        //         address: address,
        //         addressDetail: addressDetail,
        //       },
        //     },
        //   },
        // });

        const result = await 나의함수({
          variables: {
            ...requireInputs, // => writer: writer, / password: password, / title: title, / contents: contents,
            youtubeUrl: youtubeUrl,
            images: [images],
            zipcode: zipcode,
            address: address,
            addressDetail: addressDetail,
          },
        });
        console.log(result);
        router.push(`/boards/${result.data.createBoard._id}`);
      } else {
        Modal.error({
          content: "필수내용을 채워 주세요!",
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  // console.log(props.data?.fetchBoard.contents);
  return {
    onChangerequireInputs,
    onCLickUpdate,
    onClickSignup,
    onChangeYoutubeUrl,
    writerError,
    // 아래부터 주소
    isOpen,
    onToggleModal,
    handleComplete,
    zipcode,
    address,
    addressDetail,
    setAddressDetail,
    setAddress,
    setZipcode,
    data,
    // password,
    images,
    setImages,
  };
};
