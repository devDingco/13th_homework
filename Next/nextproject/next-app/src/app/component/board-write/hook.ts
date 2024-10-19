import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  FetchBoard,
  FetchBoards,
  register,
  UPDATE_BOARD,
} from "../queires/queries";
import { IProps } from "./types";
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

  const [inputs, setInputs] = useState({
    name_id: "",
    title_id: "",
    password_id: "",
    contents_id: "",
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.id);

    setInputs((prev) => ({
      ...prev,
      [event?.target.id]: event?.target.value,
    }));
  };
  // const [name, setName] = useState("");

  // const [password, setPassword] = useState("");

  // const [title, setTitle] = useState(
  //   props.isEdit ? data?.fetchBoard.title : ""
  // );

  // const [contents, setContents] = useState(
  //   props.isEdit ? data?.fetchBoard.contents : ""
  // );

  const [nameblank, setNameBlank] = useState("");

  const [passwordblank, setPasswordBlank] = useState("");

  const [titleblank, setTitleBlank] = useState("");

  const [contentblank, setContentBlank] = useState("");

  // const [isActive, setIsActive] = useState(false);

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
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };
  const [youtubeUrl, setYoutubeUrl] = useState(
    props.isEdit ? data?.fetchBoard.youtubeUrl : ""
  );
  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const [myfunction] = useMutation(register);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  // const isButtonDisabled =
  //   !inputs.name || !inputs.password || !inputs.title || !inputs.contents;

  const checkValid = () => {
    if (inputs.name_id === "") {
      setNameBlank("필수입력 사항입니다.");
    } else {
      setNameBlank("");
    }
    if (inputs.password_id === "") {
      setPasswordBlank("필수입력 사항입니다.");
    } else {
      setPasswordBlank("");
    }
    if (inputs.title_id === "") {
      setTitleBlank("필수입력 사항입니다.");
    } else {
      setTitleBlank("");
    }
    if (inputs.contents_id === "") {
      setContentBlank("필수입력 사항입니다.");
    } else {
      setContentBlank("");
    }
  };

  // 등록하기
  const onClickSignup = async () => {
    console.log(
      inputs.name_id,
      inputs.password_id,
      inputs.title_id,
      inputs.contents_id
    );
    await checkValid();
    try {
      if (
        inputs.name_id !== "" &&
        inputs.title_id !== "" &&
        inputs.contents_id !== "" &&
        inputs.password_id !== ""
      ) {
        const result = await myfunction({
          variables: {
            createBoardInput: {
              writer: inputs.name_id,
              password: inputs.password_id,
              title: inputs.title_id,
              contents: inputs.contents_id,
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
          title: "성공!",
        });
        console.log(result.data.createBoard._id);
        router.push("../../../boards");
      }
    } catch (error) {
      console.log(inputs);
      console.log(error);
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
            title: inputs.title_id,
            contents: inputs.contents_id,
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
    onChangeInput,
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
    address,
    addressDetail,
    addressnum,
    // isButtonDisabled,
    isModalOpen,
    data,
    youtubeUrl,
    inputs,
  };
};
