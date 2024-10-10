import Icon from "@/components/iconFactory";
import { useBoardList } from "@/components/board-list/hook";
import { dateViewSet } from "@/utils/dateViewSet";
import { Table } from "antd";
import type { TableProps } from "antd";
import styles from "./styles.module.scss";

interface DataType {
  title: string;
  key: string;
  dataIndex?: string;
  width?: string;
  align?: "center" | "left" | "right";
  render?: (text: unknown, record: DataType) => JSX.Element;
  deleteBoard?: string;
  createdAt?: string;
}

export default function BoardList() {
  const { data, listItemMouseHandler, detailPageHandler, postDelete } =
    useBoardList();

  const dataSource = Array.from({
    length: data?.fetchBoards.length || 0,
  }).map<DataType>((_, idx) => ({
    key: String(idx + 1),
    title: data?.fetchBoards[idx].title || "",
    writer: data?.fetchBoards[idx].writer || "",
    createdAt: dateViewSet(data?.fetchBoards[idx].createdAt),
    deleteBoard: data?.fetchBoards[idx]._id || "",
  }));

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "5%",
      align: "center",
    },
    { title: "제목", dataIndex: "title", key: "title", width: "66%" },
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

  return (
    <div className="shadow-[0_0_15px_0_rgba(0,0,0,0.1)] rounded-2xl px-12 py-5">
      <div className="overflow-x-auto">
        <Table
          id={styles.boardList}
          dataSource={dataSource.length === 0 ? [] : dataSource}
          columns={columns}
          size="small"
          onRow={(record) => {
            return {
              onClick: (event) =>
                detailPageHandler(event, record.deleteBoard || ""),
              onMouseOver: (event) => listItemMouseHandler(event, "over"),
              onMouseLeave: (event) => listItemMouseHandler(event, "leave"),
            };
          }}
          pagination={{ position: ["none", "bottomCenter"] }}
          tableLayout="auto"
          loading={data === undefined}
        ></Table>
        {/* <table className="table text-center border-separate font-medium overflow-hidden border-spacing-x-0 border-spacing-y-3">
          <thead className="text-neutral text-base font-medium">
            <tr className="border-none">
              <th>번호</th>
              <th className="w-4/6 text-left">제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {data?.fetchBoards.map((post, idx: number) => {
              return (
                <tr
                  key={post._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onMouseOver={(e) => listItemMouseHandler(e, "over")}
                  onMouseLeave={(e) => listItemMouseHandler(e, "leave")}
                  onClick={(e) => detailPageHandler(e, post._id)}
                >
                  <td className="border-solid border-y border-l rounded-s-xl border-gray-100 font-medium text-neutral-400">
                    {idx + 1}
                  </td>
                  <td className="border-solid border-y border-gray-100 text-left text-neutral">
                    {post.title}
                  </td>
                  <td className="border-solid border-y border-gray-100 text-neutral-600 font-normal truncate">
                    {post.writer}
                  </td>
                  <td className="border-solid border-y border-gray-100 font-light text-neutral-400">
                    {dateViewSet(post.createdAt)}
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
        </table> */}
      </div>
    </div>
  );
}
