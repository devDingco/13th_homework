"use client";

import Icon from "@/components/iconFactory";
import Input from "@/components/input";
import { IcommentWriteProps } from "@/components/board-detail/comment-write/types";
import { useCommentWrite } from "@/components/board-detail/comment-write/hook";
import { Rate, Button } from "antd";
import { Controller } from "react-hook-form";
import ModalAlertBox from "@/components/ModalAlertBox";

export default function CommentWrite(props: IcommentWriteProps) {
  const { type, starCountBox, mode, setMode, commentIndex, data, title } =
    props;

  const {
    commentNew,
    commentEdit,
    isDirty,
    isValid,
    errors,
    editModeCancel,
    control,
    isModalOpen,
    setIsModalOpen,
    modalType,
  } = useCommentWrite({ setMode, mode, commentIndex, data });

  return (
    <div className="flex flex-col gap-6">
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}

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
        <Input
          id="commentWriter"
          title="작성자"
          type="text"
          placeholder="작성자 명을 입력해 주세요"
          errormessage={errors?.commentWriter?.message}
          control={control}
          readOnly={type === "commentEdit"}
          required
        />
        {/* <Controller
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
              required
              {...field}
            />
          )}
        /> */}

        <Input
          id="commentPassword"
          title="비밀번호"
          type="password"
          required
          placeholder={
            type === "commentEdit"
              ? "댓글 작성시 등록한 비밀번호를 입력해주세요"
              : "비밀번호를 입력해 주세요"
          }
          errormessage={errors?.commentPassword?.message}
          control={control}
        />

        {/* <Controller
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
              required
              placeholder={
                type === "commentEdit"
                  ? "댓글 작성시 등록한 비밀번호를 입력해주세요"
                  : "비밀번호를 입력해 주세요"
              }
              errormessage={errors?.commentPassword?.message}
              {...field}
            />
          )}
        /> */}
      </div>

      <Input
        id="commentContents"
        type="textArea"
        control={control}
        defaultValue={type === "commentEdit" ? data?.contents : ""}
        rows={4}
        showCount
        maxLength={100}
        errormessage={errors?.commentContents?.message}
        placeholder="댓글을 입력해 주세요"
      />

      {/* <Controller
        name="commentContents"
        control={control}
        rules={{
          required: "필수 입력 사항입니다.",
          maxLength: {
            value: textMaxCount,
            message: `최대 ${textMaxCount}자까지 입력 가능합니다.`,
          },
        }}
        defaultValue={type === "commentEdit" ? data?.contents : ""}
        render={({ field }) => (
          <TextAreaBox
            placeholder={placeholder}
            errormessage={errors?.commentContents?.message}
            rows={4}
            showCount
            maxLength={textMaxCount}
            {...field}
          />
        )}
      /> */}

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
