import {
  IeditVariables,
  IformList,
  IformResister,
} from "@/components/board-write/types";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { FileType } from "@/components/board-write/types";
import { useState } from "react";
import type { UploadProps, UploadFile } from "antd";

import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  UploadFileDocument,
} from "@/commons/graphql/graphql";

export const useBoardWrite = (formType: string) => {
  const router = useRouter();
  const params = useParams() as { boardId: string };

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
  const [uploadFile] = useMutation(UploadFileDocument);

  const {
    control,
    register, // 검증 규칙 적용 메서드
    setValue, // 입력값 설정 메서드
    formState: { errors, isValid, isDirty, dirtyFields }, // 폼의 상태를 나타내는 속성 isValid, isDirty
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
        // console.log(result);
        alert(`게시글이 수정되었습니다.`);
        router.push(`/boards/${result.data?.updateBoard._id}`);
      } else {
        alert("비밀번호가 틀려서 수정할 수 없습니다.");
        return;
      }
    } catch (error) {
      if (error instanceof Error && "graphQLErrors" in error) {
        const graphQLError = error as { graphQLErrors: { message: string }[] };
        alert(`${graphQLError.graphQLErrors[0].message}`);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
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
      imgFiles,
      // imgFile1,
      // imgFile2,
      // imgFile3,
    } = getValues(); // useForm의 모든 데이터를 가져옴

    console.log(getValues());

    try {
      if (!writeName || !writePassword || !writeTitle || !writeContents) {
        alert("필수 입력 사항을 입력해 주세요.");
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
            query: FetchBoardDocument,
            variables: { boardId: params.boardId },
          },
        ],
      });
      console.log(result);
      alert(`게시글이 등록되었습니다.`);
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      alert(`게시글 등록에 실패했습니다.`);
      console.log(error);
    }
  };

  const regexPattern = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /(?=.*\d)(?=.*[a-z]).{8,}/, // 8자 이상, 영문, 숫자포함
    phone: /^\d{3}-\d{3,4}-\d{4}$/,
    url: /^http[s]?:\/\/([\S]{3,})/i,
    youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
  };

  const formResister: IformResister = {
    writeName: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 10,
        message: "작성자명은 10자 이내로 입력해 주세요.",
      },
    },
    writePassword: {
      required: "필수 입력 사항입니다.",
      // pattern: {
      //   value: regexPattern.password,
      //   message: "비밀번호는 8자 이상, 숫자와 영문자를 포함해야 합니다.",
      // },
      minLength: {
        value: 4,
        message: "비밀번호는 4자 이상으로 입력해 주세요.",
      },
    },
    writeTitle: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 20,
        message: "제목은 20자 이내로 입력해 주세요.",
      },
    },
    writeContents: {
      required: "필수 입력 사항입니다.",
      // maxLength: {
      //   value: 300,
      //   message: "내용은 300자 이내로 입력해 주세요.",
      // },
    },
    writeAddress: {},
    youtubeUrl: {
      pattern: {
        value: regexPattern.youtube,
        message: "유투브 URL 형식을 확인해 주세요. ex) https://youtu.be/xxxxxx",
      },
    },
    imgFiles: {
      //! 이미지 용량 및 파일 형식 제한 추가 필요
      pattern: {
        value: /\.(jpe?g|png|gif)$/i,
        message: "이미지 파일만 업로드 가능합니다.",
      },
    },
    email: {
      pattern: {
        value: regexPattern.email,
        message: "이메일 형식을 확인해 주세요.",
      },
    },
    phone: {
      pattern: {
        value: regexPattern.phone,
        message: "휴대폰 번호 형식을 확인해 주세요.",
      },
    },
    userId: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 20,
        message: "아이디는 20자 이내로 입력해 주세요.",
      },
    },
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
    onBoardEdit,
    onBoardNew,
    control,
    register,
    setValue,
    errors,
    isValid,
    isDirty,
    dirtyFields,
    data,
    formResister,
    Controller,
    router,
    params,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    fileList,
    setFileList,
    handlePreview,
    handleChange,
  };
};
