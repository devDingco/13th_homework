import { UpdateTravelproductMutationVariables } from "@/commons/graphql/graphql";

export interface IuseQuestionAnswerWriteProps {
  data?: UpdateTravelproductMutationVariables;
  editModeHandler?: () => void;
  questionId?: string;
}

export interface Iuseform {
  questionAnswerContents: string;
}
