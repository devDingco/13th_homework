"use client";

import Icon from "@/components/icon-factory";
import Input from "@/components/input";
import { IcommentWriteProps } from "@/components/accommodation-detail/comment-write/types";
import { useCommentWrite } from "@/components/accommodation-detail/comment-write/hook";
import { Rate, Button } from "antd";
import { Controller } from "react-hook-form";
import ModalAlertBox from "@/components/modal-alert-box";

export default function ProductCommentWrite(props: IcommentWriteProps) {
  const { type, starCountBox, data, editModeHandler, commentId } = props;

  const {
    commentNew,
    commentEdit,
    isDirty,
    isValid,
    errors,
    control,
    isModalOpen,
    setIsModalOpen,
    modalType,
  } = useCommentWrite({ data, editModeHandler });

  return (
    <div className="flex flex-col gap-6">
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}

      {type !== "commentEdit" && (
        <div className="flex gap-2">
          <Icon icon="chat" className="w-6 h-6" />
          <h5 className="font-bold">문의하기</h5>
        </div>
      )}

      {starCountBox && (
        <Controller
          name="commentRating"
          defaultValue={data?.rating ?? 0}
          control={control}
          render={({ field }) => (
            <Rate allowHalf defaultValue={data?.rating || 0} {...field} />
          )}
        />
      )}

      <Input
        id={`${commentId ? `commentContents_${commentId}` : "commentContents"}`}
        type="textArea"
        control={control}
        defaultValue={type === "commentEdit" ? data?.contents : ""}
        rows={4}
        showCount
        maxLength={100}
        errormessage={errors?.commentContents?.message}
        placeholder="댓글을 입력해 주세요"
      />

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
            disabled={!isDirty || !isValid}
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
