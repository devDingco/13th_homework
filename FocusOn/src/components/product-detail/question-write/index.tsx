import { FormProvider, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { TextareaSoftSFull } from "@/commons/ui/textarea";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  CreateTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
  UpdateTravelproductQuestionDocument,
} from "@/commons/graphql/graphql";

export default function ProductDetailQuestion(props) {
  const params = useParams();
  const travelproductId = params.productId as string;
  const [createTravelproductQuestion] = useMutation(
    CreateTravelproductQuestionDocument,
    {
      refetchQueries: [
        {
          query: FetchTravelproductQuestionsDocument,
          variables: { travelproductId },
        },
      ],
    }
  );

  const [updateTravelproductQuestionDocument] = useMutation(
    UpdateTravelproductQuestionDocument
  );

  const methods = useForm({
    defaultValues: {
      contents: props.question?.contents,
    },
  });

  const onClickQuestion = async (data) => {
    console.log(data);
    // 등록하기 뮤테이션
    if (!props.isEdit) {
      try {
        const result = await createTravelproductQuestion({
          variables: {
            createTravelproductQuestionInput: { contents: data.contents },
            travelproductId,
          },
        });
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    // 수정하기 뮤테이션
    try {
      const result = await updateTravelproductQuestionDocument({
        variables: {
          updateTravelproductQuestionInput: {
            contents: data.contents,
          },
          travelproductQuestionId: props.question._id,
        },
      });
      props.closeEdit();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      {!props.isEdit && <div className={styles.header}>문의</div>}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onClickQuestion)}>
          <TextareaSoftSFull
            name="contents"
            placeholder="문의사항을 입력해 주세요."
          />
          <div className={styles.button_container}>
            {props.isEdit && (
              <button
                className={styles.button_cancel}
                onClick={props.closeEdit}
              >
                취소
              </button>
            )}
            <button className={styles.button_submit}>
              {props.isEdit ? "수정" : "문의"}하기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
