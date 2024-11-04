import React from "react";
import CommentWriting from "../../comment/writing";

interface IReplyProps {
  handleCancel?: () => void;
}

export default function ReplyWriting({ handleCancel }: IReplyProps) {
  return (
    <div>
      <CommentWriting
        hiddenLabel={true}
        hiddenCancel={false}
        handleCancel={handleCancel}
        placeholder="답변할 내용을 입력해 주세요."
        buttonText="답변 하기"
      />
    </div>
  );
}
