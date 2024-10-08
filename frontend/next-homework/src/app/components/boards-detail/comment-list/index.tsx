"use client";

// import Image from "next/image";
// 아이콘 svg로 변경하기
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_COMMIT = gql`
  query {
    fetchBoardComments(boardId: "670409785413b3002914cf6c") {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      user {
        name
        picture
      }
    }
  }
`;

const CommentListComponent = () => {
  const param = useParams();
  const { data } = useQuery(FETCH_COMMIT);
  console.log(data);

  return (
    <div>
      <div>
        {/* {data?.fetchBoardComments.map((el, index) => ( */}
        {/* 프로필 라인 */}
        <div>
          <div>
            {/* 프로필 사진+name */}
            {/* <image src={el.user.picture} /> */}
            {/* <span>{el.user.name}</span> */}
            {/* 별점 */}
          </div>
          {/* icon */}
          <div>
            <image />
          </div>
          {/* 내용 */}
          {/* <textarea>{el.contents}</textarea> */}
          {/* 날짜 */}
          {/* <p>{el.createdAt}</p> */}
          {/* 업데이트 날자와 작성일 다르면 수정됨 표시 띄워주기 */}
          {/* <p>수정됨</p> */}
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default CommentListComponent;
