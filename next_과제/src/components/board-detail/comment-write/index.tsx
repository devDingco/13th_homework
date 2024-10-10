"use client";
// import StarCountBox from "@/components/starCountBox";

import Icon from "@/components/iconFactory";
import Input from "@/components/input";
import { IcommentWriteProps } from "@/components/board-detail/comment-write/types";
import { useCommentWrite } from "@/components/board-detail/comment-write/hook";
import { Rate, Button } from "antd";
import { Controller } from "react-hook-form";

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
    errors,
    editModeCancel,
    control,
    // setValue,
  } = useCommentWrite({ setMode, mode, commentIndex, data });

  return (
    <div className="flex flex-col gap-6">
      {type === "commentWrite" && (
        <div className="flex gap-2">
          <Icon icon="chat" className="w-6 h-6" />
          {title}
        </div>
      )}
      {starCountBox && (
        <Controller
          name="commentRating"
          defaultValue={type === "commentEdit" ? data?.rating : 0}
          control={control}
          render={({ field }) => (
            <Rate allowHalf defaultValue={data?.rating || 0} {...field} />
          )}
        />
      )}
      <div className="flex justify-start gap-6 w-2/3">
        <Controller
          name="commentWriter"
          control={control}
          rules={{
            required: "필수 입력 사항입니다.",
            minLength: { value: 2, message: "작성자명은 2자 이상입니다." },
          }}
          defaultValue={type === "commentEdit" ? data?.writer : ""}
          render={({ field }) => (
            <Input
              title="작성자"
              type="text"
              placeholder="작성자 명을 입력해 주세요"
              errormessage={errors?.commentWriter?.message}
              readOnly={type === "commentEdit"}
              {...field}
            />
          )}
        />

        <Controller
          name="commentPassword"
          control={control}
          rules={{
            required: "필수 입력 사항입니다.",
            minLength: { value: 4, message: "비밀번호는 4자 이상 입니다" },
          }}
          defaultValue={""}
          render={({ field }) => (
            <Input
              title="비밀번호"
              type="password"
              placeholder={
                type === "commentEdit"
                  ? "댓글 작성시 등록한 비밀번호를 입력해주세요"
                  : "비밀번호를 입력해 주세요"
              }
              errormessage={errors?.commentPassword?.message}
              {...field}
            />
          )}
        />
      </div>
      <label htmlFor={id} className="relative">
        <textarea
          className="w-full h-36 py-3 px-4 border border-gray-300 rounded-lg block resize-none"
          placeholder={placeholder}
          defaultValue={type === "commentEdit" ? data?.contents : ""} // ! 수정할 댓글 내용 및 댓글 작성시 초기값 설정
          {...register("commentContents", {
            required: true,
            minLength: { value: 1, message: "내용은 1자 이상입니다." },
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
          <Button
            color="default"
            variant="outlined"
            size="large"
            className="btn btn-outline"
            onClick={() => editModeCancel()}
          >
            취소
          </Button>
          <Button
            color="default"
            variant="solid"
            size="large"
            className="btn btn-accent-content"
            onClick={() => commentEdit()}
          >
            수정하기
          </Button>
        </div>
      ) : (
        <Button
          type="default"
          shape="default"
          size="large"
          className="btn btn-neutral self-end"
          onClick={() => commentNew()}
          disabled={!isDirty || !isValid}
        >
          댓글 등록
        </Button>
      )}
    </div>
  );
}
