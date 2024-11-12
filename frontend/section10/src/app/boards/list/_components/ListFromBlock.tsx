import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation } from "@apollo/client";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { ListFormBlockProps } from "./ListForm"; // ListForm에서 정의한 props 타입 import

export default function ListFromBlock({ el, idx }: ListFormBlockProps) {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onclickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("❌:", event.currentTarget.id);
    event.stopPropagation();
    try {
      const response = await deleteBoard({
        variables: { boardId: event.currentTarget.id },
        refetchQueries: [{ query: FetchBoardsDocument }],
      });
      console.log("⭐️❌⭐️:", response.data?.deleteBoard);
    } catch (error) {
      console.log("실패");
    }
  };
  const onClickDetail = async (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("✏️✏️ : ", event.currentTarget.id);
    event.stopPropagation();
    try {
      router.push(`/boards/${event.currentTarget.id}`);
    } catch (error) {
      console.error("안돼,,,");
    }
  };

  //날짜 계산
  const date = new Date(el.createdAt);
  const dateString = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div
      key={idx}
      id={el._id}
      className="flex border rounded h-12 px-6 py-4 gap-2 items-center hover:bg-gray-100 relative group duration-300"
      onClick={onClickDetail}
    >
      <div className="w-16 flex justify-center prose-l_14_20">{idx}</div>
      <div className="w-full prose-sb_14_20">{el.title}</div>

      <div className="w-24 flex justify-center prose-me_14_20">{el.writer}</div>
      <div className="w-24 flex justify-center prose-l_14_20">{dateString}</div>

      <button
        id={el._id}
        className="decoration-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={onclickDelete}
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
}
