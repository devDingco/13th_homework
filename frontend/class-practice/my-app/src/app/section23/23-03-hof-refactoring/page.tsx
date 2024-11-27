"use client";

import { gql, useQuery } from "@apollo/client";
import { MouseEvent } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  console.log(data);

  // <<<<<<<<< 리팩토링 전 >>>>>>>>>
  // const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
  //   refetch({ page: Number(event?.currentTarget.id) });
  // };

  // <<<<<<<<< 리팩토링 후 >>>>>>>>>
  const onClickPage = (page: number) => () => {
    refetch({ page: page });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}

      {new Array(10).fill("철수").map((_, index) => (
        <span key={index + 1} onClick={onClickPage(index + 1)}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}
