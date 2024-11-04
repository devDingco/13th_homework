import { useQuestionAnswerWrite } from "./hook";
import { Button } from "antd";
import Input from "@/components/input";
import ModalAlertBox from "@/components/modal-alert-box";

interface IQuestionWriteProps {
  data?: any;
  questionId?: string;
  editModeHandler?: () => void;
}

export default function QuestionAnswerWrite(props: IQuestionWriteProps) {
  const { data, editModeHandler, questionId } = props;

  const {
    createQuestionAnswer,
    updateQuestionAnswer,
    isDirty,
    isValid,
    errors,
    control,
    isModalOpen,
    setIsModalOpen,
    modalType,
  } = useQuestionAnswerWrite({ data, editModeHandler, questionId });

  // console.log("data", data, questionId);

  return (
    <div className="flex flex-col gap-6">
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}

      <Input
        id={`${
          data?.questionAnswerId
            ? `questionAnswerContents_${data?.questionAnswerId}`
            : "questionAnswerContents"
        }`}
        type="textArea"
        control={control}
        defaultValue={data?.contents ?? ""}
        rows={4}
        showCount
        maxLength={100}
        errormessage={errors?.questionAnswerContents?.message}
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
            onClick={() => updateQuestionAnswer(data?._id ?? "")}
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
          onClick={() => createQuestionAnswer(questionId ?? "")}
          disabled={!isDirty || !isValid}
        >
          답변하기
        </Button>
      )}
    </div>
  );
}
