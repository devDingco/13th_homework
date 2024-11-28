import { HttpResponse, graphql } from "msw";

const gql = graphql.link("http://mock.com/graphql");

export const apis = [
  gql.mutation("createBoard", ({ variables }) => {
    const { writer, title, contents } = variables.createBoardInput;

    // HttpResponse.json() => Json 으로 응답을 보낼때 사용
    return HttpResponse.json({
      data: {
        createBoard: {
          _id: "qqq",
          writer,
          title,
          contents,
          __typename: "Board",
        },
      },
    });
  }),

  // 이런식으로 query도 만들 수 있다.
  // gql.query("fetchBoard", ({ variables }) => {
  //   const { _id } = variables;

  //   return HttpResponse.json({
  //     data: {
  //       fetchBoard: {
  //         _id,
  //         writer: "철수",
  //         title: "안녕하세요",
  //         contents: "반갑습니다.",
  //         __typename: "Board",
  //       },
  //     },
  //   });
  // }),
];
