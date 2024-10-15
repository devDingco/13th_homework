"use client";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const FETCH_COMMENT_LIST = gql`
  query fetchBoardComments($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export default function Page() {
  const [myIndex, setMyIndex] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const { data } = useQuery(FETCH_COMMENT_LIST, {
    variables: { boardId: "670dbd425413b3002914d39b", page: 1 },
  });
  console.log(data);

  const onEdit = (idx: number) => {
    // const newMyindex = myIndex // 이렇게 하게 되면 원본값이 같이 바뀌어버림
    const newMyIndex = [...myIndex]; // 얕은 복사 새로운 주소값이 생김
    newMyIndex[idx] = !newMyIndex[idx];
    setMyIndex(newMyIndex);
  };

  return (
    <div className="flex flex-col gap-5">
      {data?.fetchBoardComments.map((data, idx) => (
        <div key={commentData._id} className="flex gap-7">
          <div>글쓴이 : {commentData.writer}</div>
          <div>
            댓글내용 :{" "}
            {myIndex[idx] ? (
              <input
                type="text"
                defaultValue={commentData.contents}
                className="border p-2"
              />
            ) : (
              commentData.contents
            )}
          </div>
          <div>별점 : {commentData.rating}</div>
          <div>댓글날짜 : {commentData.createdAt}</div>
          <div>
            <button
              className={`btn ${myIndex[idx] ? "btn-primary text-white" : ""}`}
              onClick={() => onEdit(idx)}
            >
              {myIndex[idx] ? "수정완료" : "수정하기"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
