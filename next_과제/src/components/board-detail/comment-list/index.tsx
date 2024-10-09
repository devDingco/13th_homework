"use client";
// import StarCountBox from "@/components/starCountBox";
import Icon from "@/components/iconFactory";
import CommentWrite from "@/components/board-detail/comment-write";
import { Rate } from "antd";
import Image from "next/image";

import { redirect } from "next/navigation";
import { dateViewSet } from "@/utils/dateViewSet";

import { IcommentItemBox } from "@/components/board-detail/comment-list/types";
import { useCommentList } from "@/components/board-detail/comment-list/hook";

export default function CommentList(props: IcommentItemBox) {
  const { starCountBox = true, reply, user } = props;

  const { data, error, commentDelete, editModeHandler, mode, setMode } =
    useCommentList();

  // if (error) return redirect("/boards");

  return (
    <>
      {data?.fetchBoardComments.map((data, idx) => {
        // console.log(data.rating);
        if (mode.length > 0 && mode[idx] === "edit") {
          const editData = {
            _id: data._id,
            contents: data.contents,
            writer: data.writer || "",
            rating: data.rating,
          };
          return (
            <div key={data._id} className="flex flex-col gap-2 border-b pb-10">
              <CommentWrite
                id="commentEdit"
                type="commentEdit"
                commentIndex={idx || 0}
                textMaxCount={100}
                placeholder="댓글을 입력해 주세요."
                starCountBox={true}
                setMode={setMode}
                mode={mode}
                data={editData}
              />
            </div>
          );
        } else {
          return (
            <div key={data._id} className="flex flex-col gap-2 border-b pb-10">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="rounded-full overflow-hidden bg-gray-600 w-6 h-6">
                      <Image
                        src={user.img}
                        alt={user.name}
                        width={24}
                        height={24}
                      />
                    </span>
                    {/* <span className="text-gray-700 text-sm">{user.name}</span> */}
                    {/* !! 나중에 유저명으로 바꾸기 */}
                    <span className="text-gray-700 text-sm">{data.writer}</span>
                  </div>
                  {/* 별점 노출 여부 */}
                  {starCountBox && (
                    // <StarCountBox readOnly={true} starCount={starCount} />
                    <Rate disabled defaultValue={data.rating} allowHalf />
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editModeHandler(idx)}>
                    <div className="blind">댓글수정</div>
                    <Icon icon="edit" className="w-6 h-6" />
                  </button>
                  <button onClick={() => commentDelete(data._id)}>
                    <div className="blind">댓글삭제</div>
                    <Icon icon="close" className="w-6 h-6" />
                  </button>
                </div>
              </div>
              {/* 댓글 내용 */}
              <p className="text-base">{data.contents}</p>

              {/* 댓글 날짜 */}
              <div className="text-gray-400 text-sm">
                {dateViewSet(data.createdAt)}
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
            </div>
          );
        }
      })}
    </>
  );
}
