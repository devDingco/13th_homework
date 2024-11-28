"use client";
import { useQuery, gql, useLazyQuery, useApolloClient } from "@apollo/client";
import { withAuth } from "@/commons/hocs/23-07-withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

function LoginSuccessPage() {
  // useQuery를 함수안에서 호출할 수는 없다 그러므로 2번 방법과 같이 처리한다.

  // 1번 방법 - 페이지 접속시 자동으로 data를 가져오고, 해당 데이터를 글로벌 스테이트에 저장하여 리렌더링됨
  // const { data } = useQuery(FETCH_USER_LOGGED_IN);

  // 2번 방법 - 내가 작성한 함수를 실행시 data를 가져오고, 해당 데이터를 글로벌 스테이트에 저장하여 리렌더링됨
  // const [내가작성한함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

  // 3번 방법 - fetch처럼 사용하고싶을때 사용, 결과는 글로벌스테이트에 저장 함수안에서 호출 가능
  // const client = useApolloClient();
  // client.query({
  //   query: FETCH_USER_LOGGED_IN,
  // });

  const client = useApolloClient();
  const onClickButton = async () => {
    // api 요청
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
    console.log(result);
  };

  return (
    <div>
      <button onClick={() => onClickButton()}>클릭하세요!</button>
      {/* <h1>Login Success</h1>
      <p>{data?.fetchUserLoggedIn.name}님 환영합니다!</p>
      <div>이메일 : {data?.fetchUserLoggedIn.email}</div>
      <div>이름 : {data?.fetchUserLoggedIn.name}</div> */}
    </div>
  );
}

export default LoginSuccessPage;
