import { Rate } from "antd";
import { dateViewSet } from "@/utils/dateViewSet";
import Icon from "@/components/iconFactory";
import CommentWrite from "@/components/board-detail/comment-write";

import {
  DeleteBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { IcommentItemBox } from "@/components/commentItem/types";
import { useParams } from "next/navigation";

export default function CommentItem(props: IcommentItemBox) {
  const params = useParams();
  const { commentData, starCountBox, reply } = props;

  const [deleteComment] = useMutation(DeleteBoardCommentDocument);

  const [isEdit, setIsEdit] = useState(false);

  // 댓글 삭제
  const commentDelete = async (commentId: string) => {
    console.log(commentId);
    try {
      const prompt = window.prompt("비밀번호를 입력해 주세요.");
      if (prompt) {
        const result = await deleteComment({
          variables: {
            password: prompt,
            boardCommentId: String(commentId),
          },
          refetchQueries: [
            {
              query: FetchBoardCommentsDocument,
              variables: { page: 1, boardId: String(params.boardId) },
            },
          ],
        });
        console.log(result);
      } else {
        // alert("취소되었습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  // 댓글 수정 모드
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex flex-col gap-2 py-10 border-t first:border-0">
      {isEdit ? (
        <CommentWrite
          commentId={commentData._id}
          type="commentEdit"
          starCountBox={true}
          data={commentData}
          editModeHandler={editModeHandler}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <span className="rounded-full overflow-hidden bg-gray-600 w-6 h-6">
                  {/* <Image
          src={user.img}
          alt={user.name}
          width={24}
          height={24}
        /> */}
                </span>
                {/* <span className="text-gray-700 text-sm">{user.name}</span> */}
                {/* !! 나중에 유저명으로 바꾸기 */}
                <span className="text-gray-700 text-sm">
                  {commentData.writer}
                </span>
              </div>
              {/* 별점 노출 여부 */}
              {starCountBox && (
                <Rate disabled value={commentData.rating} allowHalf />
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => editModeHandler()}>
                <div className="blind">댓글수정</div>
                <Icon icon="edit" className="w-6 h-6" />
              </button>
              <button onClick={() => commentDelete(commentData._id)}>
                <div className="blind">댓글삭제</div>
                <Icon icon="close" className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* 댓글 내용 */}
          <p className="text-base">{commentData.contents}</p>

          {/* 댓글 날짜 */}
          <div className="text-gray-400 text-sm">
            {dateViewSet(commentData.createdAt)}
          </div>

          {/* 답변하기 버튼 노출 여부 */}
          {reply && (
            <div className="flex gap-2 items-center">
              <span className="w-6 h-6">
                <Icon icon="reply" />
              </span>
              답변하기
            </div>
          )}
        </>
      )}
    </div>
  );
}
