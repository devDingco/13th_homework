"use client";

import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  CREATE_BOARD,
  FETCH_BOARD,
  FETCH_BOARDS,
  UPDATE_BOARD,
  UPLOAD_FILE,
} from "./queries";
import { Address } from "react-daum-postcode";

export default function useBoardNew(props) {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  const [imageUrl, setImageUrl] = useState([
    data?.fetchBoard.images[0] || "",
    data?.fetchBoard.images[1] || "",
    data?.fetchBoard.images[2] || "",
  ]);

  const fileRef = useRef([null, null, null]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeUrl, setYoutubUrl] = useState("");
  const [juso, setJuso] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  const [input, setInput] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [errorMessage, setErrorMessage] = useState<{
    writer: "visible" | "hidden";
    password: "visible" | "hidden";
    title: "visible" | "hidden";
    contents: "visible" | "hidden";
  }>({
    writer: "visible",
    password: "visible",
    title: "visible",
    contents: "visible",
  });

  const [registerCheck, setRegisterCheck] = useState(true);
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubUrl(event.target.value);
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrorMessage({
      ...errorMessage,
      [event.target.name]: event.target.value === "" ? "visible" : "hidden",
    });

    if (!Object.values(input).every((el) => el === "")) setRegisterCheck(false);
  };

  const onClickRegister = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...input,
            youtubeUrl,
            boardAddress: {
              ...juso,
            },
            images: imageUrl,
          },

          refetchQueries: [{ query: FETCH_BOARDS }],
        },
      });
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      let errorMessage;

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("에러메시지", errorMessage);
    }
  };

  const onClickEdit = async () => {
    try {
      await updateBoard({
        variables: {
          boardId: params.boardId,
          password: input.password,
          updateBoardInput: {
            title: input.title,
            contents: input.contents,
            youtubeUrl,
            boardAddress: {
              ...juso,
            },
            images: imageUrl,
          },
          refetchQueries: [{ query: FETCH_BOARDS }],
        },
      });

      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      let errorMessage;

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("에러메시지", errorMessage);
    }
  };

  const onClickEditCancel = () => {
    router.push(`/boards/${params.boardId}`);
  };

  useEffect(() => {
    if (props.isEdit && data) {
      setInput({
        writer: data.fetchBoard.writer || "",
        password: "",
        title: data.fetchBoard.title || "",
        contents: data.fetchBoard.contents || "",
      });

      setErrorMessage({
        writer: "hidden",
        password: "visible",
        title: "hidden",
        contents: "hidden",
      });
    }
  }, [props.isEdit, data]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleComplete = (data: Address) => {
    setJuso({
      zipcode: data.zonecode,
      address: data.address,
      addressDetail: "",
    });

    setIsModalOpen((prev) => !prev);
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setJuso({
      ...juso,
      addressDetail: event.target.value,
    });
  };

  const onChangeFile = async (event, index) => {
    const file = event.target.files?.[0];
    const result = await uploadFile({ variables: { file } });
    const newImageUrl = result.data.uploadFile.url;

    const updatedUrls = [...imageUrl];
    updatedUrls[index] = newImageUrl;
    setImageUrl(updatedUrls);
  };

  const onClickImage = (index: number) => {
    fileRef.current[index].click();
  };

  const onClickDeleteImage = (index) => {
    const deleteUrl = [...imageUrl];
    deleteUrl[index] = "";
    setImageUrl(deleteUrl);
  };

  return {
    data,
    registerCheck,
    errorMessage,
    isModalOpen,
    juso,
    youtubeUrl,
    fileRef,
    imageUrl,
    onChangeInput,
    onClickRegister,
    onClickEdit,
    onClickEditCancel,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    onChangeAddress,
    onChangeYoutubeUrl,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
  };
}
