"use client";
import Icon from "@/components/iconFactory";
import { useRouter } from "next/navigation";

import { useParams } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface Ipost {
  _id: string;
  writer: string;
  title: string;
  createdAt: string;
}

export default function BoardList() {
  const router = useRouter();
  const params = useParams();
  console.log(params);

  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      endDate: "2024-09-30T18:54:33Z",
      startDate: "2023-09-03T09:54:33Z",
      search: "",
      page: Number(params.pageNum) || 1,
    },
  });
  console.log(params.pageNum, data?.fetchBoards);

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const postDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    console.log(postId);
    e.stopPropagation();
    try {
      await deleteBoard({
        variables: {
          boardId: postId,
        },
      });
      alert("게시글이 삭제되었습니다.");
      router.refresh();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.log(error);
    }
  };

  const listItemMouseHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    type: string
  ) => {
    const target = e.currentTarget;
    const childTarget =
      target.lastElementChild?.firstElementChild?.firstElementChild?.classList;
    if (type === "over") {
      childTarget?.remove("hidden");
    } else {
      childTarget?.add("hidden");
    }
  };

  const detailPageHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    postId: string
  ) => {
    // console.log("detail", postId);
    router.push(`/board/detail/${postId}`);
  };

  return (
    <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5">
      <div className="overflow-x-auto">
        <table className="table text-center border-separate font-medium overflow-hidden border-spacing-x-0 border-spacing-y-3">
          {/*  */}
          <thead className="text-neutral text-base font-medium">
            <tr className="border-none">
              <th>번호</th>
              <th className="w-4/6 text-left">제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {data?.fetchBoards.map((post: Ipost, idx: number) => {
              return (
                <tr
                  key={idx}
                  className="cursor-pointer hover:bg-gray-100"
                  onMouseOver={(e) => listItemMouseHandler(e, "over")}
                  onMouseLeave={(e) => listItemMouseHandler(e, "leave")}
                  onClick={(e) => detailPageHandler(e, post._id)}
                >
                  <td className="border-solid border-y border-l rounded-s-xl border-gray-100 font-medium text-neutral-400">
                    {/* // {post.id} */}
                    {idx + 1}
                  </td>
                  <td className="border-solid border-y border-gray-100 text-left text-neutral">
                    {post.title}
                  </td>
                  <td className="border-solid border-y border-gray-100 text-neutral-600 font-normal truncate">
                    {post.writer}
                  </td>
                  <td className="border-solid border-y border-gray-100 font-light text-neutral-400">
                    {post.createdAt.split("T")[0].replaceAll("-", ".")}
                  </td>
                  <td className="border-solid border-y border-gray-100 border-r rounded-e-xl pl-0">
                    <div className="w-6 h-5">
                      <button
                        className="hidden"
                        onClick={(e) => postDelete(e, post._id)}
                      >
                        <Icon
                          icon="delete"
                          className="fill-gray-500 w-fit h-fit"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
