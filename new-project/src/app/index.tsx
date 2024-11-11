// TODO: 리스트 양식 여러개 만들어서 전달 => 카드형(갤러리), 리스트형, 등등
// TODO: 최신순 / 오래된 순 정렬
import { gql, useQuery } from "@apollo/client";

const BOARDS_LIST = gql`
  # TODO : search도 진행 => $search: String!
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      user {
        name
        picture
      }
    }
  }
`;

const BoardsListComponent = async () => {
  const { data } = useQuery(BOARDS_LIST);

  return (
    <div>
      <div>
        <ul>
          <li>번호</li>
          <li>제목</li>
          <li>내용 = 15글자</li>
          <li>작성일</li>
          <li>좋아요</li>
        </ul>
      </div>
    </div>
  );
};

export default BoardsListComponent;
