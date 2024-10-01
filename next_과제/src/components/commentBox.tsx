"use client";
import StarCountBox from "@/components/starCountBox";
import Icon from "@/components/iconFactory";
import { useState } from "react";

interface ICommentBox {
  title?: string;
  textMaxCount: number;
  placeholder: string;
  id: string;
  type: string;
  starCountBox?: boolean;
  defaultValue?: string;
}

export default function CommentBox(props: ICommentBox) {
  const {
    title = "",
    textMaxCount,
    placeholder,
    id,
    type,
    starCountBox = true,
    defaultValue = "",
  } = props;
  const [textCount, setTextCount] = useState(defaultValue.length);

  return (
    <div className="flex flex-col gap-6">
      {type === "commentWrite" && (
        <div className="flex gap-2">
          <span className="w-6 h-6">
            <Icon icon="chat" className="fill-current w-fit" />
          </span>
          {title}
        </div>
      )}
      {starCountBox && <StarCountBox />}
      <label htmlFor={id} className="relative">
        <textarea
          className="w-full h-36 py-3 px-4 border border-gray-300 rounded-lg block resize-none"
          name={id} // ! 아이디가 중복될수 있으므로 고유값 다시 설정 필요
          placeholder={placeholder}
          onChange={(e) => setTextCount(e.target.value.length)}
          maxLength={textMaxCount}
          minLength={1}
          defaultValue={defaultValue} // ! 수정할 댓글 내용
        ></textarea>
        <div className="absolute bottom-3 right-4">
          {textCount}/{textMaxCount}
        </div>
      </label>
      {type === "commentWrite" && (
        <button className="btn btn-neutral self-end">댓글 등록</button>
      )}
    </div>
  );
}
