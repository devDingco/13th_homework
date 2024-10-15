import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FetchBoard, register, UPDATE_BOARD } from "./queries";
import { IProps } from "./types";
import { FetchBoards } from "../board-list/list/queries";
import { Modal } from "antd";
import { Address } from "react-daum-postcode";

export const UseBoardsWrite = (props: IProps) => {
  const router = useRouter();
  const params = useParams(); //라우터 사용 시 파라미터 정보를 가져오기 위한 설정
  const { data } = useQuery(FetchBoard, {
    variables: {
      myboardId: params.boardId,
    },
  });

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [title, setTitle] = useState(
    props.isEdit ? data?.fetchBoard.title : ""
  );

  const [contents, setContents] = useState(
    props.isEdit ? data?.fetchBoard.contents : ""
  );

  const [nameblank, setNameBlank] = useState("");

  const [passwordblank, setPasswordBlank] = useState("");

  const [titleblank, setTitleBlank] = useState("");

  const [contentblank, setContentBlank] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addressnum, setAddressNum] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.zipcode : ""
  );

  // useEffect(() => {
  //   setAddressNum(data?.fetchBoard.boardAddress.zipcode);
  // }, [data]);

  const [address, setAddress] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.address : ""
  );

  const [addressDetail, setAddressDetail] = useState(
    props.isEdit ? data?.fetchBoard.boardAddress.addressDetail : ""
  );

  const [youtubeUrl, setYoutubeUrl] = useState(
    props.isEdit ? data?.fetchBoard.youtubeUrl : ""
  );

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (
      event.target.value !== "" &&
      title !== "" &&
      contents !== "" &&
      password !== ""
    ) {
      return setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (
      name !== "" &&
      title !== "" &&
      contents !== "" &&
      event.target.value !== ""
    ) {
      return setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (
      name !== "" &&
      event.target.value !== "" &&
      contents !== "" &&
      password !== ""
    ) {
      return setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
    if (
      name !== "" &&
      password !== "" &&
      title !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const [myfunction] = useMutation(register);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const isButtonDisabled = !name || !password || !title || !contents;
  const checkValid = () => {
    if (name === "") {
      setNameBlank("필수입력 사항입니다.");
    } else {
      setNameBlank("");
    }
    if (password === "") {
      setPasswordBlank("필수입력 사항입니다.");
    } else {
      setPasswordBlank("");
    }
    if (title === "") {
      setTitleBlank("필수입력 사항입니다.");
    } else {
      setTitleBlank("");
    }
    if (contents === "") {
      setContentBlank("필수입력 사항입니다.");
    } else {
      setContentBlank("");
    }
  };

  // 등록하기
  const onClickSignup = async () => {
    await checkValid;
    try {
      if (name !== "" && title !== "" && contents !== "" && password !== "") {
        const result = await myfunction({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: contents,
              youtubeUrl: youtubeUrl,
              boardAddress: {
                address: address,
                zipcode: addressnum,
                addressDetail: addressDetail,
              },
            },
          },
          refetchQueries: [{ query: FetchBoards }],
        });

        Modal.success({
          title: "성공",
        });
        console.log(result.data.createBoard._id);
        router.push("../../../boards");
      }
    } catch {
      Modal.error({
        title: "에러",
      });
    }
  };

  // 수정하기
  const onClickUpdate = async () => {
    const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    try {
      const result = await updateBoard({
        variables: {
          boardId: params.boardId,
          password: password,
          updateBoardInput: {
            title,
            contents,
            youtubeUrl,
            boardAddress: {
              address,
              addressDetail,
              zipcode: addressnum,
            },
          },
        },
      });
      Modal.success({
        title: "성공",
      });
      router.push(`../../boards/${result.data.updateBoard._id}`);
    } catch {
      Modal.error({
        title: "에러",
      });
    }
  };

  // 수정상태일때 취소버튼 클릭 시 상세정보로 이동, 아니면 목록으로 이동
  const onClickGoToList = () => {
    router.push("../../boards");
  };
  const onClickGoToDetail = () => {
    router.push(`../../boards/${data.fetchBoard._id}`);
  };

  // 우편 검색
  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleCpmplete = (data: Address) => {
    const { address, zonecode } = data;
    setAddressNum(zonecode);
    setAddress(address);
    onToggleModal();
  };

  return {
    onChangeContent,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onClickUpdate,
    onClickGoToList,
    onClickGoToDetail,
    onClickSignup,
    handleCpmplete,
    onToggleModal,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    nameblank,
    passwordblank,
    titleblank,
    contentblank,
    name,
    title,
    contents,
    password,
    address,
    addressDetail,
    addressnum,
    isActive,
    isButtonDisabled,
    isModalOpen,
    data,
    youtubeUrl,
  };
};
