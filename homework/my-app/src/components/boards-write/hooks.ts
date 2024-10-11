"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";

export default function UseBoardsWrite() {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      myid: String(params?.boardId),
    },
  });
  //   console.log(data);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 에러메세지 state
  const [errorWMeg, setErrorWMeg] = useState("");
  const [errorPMeg, setErrorPMeg] = useState("");
  const [errorTMeg, setErrorTMeg] = useState("");
  const [errorCMeg, setErrorCMeg] = useState("");
  // state에서는 사라지고 input()에서 안사라짐
  const [isActive, setActive] = useState(false);
  //1. 버튼은 false  색 비활성화함
  //2. state변수 문자열이 모두 채워졌을때 버튼 색을 활성화시켜라

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
        alert("회원등록함");

        // 들어있는 문자열을 모두 빈 문자열로 만들어라
        setWriter("");
        setPassword("");
        setTitle("");
        setContents("");

        const result = await myCreateBoard({
          variables: {
            myCreateBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,
              // 작성하지 않은 내용들은 "" 넘김
              youtubeUrl: "",
              boardAddress: {
                zipcode: "",
                address: "",
                addressDetail: "",
              },
              images: ["", ""],
            },
          },
        });

        console.log(result);
        console.log(result.data?.createBoard?._id);
        router.push(`/boards/${result.data?.createBoard?._id}`);
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
    try {
      const myPassword = prompt("비밀번호를 입력하세요");
      // 업데이트 되는 곳
      const myEditVar: any = {};
      if (writer) myEditVar.writer = writer;
      if (title) myEditVar.title = title;
      if (contents) myEditVar.contents = contents;

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
    errorCMeg,
    errorPMeg,
    errorTMeg,
    errorWMeg,
    isActive,
    handleChangWriterMeg,
    handleChangTitleMeg,
    handleChangPwMeg,
    handleChangContentsMeg,
    handlerOnclickAdd,
    handlerOnclickEdit,
  };
}
