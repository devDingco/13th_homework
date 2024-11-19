import { useQuestionWrite } from "./hook";
import { Button } from "antd";
import Input from "@/components/input";
import Icon from "@/components/icon-factory";
import { FormProvider } from "react-hook-form";

interface IQuestionWriteProps {
  data?: {
    contents: string;
  };
  editModeHandler?: () => void;
  questionId?: string;
  isEdit?: boolean;
}

export default function QuestionWrite(props: IQuestionWriteProps) {
  const { data, editModeHandler, questionId, isEdit } = props;

  const { createQuestion, updateQuestion, methods } = useQuestionWrite({
    editModeHandler,
  });

  return (
    <div className="flex flex-col gap-6">
      {!isEdit && (
        <div className="flex items-center gap-3">
          <Icon icon="chat" className="w-6 h-6" />
          <h3 className="text-lg font-semibold">문의하기</h3>
        </div>
      )}
      <FormProvider {...methods}>
        <Input
          id={`${
            questionId ? `questionContents_${questionId}` : "questionContents"
          }`}
          type="textArea"
          defaultValue={data?.contents ?? ""}
          rows={4}
          showCount
          maxLength={100}
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
              disabled={
                !methods.formState.isDirty || !methods.formState.isValid
              }
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
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
          >
            문의하기
          </Button>
        )}
      </FormProvider>
    </div>
  );
}
