"use client";
import { useForm } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { gql, useMutation } from "@apollo/client";
import styles from "./style.module.css";

// React-Quill을 SSR 지원을 위해 동적 로딩
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
      name
      price
      contents
    }
  }
`;

const productSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요"),
  remarks: z.string().min(1, "한줄 요약을 입력해주세요"),
  price: z.number().positive("가격은 0원 이상이어야 합니다"),
  address: z.string().min(1, "주소를 입력해주세요"),
  tags: z.string().optional(),
  contents: z.string().min(1, "상품 설명을 입력해주세요"),
});

export default function ProductRegisterPage() {
  const [address, setAddress] = useState("");
  const [files, setFiles] = useState([]);

  const [createProduct] = useMutation(CREATE_TRAVELPRODUCT);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // ReactQuill 내용이 바뀔 때마다 contents에 반영
  const handleQuillChange = (value) => {
    setValue("contents", value); // contents 필드에 값 설정
  };

  const handleComplete = (data) => {
    const fullAddress = data.address;
    setAddress(fullAddress);
    setValue("address", fullAddress);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await createProduct({
        variables: {
          input: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: [], // 기능 미완
            travelproductAddress: {
              zipcode: "12345", // 기능 미완
              address: data.address,
              addressDetail: "상세 주소", // 기능미완
              lat: 37.5665, //기능미완
              lng: 126.978, //기능 미완
            },
            images: [],
          },
        },
      });
      console.log("등록 성공:", result.data);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2>상품 등록하기</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>상품명</label>
        <input className={styles.input} type="text" {...register("name")} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>한줄 요약</label>
        <input className={styles.input} type="text" {...register("remarks")} />
        {errors.remarks && (
          <p className={styles.error}>{errors.remarks.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>판매 가격</label>
        <input
          className={styles.input}
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>상품 설명</label>
        <ReactQuill
          onChange={handleQuillChange}
          className={styles.quill}
          placeholder="내용을 입력해 주세요."
          style={{ height: "300px", marginBottom: "20px" }}
        />
        {errors.contents && (
          <p className={styles.error}>{errors.contents.message}</p>
        )}
      </div>

      <div className={styles.addressSection}>
        <div className={styles.addressInput}>
          <label className={styles.label}>주소</label>
          <DaumPostcode onComplete={handleComplete} />
          <input
            type="text"
            value={address}
            {...register("address")}
            readOnly
          />
          {errors.address && (
            <p className={styles.error}>{errors.address.message}</p>
          )}
        </div>
        <div className={styles.mapPlaceholder}>
          <p>주소와 연계된 지도를 표시할 공간입니다.</p>
        </div>
      </div>

      <div className={styles.fileUploadSection}>
        <label className={styles.label}>사진 첨부</label>
        <input type="file" multiple onChange={handleFileChange} />
        <div className={styles.filePreview}>
          {files.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          등록
        </button>
        <button type="button" className={styles.cancelButton}>
          취소
        </button>
      </div>
    </form>
  );
}
