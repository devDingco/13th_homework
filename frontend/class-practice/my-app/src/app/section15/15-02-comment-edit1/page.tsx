"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoardshello($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const [myindex, setMyindex] = useState(-1);

  const { data } = useQuery(FETCH_BOARDS);

  const onClickEdit = (event) => {
    console.log(event.currentTarget.id);
    setMyindex(Number(event.currentTarget.id));
  };

  return (
    <div>
      {data?.fetchBoards.map((el, index) =>
        myindex !== index ? ( //myindex즉 클릭한 리스트의 아이디가 index값과 같을시 인풋창이 보이게 아닐시 그냥 리스트가 보이게
          <div key={el._id}>
            <span>{el.title}</span>
            <span>{el.writer}</span>

            <button id={index} onClick={onClickEdit}>
              수정하기
            </button>
          </div>
        ) : (
          <input type="text" key={el._id} />
        )
      )}
    </div>
  );
}
