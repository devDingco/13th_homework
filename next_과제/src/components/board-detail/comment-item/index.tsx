import { Rate } from "antd";
import { dateViewSet } from "@/utils/dateViewSet";
import Icon from "@/components/iconFactory";
import CommentWrite from "@/components/board-detail/comment-write";
import useCommentItem from "@/components/board-detail/comment-item/hook";

import { IcommentItem } from "@/components/board-detail/comment-list/types";

export default function CommentItem(props: IcommentItem) {
  const { commentData, starCountBox, reply } = props;

  const { isEdit, editModeHandler, commentDelete } = useCommentItem();

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
