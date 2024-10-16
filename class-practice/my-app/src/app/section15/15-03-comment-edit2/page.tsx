"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

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
  const [myindex, setMyindex] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const { data } = useQuery(FETCH_BOARDS);

  const onClickEdit = (event) => {
    // const qqq = myindex;     이런식으로 할당하면 myindex는 배열이기 때문에 qqq에서 수정하게되면 원본도 바뀌게됨(원래부터 같아지기때문에 변경이 감지가 안돼서 화면을 다시그릴 이유가 없음
    const qqq = [...myindex];
    qqq[Number(event.currentTarget.id)] = true;
    setMyindex(qqq);
  };

  return (
    <div>
      {data?.fetchBoards.map((el, index) =>
        myindex[index] !== true ? ( //index번째를 누르면 myindex배열에 true로 바뀐 부분에 해당하는 리스트만 인풋창으로 바뀜
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
