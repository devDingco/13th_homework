import {
  IeditVariables,
  IformList,
  // IformResister,
} from "@/components/board-write/types";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { FileType } from "@/components/board-write/types";
import { useState } from "react";
import type { UploadProps, UploadFile } from "antd";
import { Modal } from "antd";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  // UploadFileDocument,
  FetchBoardsListDocument,
} from "@/commons/graphql/graphql";

export const useBoardWrite = (formType: string) => {
  const router = useRouter();
  const params = useParams() as { boardId: string };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 오픈 여부
  const [modalType, setModalType] = useState(""); // 모달 타입

  const success = (message: string) => {
    Modal.success({
      content: `${message}`,
    });
  };

  // const prompt = (message: string) => {
  //   Modal.confirm({
  //     title: "비밀번호 확인",
  //     content: `${message}`,
  //     onOk() {
  //       console.log("OK");
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };

  const modalControl = ({ type }: { type: string }) => {
    setIsModalOpen((isOpen) => !isOpen);
    setModalType(type);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "error",
    // },
  ]);

  // !수정할 게시글 데이터 가져오기
  const { data: fetchData } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId },
    skip: !(params.boardId && formType === "edit"),
  });

  const data = fetchData || null;

  // !게시글 등록 및 수정을 위한 useMutation
  const [upDateBoard] = useMutation(UpdateBoardDocument);
  const [newBoard] = useMutation(CreateBoardDocument);
  // const [uploadFile] = useMutation(UploadFileDocument);

  const {
    control,
    // register, // 검증 규칙 적용 메서드
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
        const editVariables: IeditVariables = {
          updateBoardInput: {},
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

        success("게시글이 수정되었습니다.");
        router.push(`/boards/${result.data?.updateBoard._id}`);
      } else {
        // alert("비밀번호가 틀려서 수정할 수 없습니다.");
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
      // imgFiles,
      // imgFile1,
      // imgFile2,
      // imgFile3,
    } = getValues(); // useForm의 모든 데이터를 가져옴

    console.log(getValues());

    try {
      if (!writeName || !writePassword || !writeTitle || !writeContents) {
        modalControl({ type: "boardNewRequired" });
        return;
      }
      const writeVariables = {
        createBoardInput: {
          writer: writeName,
          password: writePassword,
          title: writeTitle,
          contents: writeContents,
          youtubeUrl: youtubeUrl,
          boardAddress: {
            zipcode: writeAddressPost,
            address: writeAddress,
            addressDetail: writeAddressDetail,
          },
          images: [""],
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
      success("게시글이 등록되었습니다.");
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      // alert(`게시글 등록에 실패했습니다.`);
      modalControl({ type: "boardNewErrorUnknown" });
      console.log(error);
    }
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    // // ! 나중에 용량 조절 및 용량 제한 기능 추가 필요
    console.log(newFileList);

    // const formData = new FormData();
    // formData.append("file", newFileList[newFileList.length - 1].originFileObj);

    // const imgFile = newFileList[newFileList.length - 1].originFileObj;
    // console.log(imgFile);

    // const result = await uploadFile({
    //   variables: { file: imgFile },
    // });
    // console.log(result);
    setFileList(newFileList);
  };

  return {
    data,
    onBoardEdit,
    onBoardNew,
    errors,
    // formResister,
    control,
    setValue,
    Controller,
    router,
    params,
    fileList,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    handleChange,
    handlePreview,
    isModalOpen,
    setIsModalOpen,
    modalType,
  };
};
