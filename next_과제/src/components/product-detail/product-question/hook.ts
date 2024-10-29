import { useForm } from "react-hook-form";

export const useProductQuestionWrite = () => {
  const data = null;
  const questionId = null;

  const {
    control,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const createProductQuestion = () => {
    console.log("createProductQuestion");
  };

  const updateProductQuestion = () => {
    console.log("updateProductQuestion");
  };

  const editModeHandler = () => {};

  return {
    createProductQuestion,
    updateProductQuestion,
    editModeHandler,
    errors,
    control,
    isDirty,
    isValid,
    data,
    questionId,
  };
};
