"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";

export default function useBoardsWrite(props) {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      myid: String(params?.boardId),
    },
    skip: !props.isEdit,
    onCompleted: (data) => {
      // onCompleted : useQuery()에 있는 함수로 쿼리가 성공적으로 완료 되었을때 실행되는 콜백함수
      if (props.isEdit && data?.fetchBoard) {
        setWriter(data?.fetchBoard.writer || "");
        setPassword(password); // 비밀번호는 프론트에서 볼 수 없다
        setTitle(data?.fetchBoard.title || "");
        setContents(data?.fetchBoard.contents || "");

        // 나머지 state
        setpostCode(data?.fetchBoard.boardAddress?.zipcode || "");
        setRoadAddress(data?.fetchBoard.boardAddress?.address || "");
        setDetailAddress(data?.fetchBoard.boardAddress?.addressDetail || "");
        setYoutubeUrl(data?.fetchBoard.youtubeUrl || "");
        // console.log(data?.fetchBoard.writer);
        // console.log(data?.fetchBoard.boardAddress?.address);
        // console.log("Fetch Data:::::", postCode);
        // console.log("RoadAddress::::", roadAddress);
      }
    },
  });
  //   console.log(data);
  console.log(props.isEdit);

  // 필수값 state
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 나머지 state
  const [postCode, setpostCode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // 에러메세지 state
  const [errorWMeg, setErrorWMeg] = useState("");
  const [errorPMeg, setErrorPMeg] = useState("");
  const [errorTMeg, setErrorTMeg] = useState("");
  const [errorCMeg, setErrorCMeg] = useState("");
  // state에서는 사라지고 input()에서 안사라짐
  const [isActive, setActive] = useState(false);
  //1. 버튼은 false  색 비활성화함
  //2. state변수 문자열이 모두 채워졌을때 버튼 색을 활성화시켜라

  // 모달 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isModalContent, setIsModalContent] = useState(false);
  const [createResultData, setCreateResultData] = useState(null);

  const [myCreateBoard] = useMutation(CreateBoardDocument);
  const [myUpdateBoard] = useMutation(UpdateBoardDocument);

  const handleChangWriterMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setWriter(event.target.value);
    if (event.target.value && password && title && contents)
      return setActive(true);
    setActive(false);
  };

  const handleChangPwMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setPassword(event.target.value);
    if (writer && event.target.value && title && contents)
      return setActive(true);
    setActive(false);
  };

  const handleChangTitleMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setTitle(event.target.value);
    if (writer && password && event.target.value && contents)
      return setActive(true);
    setActive(false);
  };

  const handleChangContentsMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setContents(event.target.value);

    if (writer && password && title && event.target.value)
      return setActive(true);
    setActive(false);
  };

  const onChangDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setDetailAddress(event.target.value);
  };

  const onChangYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setYoutubeUrl(event.target.value);
  };

  // 우편주소 버튼 핸들러
  const onClickAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  // 우편주소 날리기
  const handleComplete = (data) => {
    console.log(data);
    setpostCode(data.zonecode);
    setRoadAddress(data.address);
    setIsAddressModalOpen(false);
  };

  // * 모달 기능
  // 파라미터는 항상 일치하지 않아도 실행된다 : 보내주는곳과 받는곳의 매개변수의 수와 이름이 완전히 일치하지 않아도 실행된다
  // 호출하는 쪽에서 보내주는 인자가 없어도, 아래의 함수는 undefined로 실행된다.
  // 순서도 상관없다
  const handleOk = (createResultData) => {
    console.log(createResultData, "gg");
    setIsModalOpen(false);
    setIsAddressModalOpen(false);
    if (createResultData === undefined) return;
    console.log("핸들오케이작동");
    router.push(`/boards/${createResultData?.data?.createBoard?._id}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddressModalOpen(false);
  };

  // 게시물 등록하기 기능
  const handlerOnclickAdd = async () => {
    try {
      if (!writer) {
        setErrorWMeg("필수입력 사항입니다");
      } else {
        setErrorWMeg("");
      }
      if (password.length === 0) {
        setErrorPMeg("필수입력 사항입니다");
      } else {
        setErrorPMeg("");
      }
      if (!title) {
        setErrorTMeg("필수입력 사항입니다");
      } else {
        setErrorTMeg("");
      }
      if (!contents) {
        setErrorCMeg("필수입력 사항입니다");
      } else {
        setErrorCMeg("");
      }

      if (writer && password && title && contents) {
        setActive(true);
        // 들어있는 문자열을 모두 빈 문자열로 만들어라

        const result = await myCreateBoard({
          variables: {
            myCreateBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,

              // 작성하지 않은 내용들은 "" 넘김
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: postCode,
                address: roadAddress,
                addressDetail: detailAddress,
              },
              images: ["", ""],
            },
          },
        });

        // TODO : 갑자기 input 초기화가 안됨 -> defaultValue문제
        setWriter("");
        setPassword("");
        setTitle("");
        setContents("");

        // alert("회원등록함");
        setIsModalContent("게시물등록완료");

        setIsModalOpen(true);
        //state로 api응답결과를 넣어주고 모달 ok버튼 실행함수로 넘겨줌
        setCreateResultData(result);

        // console.log(createResult);
        // console.log(createResult.data?.createBoard?._id);
      }

      //   1. 네개의 state변수들이 전부 빈문자열이 아닐때 버튼의 색이 red로 활성화 시킨다
      //  2. 버튼을 활성화 -> 색을 변하게 하는 불린값이 담긴 state변수를 선언한다
      // 초기화값을 false로 주고, if문안에서 문자열이 전부 true일때 색을 red로 바꿔준다
      // button 에서 style = active가 true일때 red : gray
      // 이벤트가 어디서 발생하는지를 잘 알아둔다
    } catch (error) {
      console.log(error);
    }
  };

  // 게시물 수정하기 기능
  const handlerOnclickEdit = async () => {
    const myPassword = prompt("비밀번호를 입력하세요");

    // 업데이트 되는 곳
    /**
     * 해결 : 객체내의 객체안에 값을 넣어주려고 할때, boardAddress: {}이렇게 써줘야한다
     * if (postCode) myEditVar.boardAddress.zipcode = postCode;
     * -> 이렇게만 쓰면 boardAddress{} 얘를 못찾음
     *  */
    const myEditVar: any = {
      boardAddress: {},
    };
    // myEditVar.boardAddress["zipcode"] = "1234";
    // writer 는 수정할 수 없습니다.
    // if (writer) myEditVar.writer = writer;
    if (title) myEditVar.title = title;
    if (contents) myEditVar.contents = contents;

    if (postCode) myEditVar.boardAddress.zipcode = postCode;
    if (roadAddress) myEditVar.boardAddress.address = roadAddress;
    if (detailAddress) myEditVar.boardAddress.addressDetail = detailAddress;
    if (youtubeUrl) myEditVar.youtubeUrl = youtubeUrl;

    try {
      // 변수에 state 넣어줌
      const result = await myUpdateBoard({
        variables: {
          myUpdateBoardInput: myEditVar,
          myEditId: String(params.boardId),
          myPassword: myPassword,
        },
        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: {
              myid: String(params.boardId),
            },
          },
        ],

        // refetchQueries: [{ query: FetchBoardDocument }],
      });

      // refetchQueries -> 업데이트해서 FetchBoardDocument가 수정후내용으로 서버에서 달라졌는데, 서버에서 다시 꺼내서 상세페이지 갈아낌(refetchQueries)
      // 상세페이지 FetchBoardDocument는 데이터가 달라져서 다시 리렌더(리액트가 해줌)

      console.log(myEditVar);
      console.log(result);
      alert("수정완료");
      router.push(`/boards/${params.boardId}`);
    } catch (error: any) {
      // 에러메세지만 빼서 보여주는 작업
      console.log(error.graphQLErrors);
      if (error.graphQLErrors) {
        const errorNeg = error.graphQLErrors.map((err) => err.message);
        alert(errorNeg);
      } else {
        console.error("에러 발생");
      }
    }
  };

  return {
    data,
    password,
    contents,
    writer,
    title,
    errorCMeg,
    errorPMeg,
    errorTMeg,
    errorWMeg,
    isActive,
    postCode,
    roadAddress,
    detailAddress,
    youtubeUrl,
    handleChangWriterMeg,
    handleChangTitleMeg,
    handleChangPwMeg,
    handleChangContentsMeg,
    handlerOnclickAdd,
    handlerOnclickEdit,
    isModalOpen,
    isAddressModalOpen,
    handleOk,
    handleCancel,
    isModalContent,
    onClickAddressModal,
    handleComplete,
    onChangDetailAddress,
    onChangYoutubeUrl,
    createResultData,
  };
}
