"use client";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const FETCH_BOARDS = gql`
  query fetchBoards19_01($mypage: Int, $mysearch: String) {
    fetchBoards(page: $mypage, search: $mysearch) {
      _id
      writer
      title
      contents
    }
  }
`;
export default function List() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page") ?? 1;

  const { data } = useQuery(FETCH_BOARDS, {
    variables: { mypage: Number(page), mysearch: search },
  });

  // 주소와 관련있는 컴포넌트는 리랜더됨
  console.log("목록이 리랜더되었습니다."); // data 없을때, 있을때 두번 찍힘

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}
    </>
  );
}
