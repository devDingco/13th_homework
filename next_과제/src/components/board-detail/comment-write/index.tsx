"use client";
import StarCountBox from "@/components/starCountBox";
import Icon from "@/components/iconFactory";
import Input from "@/components/input";
import { IcommentWriteProps } from "@/components/board-detail/comment-write/types";
import { useCommentWrite } from "@/components/board-detail/comment-write/hook";

export default function CommentWrite(props: IcommentWriteProps) {
  const {
    title = "",
    textMaxCount,
    placeholder,
    id,
    type,
    starCountBox = true,
    data,
    setMode,
    mode,
    commentIndex,
  } = props;

  const {
    register,
    textCount,
    setTextCount,
    commentNew,
    commentEdit,
    isDirty,
    isValid,
  } = useCommentWrite({ setMode, mode, commentIndex, data });

  return (
    <div className="flex flex-col gap-6">
      {type === "commentWrite" && (
        <div className="flex gap-2">
          <Icon icon="chat" className="w-6 h-6" />
          {title}
        </div>
      )}
      {starCountBox && <StarCountBox />}
      <div className="flex justify-start gap-6 w-1/2">
        <Input
          title="작성자"
          type="text"
          placeholder="작성자 명을 입력해 주세요"
          defaultValue={type === "commentEdit" ? data?.writer : ""}
          {...register("commentWriter", { required: true, minLength: 2 })}
        />
        <Input
          title="비밀번호"
          type="password"
          placeholder={"비밀번호를 입력해 주세요"}
          {...register("commentPassword", { required: true, minLength: 4 })}
        />
      </div>
      <label htmlFor={id} className="relative">
        <textarea
          className="w-full h-36 py-3 px-4 border border-gray-300 rounded-lg block resize-none"
          // name={id} // ! 아이디가 중복될수 있으므로 고유값 다시 설정 필요
          placeholder={placeholder}
          // maxLength={textMaxCount}
          // minLength={1}
          defaultValue={type === "commentEdit" ? data?.contents : ""} // ! 수정할 댓글 내용 및 댓글 작성시 초기값 설정
          {...register("commentContents", {
            required: true,
            minLength: 1,
            maxLength: textMaxCount,
            onChange(event) {
              setTextCount(event.target.value.length);
            },
          })}
        ></textarea>
        <div className="absolute bottom-3 right-4">
          {type === "commentEdit" ? data?.contents.length : textCount}/
          {textMaxCount}
        </div>
      </label>
      {type === "commentEdit" ? (
        <div className="flex justify-end gap-3">
          <button className="btn btn-outline" onClick={() => editModeCancel()}>
            취소
          </button>
          <button
            className="btn btn-accent-content"
            onClick={() => commentEdit()}
          >
            수정하기
          </button>
        </div>
      ) : (
        <button
          className="btn btn-neutral self-end"
          onClick={() => commentNew()}
          disabled={!isDirty || !isValid}
        >
          댓글 등록
        </button>
      )}
    </div>
  );
}
