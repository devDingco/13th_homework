import { useQuestionWrite } from "./hook";
import { Button } from "antd";
import Input from "@/components/input";
import ModalAlertBox from "@/components/modal-alert-box";
import Icon from "@/components/icon-factory";

interface IQuestionWriteProps {
  data?: any;
  editModeHandler?: () => void;
  questionId?: string;
  isEdit?: boolean;
}

export default function QuestionWrite(props: IQuestionWriteProps) {
  const { data, editModeHandler, questionId, isEdit } = props;

  const {
    createQuestion,
    updateQuestion,
    isDirty,
    isValid,
    errors,
    control,
    isModalOpen,
    setIsModalOpen,
    modalType,
  } = useQuestionWrite({ data, editModeHandler });

  // console.log("data", data, questionId);

  return (
    <div className="flex flex-col gap-6">
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}
      {!isEdit && (
        <div className="flex items-center gap-3">
          <Icon icon="chat" className="w-6 h-6" />
          <h3 className="text-lg font-semibold">문의하기</h3>
        </div>
      )}

      <Input
        id={`${
          questionId ? `questionContents_${questionId}` : "questionContents"
        }`}
        type="textArea"
        control={control}
        defaultValue={data?.contents ?? ""}
        rows={4}
        showCount
        maxLength={100}
        errormessage={errors?.questionContents?.message}
        placeholder="문의 내용을 입력해주세요."
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
            onClick={() => updateQuestion(questionId ?? "")}
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
          onClick={() => createQuestion()}
          disabled={!isDirty || !isValid}
        >
          문의하기
        </Button>
      )}
    </div>
  );
}
