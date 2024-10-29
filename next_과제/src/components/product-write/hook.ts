import { UploadFileList, IformList } from "./types";
import { useRouter, useParams } from "next/navigation";
import { CREATE_TRAVEL_PRODUCT, UPDATE_TRAVEL_PRODUCT } from "./queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import type { UploadProps } from "antd";
import { validationImageFile } from "@/commons/libs/validation-image-file";
import { useForm } from "react-hook-form";
import { UploadFileDocument } from "@/commons/graphql/graphql";

export const useProductWrite = (isEdit: boolean) => {
  const router = useRouter();
  const { boardId } = useParams();

  const {
    control,
    setValue,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm<IformList>({
    mode: "onChange",
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // !이미지 업로드를 위한 fileList
  const [imgFileList, setImgFileList] = useState<UploadFileList[]>([]);
  //  useEffect(() => {
  //    if (data?.fetchBoard.images) {
  //      setImgFileList(
  //        data?.fetchBoard.images?.map((url) => ({
  //          uid: url.replace("https://storage.googleapis.com/", ""),
  //          name: url.split("/").pop(),
  //          status: "done",
  //          url: url.replace("https://storage.googleapis.com/", ""),
  //        })) as UploadFileList[]
  //      );
  //    }
  //  }, [data]);
  //  console.log("이미지 파일 리스트", imgFileList);

  //!수정할 게시글 데이터 가져오기
  // const { data } = useQuery()

  // !게시글 등록 및 수정을 위한 useMutation
  const [createProduct] = useMutation(CREATE_TRAVEL_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_TRAVEL_PRODUCT);
  const [uploadFile] = useMutation(UploadFileDocument);

  //! 상품 등록 클릭
  const createProductClick = async () => {
    const result = await createProduct({
      variables: {
        createProductInput: {
          name: getValues("productName"),
          remarks: getValues("productRemarks"),
          contents: getValues("productContents"),
          tags: getValues("productTags"),
          images: imgFileList.map((data) => data.url),
        },
      },
    });
    if (result.data?.createProduct._id) {
      alert("상품이 등록되었습니다.");
      router.push(`/product/${result.data?.createProduct._id}`);
    }
  };

  //! 상품 수정 클릭
  const updateProductClick = async () => {
    const result = await updateProduct({
      variables: {
        updateProductInput: {
          productId: boardId,
          name: getValues("productName"),
          remarks: getValues("productRemarks"),
          contents: getValues("productContents"),
          tags: getValues("productTags"),
          images: imgFileList.map((data) => data.url),
        },
      },
    });
    if (result.data?.updateProduct._id) {
      alert("상품이 수정되었습니다.");
      router.push(`/product/${result.data?.updateProduct._id}`);
    }
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
    handleChangeImg,
    createProductClick,
    updateProductClick,
    control,
    imgFileList,
    previewOpen,
    setPreviewImage,
    previewImage,
    boardId,
    errors,
    router,
    setValue,
    isValid,
    isDirty,
    setPreviewOpen,
    getValues,
    // data,
  };
};
