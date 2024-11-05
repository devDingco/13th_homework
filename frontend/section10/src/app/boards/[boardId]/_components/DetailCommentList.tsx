"use client";
import Ratings from "@/components/ui/ratings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DELETE_COMMENT,
  FETCH_COMMENTS,
  UPDATE_COMMENT,
} from "@/app/queries/comments-queries";
import { useMutation, useQuery } from "@apollo/client";
import { MdOutlineEdit, MdClear } from "react-icons/md";

export default function DetailCommentList({ boardId }: IDeteailCommentProps) {
  const deleteComment = useMutation(DELETE_COMMENT);
  const updateComment = useMutation(UPDATE_COMMENT);

  const { data } = useQuery(FETCH_COMMENTS, {
    variables: { page: 1, boardId: boardId },
  });
  const last_idx = data?.fetchBoardComments.length - 1;
  console.log(data);

  const handleDeleteComment = () => {};
  const handleEditComment = () => {};
  return (
    <>
      {data?.fetchBoardComments.map((el: IComment, index: number) => (
        <div key={el._id} className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback>{el.writer}</AvatarFallback>
                  </Avatar>
                  <div className="prose-l_14_20 text-gray-700">{el.writer}</div>
                </div>
                <Ratings rating={el.rating} onRatingChange={() => {}} />
              </div>
              <div className="flex items-center group gap-2">
                <MdOutlineEdit color="#333333" onClick={handleEditComment} />
                <MdClear color="#333333" onClick={handleDeleteComment} />
              </div>
            </div>
            <div className="prose-r_16_24">{el.contents}</div>
            <div className="prose-r_14_20 text-[#818181]">
              {el.createdAt.slice(0, 10).replace(/-/g, ".")}
            </div>
          </div>
          {/* NOTE : 다시 보기 */}
          {index !== last_idx && <hr />}
        </div>
      ))}
    </>
  );
}
