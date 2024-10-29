import { UploadFileList, IformList } from "./types";
import { useRouter, useParams } from "next/navigation";
import {
  CreateTravelproductDocument,
  UpdateTravelproductDocument,
  FetchTravelproductDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import type { UploadProps } from "antd";
import { validationImageFile } from "@/commons/libs/validation-image-file";
import { useForm } from "react-hook-form";
import { UploadFileDocument } from "@/commons/graphql/graphql";

export const useProductWrite = () => {
  const router = useRouter();
  const { productId }: { productId: string } = useParams();
  const [tags, setTags] = useState<string[]>([]);

  //!수정할 게시글 데이터 가져오기
  const { data: travelProductData } = useQuery(FetchTravelproductDocument, {
    variables: {
      travelproductId: productId,
    },
  });

  const data = travelProductData?.fetchTravelproduct;

  const {
    control,
    setValue,
    formState: { errors, isValid, isDirty },
    getValues,
    watch,
  } = useForm<IformList>({
    mode: "onChange",
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // !이미지 업로드를 위한 fileList
  const [imgFileList, setImgFileList] = useState<UploadFileList[]>([]);
  useEffect(() => {
    if (data?.images) {
      setImgFileList(
        data?.images?.map((url) => ({
          uid: url.replace("https://storage.googleapis.com/", ""),
          name: url.split("/").pop(),
          status: "done",
          url: url.replace("https://storage.googleapis.com/", ""),
        })) as UploadFileList[]
      );
    }
    if (data?.tags) {
      setTags(data?.tags);
    }
  }, [data]);
  console.log("이미지 파일 리스트", imgFileList);

  // !게시글 등록 및 수정을 위한 useMutation
  const [createProduct] = useMutation(CreateTravelproductDocument);
  const [updateProduct] = useMutation(UpdateTravelproductDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  //! 상품 등록 클릭
  const createProductClick = async () => {
    const {
      productName,
      productRemarks,
      productContents,
      productPrice,
      productAddressPost,
      productAddress,
      productAddressDetail,
      productAddressLAT,
      productAddressLNG,
    } = getValues();

    const createProductVariables = {
      createTravelproductInput: {
        name: productName as string,
        remarks: productRemarks as string,
        contents: productContents as string,
        price: Number(productPrice),
        tags: tags,
        travelproductAddress: {
          zipcode: productAddressPost,
          address: productAddress,
          addressDetail: productAddressDetail,
          lat: Number(productAddressLAT),
          lng: Number(productAddressLNG),
        },
        images: imgFileList.map((data) => data.url),
      },
    };

    const result = await createProduct({
      variables: createProductVariables,
    });

    if (result.data?.createTravelproduct._id) {
      alert("상품이 등록되었습니다.");
      router.push(`/products/${result.data?.createTravelproduct._id}`);
    }
  };

  //! 상품 수정 클릭
  const updateProductClick = async () => {
    const {
      productName,
      productRemarks,
      productContents,
      productPrice,
      productAddressPost,
      productAddress,
      productAddressDetail,
      productAddressLAT,
      productAddressLNG,
    } = getValues();

    const updateVariables = {
      updateTravelproductInput: {
        name: productName as string,
        remarks: productRemarks as string,
        contents: productContents as string,
        price: Number(productPrice),
        tags: tags,
        travelproductAddress: {
          zipcode: productAddressPost,
          address: productAddress,
          addressDetail: productAddressDetail,
          lat: Number(productAddressLAT),
          lng: Number(productAddressLNG),
        },
        images: imgFileList.map((data) => data.url),
      },
      travelproductId: productId,
    };

    const result = await updateProduct({
      variables: updateVariables,
    });
    if (result.data?.updateTravelproduct._id) {
      alert("상품이 수정되었습니다.");
      router.push(`/products/${result.data?.updateTravelproduct._id}`);
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

      //랜덤한 숫자를 리턴하는 함수
      const randomNum = String(Math.floor(Math.random() * 100));

      newFileItem.status = "done";
      newFileItem.uid = randomNum || "";
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
    errors,
    router,
    setValue,
    isValid,
    isDirty,
    setPreviewOpen,
    getValues,
    data,
    productId,
    setTags,
    tags,
    watch,
  };
};
