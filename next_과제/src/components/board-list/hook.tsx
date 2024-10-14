import { useRouter } from "next/navigation";
import useCustomSearchParams from "@/commons/hooks/useCustomSearchParams";
import { dateViewSet } from "@/utils/dateViewSet";
import type { TableProps } from "antd";
import type { DataType, IhandleSearch } from "@/components/board-list/types";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteBoardDocument,
  FetchBoardsListDocument,
  // FetchBoardDocument,
  FetchBoardsCountDocument,
} from "@/commons/graphql/graphql";
import Icon from "@/components/iconFactory";
import { VideoCameraTwoTone, FileImageTwoTone } from "@ant-design/icons";
import { toKoreanTimeString } from "@/utils/toKoreanTimeString";

export const useBoardList = () => {
  const router = useRouter();
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const { data, refetch } = useQuery(FetchBoardsListDocument, {
    variables: {
      startDate: toKoreanTimeString("2021-09-03"),
      endDate: toKoreanTimeString(new Date().toISOString().split("T")[0], true),
      search: searchParams.search || "",
      page: Number(searchParams.page) || 1,
    },
  });

  const { data: countData } = useQuery(FetchBoardsCountDocument, {
    variables: {
      startDate: toKoreanTimeString("2021-09-03"),
      endDate: toKoreanTimeString(new Date().toISOString().split("T")[0], true),
      search: "",
    },
  });

  const fetchBoardsCount = countData?.fetchBoardsCount; // !게시글 총 갯수

  // !검색 결과 리패치
  const handleSearch = async ({
    startDate,
    endDate,
    search,
  }: IhandleSearch) => {
    setSearchParams({
      startDate: startDate.split("T")[0],
      endDate: endDate.split("T")[0],
      search: search,
      page: "1",
    });
    const result = await refetch({
      startDate: toKoreanTimeString(startDate || "2021-09-03"),
      endDate: toKoreanTimeString(
        endDate || new Date().toISOString().split("T")[0],
        true
      ),
      search: search,
      page: 1,
    });
    console.log(result);
  };

  // console.log(params.pageNum, data?.fetchBoards);

  const [deleteBoard] = useMutation(DeleteBoardDocument);
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
        refetchQueries: [
          {
            query: FetchBoardsListDocument,
            variables: {
              page: Number(searchParams.page) || 1,
            },
          },
        ],
      });
      alert("게시글이 삭제되었습니다.");
      refetch();
      // router.refresh();
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
    const childTarget = target.lastElementChild?.firstElementChild?.classList;
    // console.log(childTarget);
    if (type === "over") {
      childTarget?.add("flex");
      childTarget?.remove("hidden");
    } else {
      childTarget?.add("hidden");
      childTarget?.remove("flex");
    }
  };

  const detailPageHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    postId: string
  ) => {
    // console.log("detail", postId);
    router.push(`/boards/${postId}`);
  };

  const dataSource = Array.from({
    length: data?.fetchBoards.length || 0,
  }).map<DataType>((_, idx) => ({
    key: String(idx + 1 + (Number(searchParams.page || 1) - 1) * 10),
    title: data?.fetchBoards[idx].title || "",
    writer: data?.fetchBoards[idx].writer || "",
    createdAt: dateViewSet(data?.fetchBoards[idx].createdAt),
    deleteBoard: data?.fetchBoards[idx]._id || "",
  }));

  console.log("게시판리스트", data?.fetchBoards);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "5%",
      align: "center",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (value, record, index) => (
        <div className="flex gap-2">
          {value}
          {data?.fetchBoards[index].youtubeUrl && (
            <VideoCameraTwoTone twoToneColor="#ff4848" />
          )}
          {data?.fetchBoards[index].images.length > 0 && (
            <FileImageTwoTone twoToneColor="#2e53fc" />
          )}
        </div>
      ),
      width: "66%",
    },
    {
      title: "작성자",
      dataIndex: "writer",
      key: "writer",
      width: "10%",
      align: "center",
    },
    {
      title: "날짜",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
    },
    {
      title: "",
      key: "deleteBoard",
      render: (_: unknown, record: DataType) => (
        <button
          className="items-center justify-center w-full hidden"
          onClick={(e) => postDelete(e, record.deleteBoard || "")}
        >
          <Icon
            icon="delete"
            className="fill-gray-500 w-5 h-5"
            viewBox="-3 -3 24 24"
          />
        </button>
      ),
      width: "4%",
      align: "center",
    },
  ];

  return {
    data,
    postDelete,
    listItemMouseHandler,
    detailPageHandler,
    handleSearch,
    dataSource,
    columns,
    fetchBoardsCount,
    searchParams,
    setSearchParams,
    router,
  };
};
