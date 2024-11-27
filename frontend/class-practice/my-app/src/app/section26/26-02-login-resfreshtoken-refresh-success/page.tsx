"use client";
import { gql, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { with로그인체크 } from "../../../commons/hocs/26-02-with로그인체크";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

function LoginSuccessPage() {
  // 1. 페이지 접속하면 자동으로 data에 받아지고(data는 글로벌스테이트 저장),리랜더링 됨
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  // 2. 나의 함수 실행 시 data에 받아지고(data는 글로벌스테이트 저장), 리랜더링 됨
  // const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

  // 3. fetch처럼 사용하는 방법(결과는 글로벌스테이트에 저장)
  // const client = useApolloClient();
  // client.query({
  //   query: FETCH_USER_LOGGED_IN,
  // });

  // const client = useApolloClient();
  // const onClickButton = async () => {
  //   const result = await client.query({
  //     query: FETCH_USER_LOGGED_IN,
  //   });
  //   console.log(result);
  // };

  // return <button onClick={onClickButton}>클릭</button>;
  return <div>{data?.fetchUserLoggedIn.name}님 환영합니다.</div>;
}

export default with로그인체크(LoginSuccessPage);
