import { UploadFileList, IformList } from "./types";
import { useRouter, useParams } from "next/navigation";
import {
  CreateTravelproductDocument,
  UpdateTravelproductDocument,
  FetchTravelproductDetailDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import type { UploadProps } from "antd";
import { validationImageFile } from "@/commons/libs/validation-image-file";
import { useForm } from "react-hook-form";
import { UploadFileDocument } from "@/commons/graphql/graphql";
import { v4 as uuid } from "uuid";

export const useProductWrite = () => {
  const router = useRouter();
  const { productId }: { productId: string } = useParams();
  const [tags, setTags] = useState<string[]>([]);

  //!수정할 게시글 데이터 가져오기
  const { data: travelProductData } = useQuery(
    FetchTravelproductDetailDocument,
    {
      variables: {
        travelproductId: productId,
      },
    }
  );
  const data = travelProductData?.fetchTravelproduct;

  // !react-hook-form 사용
  const methods = useForm<IformList>({
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
          uid: uuid(),
          name: url.split("/").pop(),
          status: "done",
          url: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME + url,
        })) as UploadFileList[]
      );

      if (data?.travelproductAddress?.lat && data?.travelproductAddress?.lng) {
        methods.setValue(
          "productAddressLAT",
          String(data?.travelproductAddress?.lat) ?? ""
        );
        methods.setValue(
          "productAddressLNG",
          String(data?.travelproductAddress?.lng) ?? ""
        );
      }
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
    } = methods.getValues();

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
        images: uploadImageUrls,
      },
      travelproductId: productId,
    };

    const result = await updateProduct({
      variables: updateVariables,
      refetchQueries: [
        {
          query: FetchTravelproductDetailDocument,
          variables: { travelproductId: productId },
        },
      ],
    });
    if (result.data?.updateTravelproduct._id) {
      alert("상품이 수정되었습니다.");
      router.push(`/products/${result.data?.updateTravelproduct._id}`);
    }
  };

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
    } = methods.getValues();

    const fileList = imgFileList.map((data) => data.originFileObj as File);
    const resultUrls = await Promise.all(
      fileList.map((file) => uploadFile({ variables: { file } }))
    );
    const uploadImageUrls = resultUrls
      .map((result) => result.data?.uploadFile.url ?? "")
      .filter((url) => url !== ""); // url이 없는 경우 제외

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
        images: uploadImageUrls,
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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // !이미지 업로드 핸들러
  const handleChangeImg: UploadProps["onChange"] = async ({ fileList }) => {
    setImgFileList(fileList as UploadFileList[]);
    console.log(fileList);

    // if (!file) {
    //   return;
    // }
    // const temp = [...imgFileList];
    // if (file.status !== "removed") {
    //   // 이미지 삭제가 아닌 경우에만 검증 진행
    //   const isValid = validationImageFile(file.originFileObj as File);
    //   if (!isValid) {
    //     return;
    //   }
    // } else {
    //   // 이미지 삭제시에는 업로드 하지 않음
    //   temp.pop();
    //   setImgFileList(temp);
    //   return;
    // }
    // const newFileItem: UploadFileList = {
    //   uid: file.uid,
    //   name: file.name,
    //   status: "uploading",
    //   url: "",
    // };
    // try {
    //   console.log(file);
    //   const res = await uploadFile({
    //     variables: {
    //       file: file.originFileObj as File,
    //     },
    //   });
    //   //랜덤한 숫자를 리턴하는 함수
    //   const randomNum = String(Math.floor(Math.random() * 100));
    //   newFileItem.status = "done";
    //   newFileItem.uid = randomNum || "";
    //   newFileItem.url = res.data?.uploadFile.url || "";
    //   setImgFileList([...imgFileList, newFileItem]);
    // } catch (err) {
    //   console.error(err);
    //   newFileItem.status = "error";
    // }
  };

  // ! 상품 내용 변경
  const onChangeProductContents = (html: string) => {
    methods.setValue("productContents", html === "<p><br></p>" ? "" : html);
    methods.trigger("productContents");
  };

  // ! 주소 변경
  const setAddress = (field: keyof IformList, value: string) => {
    methods.setValue(field, value);
    methods.trigger(field);
  };

  return {
    createProductClick,
    updateProductClick,
    imgFileList,
    router,
    methods,
    previewOpen,
    previewImage,
    setPreviewImage,
    setPreviewOpen,
    handleChangeImg,
    onChangeProductContents,
    data,
    productId,
    setTags,
    tags,
    setAddress,
  };
};
