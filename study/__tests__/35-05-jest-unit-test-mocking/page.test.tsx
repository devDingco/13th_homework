import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import JestUnitTestMockingPage from "@/app/section35/35-05-jest-unit-test-mocking/page";
import "@testing-library/jest-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import { useRouter } from "next/navigation";

// JestUnitTestMockingPage 컴포넌트안에서
// 실행중인 useMutation은 여기서 그냥은 실행되지 않는다.

// 왜냐면 useMutation은 ApolloClient와 연결되어 있기 때문이다.
// ApolloProvider 로 감싸진 형태임, 레이아웃에서 확인할 수 있다.

// 그래서 아래와 같은 형태로 client를 선언하여
// ApolloProvider 감싸서 ApolloClient를 연결해줘야 한다.

// 또한 fetch는 브라우저에서 실행이 가능한 것이기에 node.js에서는 실행이 불가능하다.
// 그래서 yarn add cross-fetch 를 설치해서 fetch를 사용할 수 있게 해준다.

//! https://mswjs.io/ 에서 가짜 api를 만들어서 테스트를 진행할 수 있다.

// 가짜 useRouter 만들기
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

it("게시글이 잘 등록되는지 테스트하자!", async () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://mock.com/graphql", // mocks 에서 만든 가짜 api 주소
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  render(
    <ApolloProvider client={client}>
      <JestUnitTestMockingPage />
    </ApolloProvider>
  );

  const writer = screen.getByRole("input-writer"); // 작성자 인풋 롤로 선택해서 가져오기
  const title = screen.getByRole("input-title"); // 작성자 인풋 롤로 선택해서 가져오기
  const contents = screen.getByRole("input-contents"); // 작성자 인풋 롤로 선택해서 가져오기

  fireEvent.change(writer, { target: { value: "철수" } }); // 작성자 인풋에 값을 바꾸기
  fireEvent.change(title, { target: { value: "안녕하세요" } }); // 작성자 인풋에 값을 바꾸기
  fireEvent.change(contents, { target: { value: "반갑습니다." } }); // 작성자 인풋에 값을 바꾸기

  const button = screen.getByRole("submit-button"); // 이벤트 실행할 버튼 롤로 선택해서 가져오기
  fireEvent.click(button); // 버튼 클릭하기

  // 이벤트 실행 후 페이지 이동이 되었는지 확인한다.
  await waitFor(() => {
    // 위에서 만든 가짜 useRouter로 페이지 이동 시킨다.
    const router = useRouter();
    // 가짜이므로 실제 이동되지 않음, 실행이 되는지만 확인한다.
    expect(router.push).toHaveBeenCalled();
  });
});

// 빠르게 테스트가 필요할때는 모킹을 사용하자.
// 아니면 실제 서버와 연결해서 테스트를 진행하자.
// 수정이 잦은 경우에는 테스트 코드를 작성하지 않는 것이 좋다.
