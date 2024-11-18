"use client";

import Icon from "@/components/icon-factory";
import Input from "@/components/input";
import { IcommentWriteProps } from "@/components/board-detail/comment-write/types";
import { useCommentWrite } from "@/components/board-detail/comment-write/hook";
import { Rate, Button } from "antd";
import { Controller, FormProvider } from "react-hook-form";

export default function CommentWrite(props: IcommentWriteProps) {
  const { type, starCountBox, data, editModeHandler, commentId } = props;

  const { commentNew, commentEdit, methods } = useCommentWrite({
    data,
    editModeHandler,
  });

  return (
    <div className="flex flex-col gap-6">
      {type !== "commentEdit" && (
        <div className="flex gap-2">
          <Icon icon="chat" className="w-6 h-6" />
          <h5 className="font-bold">댓글</h5>
        </div>
      )}

      <FormProvider {...methods}>
        {starCountBox && (
          <Controller
            name="commentRating"
            defaultValue={data?.rating ?? 0}
            control={methods.control}
            render={({ field }) => (
              <Rate allowHalf defaultValue={data?.rating || 0} {...field} />
            )}
          />
        )}
        <div className="flex justify-start gap-6 w-2/3">
          <Input
            id={`${commentId ? `commentWriter_${commentId}` : "commentWriter"}`}
            title="작성자"
            type="text"
            placeholder="작성자 명을 입력해 주세요"
            defaultValue={data?.writer ?? ""}
            readOnly={type === "commentEdit"}
            required
          />

          <Input
            id={`${
              commentId ? `commentPassword_${commentId}` : "commentPassword"
            }`}
            title="비밀번호"
            type="password"
            required
            placeholder={
              type === "commentEdit"
                ? "댓글 작성시 등록한 비밀번호를 입력해주세요"
                : "비밀번호를 입력해 주세요"
            }
          />
        </div>

        <Input
          id={`${
            commentId ? `commentContents_${commentId}` : "commentContents"
          }`}
          type="textArea"
          defaultValue={type === "commentEdit" ? data?.contents : ""}
          rows={4}
          showCount
          maxLength={100}
          placeholder="댓글을 입력해 주세요"
        />
      </FormProvider>
      {editModeHandler ? (
        <div className="flex justify-end gap-3">
          <Button
            color="default"
            variant="outlined"
            size="large"
            className="btn btn-outline"
            onClick={() => editModeHandler()}
          >
            취소
          </Button>
          <Button
            color="default"
            variant="solid"
            size="large"
            className="btn btn-accent-content"
            onClick={() => commentEdit()}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
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
          disabled={!methods.formState.isDirty || !methods.formState.isValid}
        >
          댓글 등록
        </Button>
      )}
    </div>
  );
}
