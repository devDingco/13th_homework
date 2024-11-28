import { IformList, UploadFileList } from "@/components/board-write/types";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
// import { validationImageFile } from "@/commons/libs/validation-image-file";
import { useEffect, useState } from "react";
import type { UploadProps, UploadFile } from "antd";
import { useModalStore } from "@/commons/stores/modal-store";
import { v4 as uuid } from "uuid";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  UploadFileDocument,
  MutationUpdateBoardArgs,
  FetchBoardsListDocument,
  MutationCreateBoardArgs,
} from "@/commons/graphql/graphql";
import { message } from "antd";
import { FileType } from "@/components/board-write/types";
import { getBase64 } from "@/commons/utils/getBase64";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams() as { boardId: string };
  const { setIsModal } = useModalStore();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // !수정할 게시글 데이터 가져오기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId },
    skip: !(params.boardId && isEdit),
  });

  // !이미지 업로드를 위한 fileList
  const [imgFileList, setImgFileList] = useState<UploadFileList[]>([]);
  useEffect(() => {
    if (data?.fetchBoard.images) {
      setImgFileList(
        data?.fetchBoard.images?.map((url) => ({
          uid: uuid(),
          name: url.split("/").pop(),
          status: "done",
          url: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME + url,
        })) as UploadFileList[]
      );
    }
  }, [data]);

  // !게시글 등록 및 수정을 위한 useMutation
  const [upDateBoard] = useMutation(UpdateBoardDocument);
  const [newBoard] = useMutation(CreateBoardDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  const methods = useForm<IformList>({
    mode: "onChange",
  }); // 어떤 이벤트에 동작을 하도록 할지 설정

  // !게시글 수정 함수
  const onBoardEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // 비밀번호 확인
      const promptPassword = window.prompt("비밀번호를 입력해 주세요.");

      if (promptPassword) {
        const writeTitleData = methods.getValues("writeTitle"); // useForm의 writeTitle 데이터를 가져옴
        const writeContentsData = methods.getValues("writeContents"); // useForm의 writeTitle 데이터를 가져옴

        // 이미지 업로드
        const resultUrls = await Promise.all(
          imgFileList.map((data) => {
            if (data.url) {
              // 이미지가 이미 업로드 된 경우
              return data.url.replace(
                `${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}`,
                ""
              );
            } else {
              const file = data.originFileObj as File;
              return uploadFile({ variables: { file } });
            }
          })
        );

        // 이미지 업로드 후 url만 가져오기
        const uploadImageUrls = resultUrls
          .map((result) => {
            if (typeof result === "string") {
              return result;
            } else {
              return result.data?.uploadFile.url ?? "";
            }
          })
          .filter((url) => url !== ""); // url이 없는 경우 제외

        // 수정된 내용이 있는 경우에만 데이터 보내도록 처리
        const editVariables: MutationUpdateBoardArgs = {
          updateBoardInput: {
            images: uploadImageUrls,
          },
          boardId: params.boardId,
          password: promptPassword,
        };

        if (writeTitleData)
          editVariables.updateBoardInput.title = writeTitleData;
        if (writeContentsData)
          editVariables.updateBoardInput.contents = writeContentsData;

        const result = await upDateBoard({
          variables: editVariables,
          refetchQueries: [
            {
              query: FetchBoardDocument,
              variables: { boardId: params.boardId },
            },
          ],
        });

        if (result.data?.updateBoard._id) {
          setIsModal({
            name: "success",
            contents: "게시글 수정이 완료되었습니다.",
          });
          router.push(`/boards/${result.data?.updateBoard._id}`);
        }
      } else {
        setIsModal({ name: "error", contents: "비밀번호를 입력해 주세요." });
        return;
      }
    } catch (error) {
      if (error instanceof Error && "graphQLErrors" in error) {
        const graphQLError = error as { graphQLErrors: { message: string }[] };
        setIsModal({
          name: "error",
          contents: `${graphQLError.graphQLErrors[0].message}`,
        });
      }
    }
  };

  // !게시글 등록 함수
  const onBoardNew = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const {
      writeName,
      writeAddress,
      writePassword,
      writeTitle,
      writeContents,
      youtubeUrl,
      writeAddressPost,
      writeAddressDetail,
    } = methods.getValues(); // useForm의 모든 데이터를 가져옴

    const fileList = imgFileList.map((data) => data.originFileObj as File);
    const resultUrls = await Promise.all(
      fileList.map((file) => uploadFile({ variables: { file } }))
    );
    const uploadImageUrls = resultUrls
      .map((result) => result.data?.uploadFile.url ?? "")
      .filter((url) => url !== ""); // url이 없는 경우 제외

    try {
      if (!writeName || !writePassword || !writeTitle || !writeContents) {
        setIsModal({ name: "required" });
        return;
      }
      const writeVariables: MutationCreateBoardArgs = {
        createBoardInput: {
          writer: writeName,
          password: writePassword,
          title: writeTitle,
          contents: writeContents,
          youtubeUrl,
          boardAddress: {
            zipcode: writeAddressPost,
            address: writeAddress,
            addressDetail: writeAddressDetail,
          },
          images: uploadImageUrls,
        },
      };

      const result = await newBoard({
        variables: writeVariables,
        refetchQueries: [
          {
            query: FetchBoardsListDocument,
          },
          {
            query: FetchBoardDocument,
            variables: { boardId: params.boardId },
          },
        ],
      });

      if (result.data?.createBoard._id) {
        message.open({
          type: "success",
          content: "게시글 등록이 완료되었습니다.",
        });
        router.push(`/boards/${result.data?.createBoard._id}`);
      }
    } catch (error) {
      setIsModal({ name: "error" });
      console.log(error);
    }
  };

  // ! 이미지 미리보기 함수
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // ! 이미지리스트 저장
  const handleChangeImg: UploadProps["onChange"] = ({ fileList }) => {
    setImgFileList(fileList as UploadFileList[]);
    console.log(fileList);
  };

  // ! 게시글 내용 수정 함수
  const onChangeWriteContents = (html: string) => {
    methods.setValue("writeContents", html === "<p><br></p>" ? "" : html);
    methods.trigger("writeContents");
  };

  // ! 주소 변경
  const setAddress = (field: keyof IformList, value: string) => {
    methods.setValue(field, value);
    methods.trigger(field);
  };

  return {
    data,
    onBoardEdit,
    onBoardNew,
    router,
    params,
    imgFileList,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    handleChangeImg,
    methods,
    onChangeWriteContents,
    setAddress,
    handlePreview,
  };
};
