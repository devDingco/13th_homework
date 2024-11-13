// TODO: 리스트 양식 여러개 만들어서 전달 => 카드형(갤러리), 리스트형, 등등
// TODO: 최신순 / 오래된 순 정렬
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

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

const BoardsListComponent = () => {
  const { data } = useQuery(BOARDS_LIST);

  console.log(data);

  // ? : Link도 block 요소로 들어가는건가?

  return (
    <div className="flex justify-center items-center mt-5">
      {/* 리스트형 */}
      <div className="w-2/3 p-3 bg-blue-400 rounded-lg shadow-lg ">
        <ul className="flex h-10  items-center">
          <li className="">번호</li>
          <li>제목</li>
          <li>작성자</li>
          <li>작성일</li>
        </ul>
        {/* TODO: list object type */}
        {data?.fetchBoards.map((el) => (
          <div key={el._id} className="">
            <Link href={`/boards/`}>
              <ul className="flex">
                <li>{}</li>
                <li>{el.title}</li>
                <li>{el.writer}</li>
                <li>{el.createdAt.split("T")[0]}</li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsListComponent;
