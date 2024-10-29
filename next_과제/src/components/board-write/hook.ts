import { IformList, UploadFileList } from "@/components/board-write/types";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { validationImageFile } from "@/commons/libs/validation-image-file";
import { useEffect, useState } from "react";
import type { UploadProps, UploadFile } from "antd";
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

export const useBoardWrite = (formType: string) => {
  const router = useRouter();
  const params = useParams() as { boardId: string };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부
  const [modalType, setModalType] = useState(""); // 모달 타입

  const modalControl = ({ type }: { type: string }) => {
    setIsModalOpen((isOpen) => !isOpen);
    setModalType(type);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // !수정할 게시글 데이터 가져오기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId },
    skip: !(params.boardId && formType === "edit"),
  });

  // !이미지 업로드를 위한 fileList
  const [imgFileList, setImgFileList] = useState<UploadFileList[]>([]);
  useEffect(() => {
    if (data?.fetchBoard.images) {
      setImgFileList(
        data?.fetchBoard.images?.map((url) => ({
          uid: url.replace("https://storage.googleapis.com/", ""),
          name: url.split("/").pop(),
          status: "done",
          url: url.replace("https://storage.googleapis.com/", ""),
        })) as UploadFileList[]
      );
    }
  }, [data]);
  console.log("이미지 파일 리스트", imgFileList);

  // !게시글 등록 및 수정을 위한 useMutation
  const [upDateBoard] = useMutation(UpdateBoardDocument);
  const [newBoard] = useMutation(CreateBoardDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  const {
    control,
    setValue, // 입력값 설정 메서드
    formState: { errors }, // 폼의 상태를 나타내는 속성 isValid, isDirty, dirtyFields
    getValues, // 폼의 입력값을 반환하는 메서드
  } = useForm<IformList>({
    mode: "onChange",
  }); // 어떤 이벤트에 동작을 하도록 할지 설정

  // !게시글 수정 함수
  const onBoardEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // 비밀번호 확인
      const promptPassword = window.prompt("비밀번호를 입력해 주세요.");

      if (promptPassword) {
        const writeTitleData = getValues("writeTitle"); // useForm의 writeTitle 데이터를 가져옴
        const writeContentsData = getValues("writeContents"); // useForm의 writeTitle 데이터를 가져옴

        // 수정된 내용이 있는 경우에만 데이터 보내도록 처리
        const editVariables: MutationUpdateBoardArgs = {
          updateBoardInput: {},
          boardId: params.boardId,
          password: promptPassword,
        };

        if (writeTitleData)
          editVariables.updateBoardInput.title = writeTitleData;
        if (writeContentsData)
          editVariables.updateBoardInput.contents = writeContentsData;
        if (imgFileList.length > 0)
          editVariables.updateBoardInput.images = imgFileList
            .map((data) => data.url)
            .filter((url): url is string => url !== undefined);

        console.log(editVariables, imgFileList);

        const result = await upDateBoard({
          variables: editVariables,
          refetchQueries: [
            {
              query: FetchBoardDocument,
              variables: { boardId: params.boardId },
            },
          ],
        });

        message.open({
          type: "success",
          content: "게시글 수정이 완료되었습니다.",
        });
        router.push(`/boards/${result.data?.updateBoard._id}`);
      } else {
        modalControl({ type: "boardEditPasswordError" });
        return;
      }
    } catch (error) {
      if (error instanceof Error && "graphQLErrors" in error) {
        const graphQLError = error as { graphQLErrors: { message: string }[] };
        alert(`${graphQLError.graphQLErrors[0].message}`);
      } else {
        modalControl({ type: "boardEditErrorUnknown" });
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
    } = getValues(); // useForm의 모든 데이터를 가져옴

    // console.log(getValues());

    try {
      if (!writeName || !writePassword || !writeTitle || !writeContents) {
        modalControl({ type: "boardNewRequired" });
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
          images: imgFileList
            .map((data) => data.url)
            .filter((url): url is string => url !== undefined),
        },
      };
      console.log(writeVariables);

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
      console.log(result);
      message.open({
        type: "success",
        content: "게시글 등록이 완료되었습니다.",
      });
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      modalControl({ type: "boardNewErrorUnknown" });
      console.log(error);
    }
  };

  const handlePreviewImg = async (file: UploadFile) => {
    console.log("프리뷰", file);
    // setPreviewImage();
    // setPreviewOpen(true);
  };

  const handleChangeImg: UploadProps["onChange"] = async ({ file }) => {
    if (!file) {
      return;
    }

    const temp = [...imgFileList];
    if (file.status !== "removed") {
      // 이미지 삭제가 아닌 경우에만 검증 진행
      const isValid = validationImageFile(file.originFileObj as File);
      if (!isValid) {
        return;
      }
    } else {
      // 이미지 삭제시에는 업로드 하지 않음
      temp.pop();
      setImgFileList(temp);
      return;
    }

    const newFileItem: UploadFileList = {
      uid: file.uid,
      name: file.name,
      status: "uploading",
      url: "",
    };

    try {
      console.log(file);
      const res = await uploadFile({
        variables: {
          file: file.originFileObj as File,
        },
      });

      newFileItem.status = "done";
      newFileItem.uid = res.data?.uploadFile.url || "";
      newFileItem.url = res.data?.uploadFile.url || "";
      setImgFileList([...imgFileList, newFileItem]);
    } catch (err) {
      console.error(err);
      newFileItem.status = "error";
    }
  };

  return {
    data,
    onBoardEdit,
    onBoardNew,
    errors,
    control,
    setValue,
    Controller,
    router,
    params,
    imgFileList,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    handleChangeImg,
    handlePreviewImg,
    isModalOpen,
    setIsModalOpen,
    modalType,
    // handleRemoveImg,
    // defaultFileList,
  };
};
