import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  IBoardsWriteHook,
  IError,
  IFormData,
} from "../../types/components.type";
import { CreateBoardDocument, UpdateBoardDocument } from "../graphql/graphql";

export default function useBoardsWrite(
  props: IBoardsWriteHook,
  userPassword: string
) {
  const params = useParams();
  const router = useRouter();

  const [isInputPasswordModalOpen, setIsInputPasswordModalOpen] =
    useState(false);
  const [isWrongPasswordModalOpen, setIsWrongPasswordModalOpen] =
    useState(false);
  const [isEditCompleteModalOpen, setIsEditCompleteModalOpen] = useState(false);

  const [formData, setFormData] = useState<IFormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    youtubeUrl: "",
  });

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitRegistration = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
            youtubeUrl: formData.youtubeUrl,
          },
        },
      });
      const boardId = result?.data?.createBoard._id;
      router.push(`/boards/${boardId}`);
    } catch (error) {
      console.error(error);
      alert("An error has occurred. Please try again.");
    }
  };

  const handleSubmitEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInputPasswordModalOpen(!isInputPasswordModalOpen);
    try {
      const editVariables = {
        updateBoardInput: {
          title: formData.title,
          contents: formData.contents,
          youtubeUrl: formData.youtubeUrl,
          // boardAddress: {
          //   zipcode: string,
          //   address: string,
          //   addressDetail: string;
          // };
          // likeCount: number;
          // dislikeCount: number;
          // images: string;
        },
        boardId: String(params.boardId),
        password: userPassword,
      };
      if (formData.title) editVariables.updateBoardInput.title = formData.title;
      if (formData.contents)
        editVariables.updateBoardInput.contents = formData.contents;

      const result = await updateBoard({
        variables: editVariables,
      });
      setIsEditCompleteModalOpen(!isEditCompleteModalOpen);
      router.push(`/boards/${result.data?.updateBoard._id}`);
      router.refresh();
      // refetch
    } catch (error: unknown) {
      const err = error as IError;
      console.error(err);
      const graphQLErrors = `${err}.graphQLErrors[0]`;
      if (graphQLErrors.includes("비밀번호가 일치하지 않습니다."))
        setIsWrongPasswordModalOpen(!isWrongPasswordModalOpen);
      else alert("An error occurred while editing. Please try again.");
    }
  };

  const onSubmit = props.isEdit ? handleSubmitEdit : handleSubmitRegistration;

  return {
    handleInputChange,
    onSubmit,
    formData,
    isInputPasswordModalOpen,
    setIsInputPasswordModalOpen,
    isWrongPasswordModalOpen,
    isEditCompleteModalOpen,
  };
}
