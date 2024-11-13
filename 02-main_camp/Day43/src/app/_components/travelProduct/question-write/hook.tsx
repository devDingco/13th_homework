import { useMutation } from "@apollo/client";
import {
  CreateTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
  FetchTravelproductQuestionsQuery,
  UpdateTravelproductQuestionDocument,
} from "@/commons/gql/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ITravelProductQuestionSchema,
  travelProductQuestionSchema,
} from "@/app/_schema/travelProductQuestionSchema";
import { useEffect } from "react";

interface IUseTravelProductQuestionWrite {
  isEdit: boolean;
  travelproductId: string;
  travelproductQuestionId?: string;
  data?: FetchTravelproductQuestionsQuery["fetchTravelproductQuestions"][0];
  handleComplete?: () => void;
}

export default function useTravelProductQuestionWrite({
  isEdit,
  data,
  travelproductId,
  travelproductQuestionId,
  handleComplete,
}: IUseTravelProductQuestionWrite) {
  const methods = useForm<ITravelProductQuestionSchema>({
    resolver: zodResolver(travelProductQuestionSchema),
  });

  const [createTravelproductQuestionDocument] = useMutation(
    CreateTravelproductQuestionDocument
  );
  const [updateTravelproductQuestion] = useMutation(
    UpdateTravelproductQuestionDocument
  );

  const onClickSubmit = async (data: ITravelProductQuestionSchema) => {
    try {
      const result = await createTravelproductQuestionDocument({
        variables: {
          createTravelproductQuestionInput: {
            contents: data.contents,
          },
          travelproductId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionsDocument,
            variables: {
              travelproductId,
            },
          },
        ],
      });
      alert("문의 사항이 작성 되었습니다.");
      methods.setValue("contents", "");
    } catch (error) {}
  };

  const onClickEdit = async (data: ITravelProductQuestionSchema) => {
    if (!travelproductQuestionId) return;
    try {
      await updateTravelproductQuestion({
        variables: {
          updateTravelproductQuestionInput: {
            contents: data.contents,
          },
          travelproductQuestionId,
        },
        refetchQueries: [
          {
            query: FetchTravelproductQuestionsDocument,
            variables: {
              travelproductId,
            },
          },
        ],
      });
      if (handleComplete) handleComplete();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit && data) {
      const defaultValues: ITravelProductQuestionSchema = {
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
