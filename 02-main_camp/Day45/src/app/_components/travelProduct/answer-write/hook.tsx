import {
  ITravelProductAnswerSchema,
  travelProductAnswerSchema,
} from "@/app/_schema/travelProductAnswer";
import {
  CreateTravelproductQuestionAnswerDocument,
  FetchTravelproductQuestionAnswersDocument,
  FetchTravelproductQuestionAnswersQuery,
  UpdateTravelproductQuestionAnswerDocument,
} from "@/commons/gql/graphql";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IUseTravelProductAnswerWrite {
  isEdit?: boolean;
  data?: FetchTravelproductQuestionAnswersQuery["fetchTravelproductQuestionAnswers"][0];
  travelproductQuestionId: string;
  travelproductQuestionAnswerId?: string;
  handleComplete?: () => void;
}

export default function useTravelProductAnswerWrite({
  isEdit = false,
  data,
  travelproductQuestionId,
  travelproductQuestionAnswerId,
  handleComplete,
}: IUseTravelProductAnswerWrite) {
  const methods = useForm<ITravelProductAnswerSchema>({
    resolver: zodResolver(travelProductAnswerSchema),
  });
  const [createTravelproductQuestionAnswer] = useMutation(
    CreateTravelproductQuestionAnswerDocument
  );
  const [updateTravelproductQuestionAnswer] = useMutation(
    UpdateTravelproductQuestionAnswerDocument
  );

  const onClickSubmit = async (data: ITravelProductAnswerSchema) => {
    try {
      await createTravelproductQuestionAnswer({
        variables: {
          createTravelproductQuestionAnswerInput: {
            contents: data.contents,
          },
          travelproductQuestionId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionAnswersDocument,
            variables: {
              travelproductQuestionId,
            },
          },
        ],
      });
      alert("답변이 등록 되었습니다.");
      if (handleComplete) handleComplete();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = async (data: ITravelProductAnswerSchema) => {
    if (!travelproductQuestionAnswerId) return;

    try {
      await updateTravelproductQuestionAnswer({
        variables: {
          updateTravelproductQuestionAnswerInput: {
            contents: data.contents ?? "",
          },
          travelproductQuestionAnswerId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionAnswersDocument,
            variables: {
              travelproductQuestionId,
            },
          },
        ],
      });
      if (handleComplete) handleComplete();
      alert("답변이 수정되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit && data) {
      const defaultValues: ITravelProductAnswerSchema = {
        contents: data.contents,
      };

      methods.reset(defaultValues);
    }
  }, [data]);

  return {
    methods,
    onClickSubmit,
    onClickEdit,
  };
}
