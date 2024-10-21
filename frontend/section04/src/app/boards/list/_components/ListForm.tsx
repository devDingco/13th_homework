"use client";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOARD, FETCH_BOARDS } from "../../queries";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ListForm() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // console.log(data);

  const onclickDelete = async (event) => {
    console.log("🦄 : ", event.currentTarget.id);
    event.stopPropagation();
    try {
      const response = await deleteBoard({
        variables: { boardId: event.currentTarget.id },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
      console.log("🦄🦄 :", response.data.deleteBoard);
    } catch (error) {
      console.log("실패");
    }
  };
  const onClickDetail = async (event) => {
    console.log("🦄 : ", event.currentTarget.id);
    event.stopPropagation();
    try {
      router.push(`/boards/${event.currentTarget.id}`);
    } catch (error) {
      console.error("안돼,,,");
    }
  };
  return (
    <div className="flex flex-col items-center shadow-lg w-[1280px] h-[656px] mt-5 ">
      <div className="w-[1184px] h-[608px] flex-col gap-2">
        <div className="flex items-center h-[52px] gap-2 prose-me_16_20  px-6 py-4">
          <div className="flex justify-center w-16">번호</div>
          <div className="w-full">제목</div>
          <div className="flex justify-center w-24">작성자</div>
          <div className="flex justify-center w-24 ">날짜</div>
        </div>
        <div className="flex flex-col gap-3">
          {data?.fetchBoards.map((el, idx) => (
            <div
              key={idx}
              id={el._id}
              className="flex border rounded h-[44px] px-3 py-6 items-center hover:bg-gray-300 relative group"
              onClick={onClickDetail}
            >
              <div className="w-24 flex justify-center">{idx}</div>
              <div className="w-full">{el.title}</div>

              <div className="w-24 flex justify-center">{el.writer}</div>
              <div className="w-24 flex justify-center">{el.createAt}</div>

              <button
                id={el._id}
                className="decoration-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={onclickDelete}
              >
                <MdDeleteOutline />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
