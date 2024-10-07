import Icon from "@/components/iconFactory";
import { useBoardList } from "@/components/board-list/hook";
import { dateViewSet } from "@/utils/dateViewSet";

export default function BoardList() {
  const { data, listItemMouseHandler, detailPageHandler, postDelete } =
    useBoardList();

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
        </table>
      </div>
    </div>
  );
}
