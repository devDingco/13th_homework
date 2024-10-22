import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { DELETE_BOARD, FETCH_BOARDS } from "../../queries";

export default function ListFromBlock({ el, idx }: IBlockProps) {
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onclickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
  const onClickDetail = async (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("🦄 : ", event.currentTarget.id);
    event.stopPropagation();
    try {
      router.push(`/boards/${event.currentTarget.id}`);
    } catch (error) {
      console.error("안돼,,,");
    }
  };
  return (
    <div
      key={idx}
      id={el._id}
      className="flex border rounded h-[44px] px-3 py-6 items-center hover:bg-gray-300 relative group"
      onClick={onClickDetail}
    >
      <div className="w-24 flex justify-center">{idx}</div>
      <div className="w-full">{el.title}</div>

      <div className="w-24 flex justify-center">{el.writer}</div>
      <div className="w-24 flex justify-center">{el.createdAt}</div>

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
