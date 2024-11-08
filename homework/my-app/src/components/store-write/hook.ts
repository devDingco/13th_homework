"use client";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "@apollo/client";
import styles from "./style.module.css";

import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { StoreWritePageProps } from "./types";
import { ProductSchema, productSchema } from "./schema";
import {
  CREATE_TRAVELPRODUCT,
  FETCH_TRAVEL_PRODUCT,
  UPDATE_TRAVEL_PRODUCT,
  UPLOAD_FILE,
} from "./queries";

const useStoreWrite = (props: StoreWritePageProps) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createProduct] = useMutation(CREATE_TRAVELPRODUCT);
  const [updateProduct] = useMutation(UPDATE_TRAVEL_PRODUCT);

  const params = useParams();
  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId: params.boardId },
  });

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [contents, setContents] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (data) {
      const product = data.fetchTravelproduct;
      setValue("name", product.name || "");
      setValue("remarks", product.remarks || "");
      setValue("price", product.price || 0);
      setValue("contents", product.contents || "");
      setValue("zipcode", product.travelproductAddress.zipcode || "");
      setValue("address", product.travelproductAddress.address || "");
      setValue(
        "addressDetail",
        product.travelproductAddress.addressDetail || ""
      );

      setZipcode(product.travelproductAddress.zipcode || "");
      setAddress(product.travelproductAddress.address || "");
      setContents(product.contents || "");
      setHashtags(product.tags || []);
      setImageUrl(product.images || []);
    }
  }, [data, setValue]);

  const handleQuillChange = (value: string) => {
    setContents(value);
    setValue("contents", value);
  };

  const handleComplete = (data: Address) => {
    setZipcode(data.zonecode);
    setAddress(data.roadAddress || data.jibunAddress);
    setValue("zipcode", data.zonecode);
    setValue("address", data.roadAddress || data.jibunAddress);
    onToggleModal();
  };

  const onClickImage = () => fileRef.current?.click();

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        const result = await uploadFile({ variables: { file } });
        if (result.data?.uploadFile.url)
          uploadedUrls.push(result.data.uploadFile.url);
      } catch (error) {
        console.error("파일 업로드 오류:", error);
      }
    }
    setImageUrl((prev) => [...prev, ...uploadedUrls]);
  };

  const imgDeleted = (index: number) =>
    setImageUrl((prev) => prev.filter((_, i) => i !== index));

  const addHashtag = () => {
    if (currentTag && !hashtags.includes(currentTag)) {
      setHashtags([...hashtags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeHashtag = (tag: string) =>
    setHashtags(hashtags.filter((t) => t !== tag));

  const onToggleModal = () => setIsModalOpen(!isModalOpen);

  const onSubmit = async (data: ProductSchema) => {
    try {
      const travelproductAddress = {
        zipcode: data.zipcode,
        address: data.address,
        addressDetail: data.addressDetail,
        lat: 37.5665, // 임시 위도
        lng: 126.978, // 임시 경도
      };

      if (props.isEdit) {
        const result = await updateProduct({
          variables: {
            updateTravelproductInput: {
              name: data.name,
              remarks: data.remarks,
              price: data.price,
              contents: data.contents,
              tags: hashtags,
              travelproductAddress, // 주소 데이터를 travelproductAddress로 묶어서 전송
              images: imageUrl,
            },
            travelproductId: params.boardId,
          },
        });
        console.log("수정 성공:", result.data);
      } else {
        const result = await createProduct({
          variables: {
            input: {
              name: data.name,
              remarks: data.remarks,
              price: data.price,
              contents: data.contents,
              tags: hashtags,
              travelproductAddress, // 주소 데이터를 travelproductAddress로 묶어서 전송
              images: imageUrl,
            },
          },
        });
        console.log("등록 성공:", result.data);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return {
    handleSubmit,
    register,
    handleQuillChange,
    setAddressDetail,
    isModalOpen,
    onToggleModal,
    handleComplete,
    currentTag,
    setCurrentTag,
    addHashtag,
    removeHashtag,
    imgDeleted,
    onClickImage,
    onChangeFile,
    onSubmit,
    zipcode,
    address,
    data,
    hashtags,
    imageUrl,
    fileRef,
    errors,
    contents,
  };
};

export default useStoreWrite;
