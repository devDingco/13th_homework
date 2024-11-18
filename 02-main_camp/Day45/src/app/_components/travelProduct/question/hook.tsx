import { travelProductQuestionSchema } from "@/app/_schema/travelProductQuestionSchema";
import {
  DeleteTravelproductQuestionDocument,
  FetchTravelproductQuestionsDocument,
} from "@/commons/gql/graphql";
import useComment from "@/commons/ui/comment/comment/hooks";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IUseQuestionProps {
  travelproductId: string;
  travelproductQuestionId: string;
}

export default function useQuestion({
  travelproductId,
  travelproductQuestionId,
}: IUseQuestionProps) {
  const [isEdit, setIsEdit] = useState(false);
  const methods = useForm({
    resolver: zodResolver(travelProductQuestionSchema),
  });
  const { isSubMenuOpened, openSubMenu, closeSubMenu } = useComment();

  const [deleteTravelproductQuestion] = useMutation(
    DeleteTravelproductQuestionDocument
  );

  const enableEdit = () => {
    setIsEdit(true);
  };

  const disableEdit = () => {
    setIsEdit(false);
  };

  const onClickAnswer = () => {
    openSubMenu();
  };

  const onClickCancel = () => {
    closeSubMenu();
  };

  const onClickEditIcon = () => {
    enableEdit();
  };

  const onClickDelete = async () => {
    await deleteTravelproductQuestion({
      variables: {
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
  };

  return {
    methods,
    isSubMenuOpened,
    isEdit,
    onClickAnswer,
    onClickCancel,
    onClickDelete,
    onClickEditIcon,
    disableEdit,
    closeSubMenu,
  };
}
