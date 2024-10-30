"use client";

import Icon from "@/components/icon-factory";
import Input from "@/components/input";
import { Button } from "antd";
// import ModalAlertBox from "@/components/modal-alert-box";
import { useProductQuestionWrite } from "@/components/product-detail/product-question/hook";

export default function ProductQuestionWrite({ isEdit }: { isEdit: boolean }) {
  const {
    createProductQuestion,
    updateProductQuestion,
    editModeHandler,
    errors,
    control,
    isDirty,
    isValid,
    data,
    questionId,
  } = useProductQuestionWrite();

  return (
    <div className="flex flex-col gap-6">
      {/* {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )} */}

      <Input
        id={`${
          questionId ? `questionContents_${questionId}` : "questionContents"
        }`}
        type="textArea"
        control={control}
        defaultValue={type === "questionEdit" ? data?.contents : ""}
        rows={4}
        showCount
        maxLength={100}
        errormessage={errors?.questionContents?.message}
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
            onClick={() => updateProductQuestion()}
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
          onClick={() => createProductQuestion()}
          disabled={!isDirty || !isValid}
        >
          문의하기
        </Button>
      )}
    </div>
  );
}
