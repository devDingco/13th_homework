import { useQuestionAnswerWrite } from "./hook";
import { Button } from "antd";
import Input from "@/components/input";
import { FormProvider } from "react-hook-form";

interface IQuestionWriteProps {
  data?: any;
  questionId?: string;
  editModeHandler?: () => void;
}

export default function QuestionAnswerWrite(props: IQuestionWriteProps) {
  const { data, editModeHandler, questionId } = props;

  const { createQuestionAnswer, updateQuestionAnswer, methods } =
    useQuestionAnswerWrite({ data, editModeHandler, questionId });

  // console.log("data", data, questionId);

  return (
    <div className="flex flex-col gap-6">
      <FormProvider {...methods}>
        <Input
          id={`${
            data?.questionAnswerId
              ? `questionAnswerContents_${data?.questionAnswerId}`
              : "questionAnswerContents"
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
              onClick={() => updateQuestionAnswer(data?._id ?? "")}
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
            onClick={() => createQuestionAnswer(questionId ?? "")}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
          >
            답변하기
          </Button>
        )}
      </FormProvider>
    </div>
  );
}
