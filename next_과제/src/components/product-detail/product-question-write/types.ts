import {
  CreateTravelproductQuestionMutationVariables,
  UpdateTravelproductMutationVariables,
} from "@/commons/graphql/graphql";

export interface IuseQuestionWriteProps {
  data?:
    | UpdateTravelproductMutationVariables
    | CreateTravelproductQuestionMutationVariables;
  editModeHandler?: () => void;
}

export interface Iuseform {
  questionContents: string;
}
