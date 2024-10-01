"use client";
import StarCountBox from "@/components/starCountBox";
import Icon from "@/components/iconFactory";
import CommentBox from "@/components/commentBox";
import Image from "next/image";
import { useState } from "react";

interface IcommentItemBox {
  starCountBox?: boolean;
  reply?: boolean;
  user: {
    img: string;
    name: string;
  };
  content: string;
  date: string;
  starCount?: number;
}

export default function CommentItemBox(props: IcommentItemBox) {
  const { starCountBox = true, reply, user, content, date, starCount } = props;

  const [mode, setMode] = useState("view");

  // 댓글 삭제
  const commentDelete = () => {
    console.log("commentDelete");
    const result = confirm("정말로 댓글을 삭제하시겠습니까?");
    if (result) {
      console.log("삭제완료");
    }
  };

  // 댓글 수정 완료
  const editSubmit = () => {
    console.log("editSubmit 수정완료");
  };

  if (mode === "edit") {
    return (
      <div className="flex flex-col gap-4">
        {/* 별점 노출 여부 */}
        {starCountBox && (
          <StarCountBox readOnly={false} starCount={starCount} />
        )}
        <CommentBox
          textMaxCount={100}
          placeholder="댓글을 입력해 주세요."
          id="commentEdit"
          type="commentEdit"
          starCountBox={false}
          defaultValue={content}
        />
        <div className="flex gap-4 self-end">
          <button
            className="btn btn-base-100 self-end"
            onClick={() => setMode("view")}
          >
            취소
          </button>
          <button
            className="btn btn-neutral self-end"
            onClick={() => editSubmit()}
          >
            수정하기
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 border-b pb-10">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex gap-1 items-center">
              <span className="rounded-full overflow-hidden bg-gray-600 w-6 h-6">
                <Image src={user.img} alt={user.name} width={24} height={24} />
              </span>
              <span className="text-gray-700 text-sm">{user.name}</span>
            </div>
            {/* 별점 노출 여부 */}
            {starCountBox && (
              <StarCountBox readOnly={true} starCount={starCount} />
            )}
          </div>
          <div className="flex gap-2">
            <button className="h-5 w-5" onClick={() => setMode("edit")}>
              <Icon icon="edit" />
            </button>
            <button className="h-5 w-5" onClick={() => commentDelete()}>
              <Icon icon="close" />
            </button>
          </div>
        </div>
        {/* 댓글 내용 */}
        <p className="text-base">{content}</p>

        {/* 댓글 날짜 */}
        <div className="text-gray-400 text-sm">{date}</div>

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
}
