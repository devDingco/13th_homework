"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";

export default function useBoardsWrite() {
  const router = useRouter();
  const params = useParams();

  // state에서는 사라지고 input()에서 안사라짐
  //1. 버튼은 false  색 비활성화함
  //2. state변수 문자열이 모두 채워졌을때 버튼 색을 활성화시켜라
  const [isActive, setActive] = useState(false);

  //그래프큐엘 함수
  const [CreateBoard] = useMutation(CreateBoardDocument);
  const [UpdateBoard] = useMutation(UpdateBoardDocument);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      myid: String(params?.boardId),
    },
  });
  //   console.log(data);
  /**
   * 1. input state 객체로 묶어서 사용하기 -> usestate() 기능을 만들어놓고 초기값으로 넣어주어야한다
   * 2. 빈객체 안에 중복된키로 덮어 씌워줘서 업데이트 되는 객체로 만들어, 변수에 넣어주기
   * 3. 업데이트된 객체를 담고있는 변수를 setstate에 넣어서 값 변경해주기 -> state가 바뀌면 렌더링 된다
   * writer가들어오면 usestate() 실행후 그객체 안에 담기고,다른것들도 마찬가지임
   * 전부 다 담겼을때 submit등록하기 버튼을 누르면 객체안의 값을 들고 createBoard가 실행되면서 게시물이 등록된다 (이때 필수값이 다 있어야함)
   *
   * 공통적으로 쓰는 것들은 모두 밖으로 빼둔다
   */

  // input 바꾸는 state부분
  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  // 필수값 에러 메세지 state
  const [errorMeg, setErrorMeg] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  // input창안에 입력된 값을 받아오는 기능
  const onChangeInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newInputs = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    console.log(event.target.value);

    /**
     * 객체의 키값추출법을 생각하면 이해 할 수 있음 
     * 
     * {  writer: "",
          password: "",
          title: "",
          contents: "",} , [writer]:"인풋의내용"
     * 
     */
    setInputs(newInputs);
    console.log("새로운 인풋객체 : " + newInputs);

    /*
  inputs 안에 전부 들어가 있는지 검증후 버튼 색상 바꾸기 active
   
  - 필수값 검증 : 필수값의 키가 모두 들어있는 배열을 하나만듦 , 업데이트된 객체를 가지고 있는 변수를 가져와서 둘이 합쳐줌
  입력(업데이트)된 객체를 넣어줘서 createBoards로 게시글 등록해줌 
 */
    const requiredFields = ["writer", "password", "title", "contents"];
    const allrequiredFields = requiredFields.every(
      (field) => newInputs[field as keyof inputs].trim() !== ""
    );
    // every()의 반환값은 불린값 '연산된불린값 !== ""' 으로 비교한다
    // 필수값이름(키)들과 inputs state에 담긴 키 이름을 매칭시켜서 writer면 writer로 즉 newInputs[writer]:newInputs객체내에서 writer라는키의 값을 꺼내온다
    // 꺼내온 값이 "" 빈문자열인지 아닌지 비교 만약에 자료형도아니고 값도 아니라면 둘다 true로 반환 (evrey()사용) 맞다면 false로 반환된다

    //[field as keyof inputs] as keyof란 inputs해당 값이 어떤 객체의 키값이란걸 알려주는 내용->field는 string타입으로 선언되었기 때문에
    //타입스크립트에서는 field가 inputs의 키라는 사실을 알지 못함  이때 저걸 사용하여 field가 Inputs의 키중 하나라고 단언하는것
    //이 방식으로 newInputs[field]를 안전하게 사용할 수 있고, 컴파일러는 해당 키에 맞는 값을 타입체크 할 수 있음

    if (allrequiredFields) {
      console.log("필수입력 사항이 다 채워짐");
      setActive(true);
    } else {
      console.log("필수입력 사항입니다");
    }
    // 문자열이 검증후 불린 활용하기
  };

  // 게시물 등록하기 기능
  const onClickSubmitBtn = async () => {
    const newErrors = {
      writer: "",
      password: "",
      title: "",
      contents: "",
    };

    if (!inputs.writer) newErrors.writer = "필수입력사항입니다";
    if (!inputs.password) newErrors.writer = "필수입력사항입니다";
    if (!inputs.title) newErrors.writer = "필수입력사항입니다";
    if (!inputs.contents) newErrors.writer = "필수입력사항입니다";

    setErrorMeg(newErrors);

    try {
      if (inputs.writer && inputs.password && inputs.title && inputs.contents) {
        const createResult = await CreateBoard({
          variables: {
            myCreateBoardInput: {
              writer: inputs.writer,
              password: inputs.password,
              title: inputs.title,
              contents: inputs.contents,
            },
          },
        });
        console.log(createResult);
        console.log(createResult.data?.createBoard?._id);
        router.push(`/boards/${createResult.data?.createBoard?._id}`);
      }
    } catch (err) {
      console.log("등록에러:" + err);
    }

    // 들어있는 문자열을 모두 빈 문자열로 만들어라
    // setWriter("");
    // setPassword("");
    // setTitle("");
    // setContents("");

    // const result = await myCreateBoard({
    //       variables: {
    //         myCreateBoardInput: {
    //           writer: writer,
    //           password: password,
    //           title: title,
    //           contents: contents,
    //           // 작성하지 않은 내용들은 "" 넘김
    //           youtubeUrl: "",
    //           boardAddress: {
    //             zipcode: "",
    //             address: "",
    //             addressDetail: "",
    //           },
    //           images: ["", ""],
    //         },
    //       },
    // })
  };

  //   1. 네개의 state변수들이 전부 빈문자열이 아닐때 버튼의 색이 red로 활성화 시킨다
  //  2. 버튼을 활성화 -> 색을 변하게 하는 불린값이 담긴 state변수를 선언한다
  // 초기화값을 false로 주고, if문안에서 문자열이 전부 true일때 색을 red로 바꿔준다
  // button 에서 style = active가 true일때 red : gray
  // 이벤트가 어디서 발생하는지를 잘 알아둔다

  // 게시물 수정하기 기능
  const OnclickEditBtn = async () => {
    try {
      const myPassword = prompt("비밀번호를 입력하세요");
      // 업데이트 되는 곳
      const myEditVar: any = {};
      if (inputs.writer) myEditVar.writer = inputs.writer;
      if (inputs.title) myEditVar.title = inputs.title;
      if (inputs.contents) myEditVar.contents = inputs.contents;

      // 변수에 state 넣어줌
      const updateResult = await UpdateBoard({
        variables: {
          updateBoardInput: myEditVar,
          password: myPassword,
          boardId: String(params.boardId),
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

      console.log(updateResult);
      alert("수정완료");
      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      // 에러메세지만 빼서 보여주는 작업
      console.log(error.graphQLErrors);
      if (error.graphQLErrors) {
        const errorMeg = error.graphQLErrors.map((err) => err.message);
        alert(errorMeg);
      } else {
        console.error("에러 발생");
      }
    }
  };

  return {
    data,
    inputs,
    errorMeg,
    isActive,
    onChangeInputs,
    onClickSubmitBtn,
    OnclickEditBtn,
  };
}
