"use client";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./style.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Modal } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
      name
      price
      contents
      tags
      images
      travelproductAddress {
        zipcode
        address
        addressDetail
      }
      buyer {
        _id
        name
      }
      seller {
        _id
        name
      }
    }
  }
`;
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const FETCH_TRAVEL_PRODUCT = gql`
  query FetchTravelProduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
        deletedAt
      }
      buyer {
        picture
        deletedAt
      }
      seller {
        picture
        deletedAt
      }
      soldAt
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const UPDATE_TRAVEL_PRODUCT = gql`
  mutation updateTravelproduct(
    $updateTravelproductInput: UpdateTravelproductInput!
    $travelproductId: ID!
  ) {
    updateTravelproduct(
      updateTravelproductInput: $updateTravelproductInput
      travelproductId: $travelproductId
    ) {
      _id
    }
  }
`;

const productSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요"),
  remarks: z.string().min(1, "한줄 요약을 입력해주세요"),
  price: z.number().positive("가격은 0원 이상이어야 합니다").optional(),
  address: z.string().min(1, "주소를 입력해주세요"),
  zipcode: z.string().min(5, "우편번호를 입력해주세요"),
  contents: z.string().min(1, "상품 설명을 입력해주세요"),
  addressDetail: z.string().optional(),
});

export default function StoreWritePage(props) {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileRef = useRef(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [createProduct] = useMutation(CREATE_TRAVELPRODUCT);
  const [updateProduct] = useMutation(UPDATE_TRAVEL_PRODUCT);

  const params = useParams();
  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId: params.boardId },
  });
  console.log(data);
  const [zipcode, setZipcode] = useState(
    data?.fetchTravelProduct?.travelproductAddress?.zipcode || ""
  );
  const [address, setAddress] = useState(
    data?.fetchTravelProduct?.travelproductAddress?.address || ""
  );
  const [addressDetail, setAddressDetail] = useState(
    data?.fetchTravelProduct?.travelproductAddress?.addressDetail || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleQuillChange = (value) => {
    setContents(value);
    setValue("contents", value);
  };

  const handleComplete = (data: Address) => {
    setZipcode(data.zonecode);
    setAddress(
      data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress
    );
    setValue(
      "address",
      data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress
    );
    setValue("zipcode", data.zipcode);
    onToggleModal();
  };

  const onClickImage = () => {
    fileRef.current.click();
  };

  const onChangeFile = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const result = await uploadFile({
          variables: { file },
        });

        if (result.data?.uploadFile.url) {
          uploadedUrls.push(result.data.uploadFile.url);
        }
      }

      setImageUrl((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  const imgDeleted = (index) => {
    setImageUrl((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (data?.fetchTravelproduct?.tags) {
      setHashtags(data.fetchTravelproduct.tags);
    }
  }, [data]);

  const addHashtag = () => {
    if (currentTag && !hashtags.includes(currentTag)) {
      setHashtags([...hashtags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [contents, setContents] = useState("");

  useEffect(() => {
    if (props.isEdit && data) {
      setValue("name", data.fetchTravelproduct.name || "");
      setValue("remarks", data.fetchTravelproduct.remarks || "");
      setValue("price", data.fetchTravelproduct.price || 0);
      setValue(
        "zipcode",
        data.fetchTravelproduct.travelproductAddress.zipcode || ""
      );
      setValue(
        "address",
        data.fetchTravelproduct.travelproductAddress.address || ""
      );
      setValue(
        "addressDetail",
        data.fetchTravelproduct.travelproductAddress.addressDetail || ""
      );
      setContents(data.fetchTravelproduct.contents || "");
      setImageUrl(data.fetchTravelproduct.images || []);

      setZipcode(data.fetchTravelproduct.travelproductAddress.zipcode || "");
      setAddress(data.fetchTravelproduct.travelproductAddress.address || "");
      setAddressDetail(
        data.fetchTravelproduct.travelproductAddress.addressDetail || ""
      );

      setValue(
        "contents",
        data.fetchTravelproduct.contents || "내용을 입력해 주세요."
      );
    }
  }, [data, props.isEdit, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (props.isEdit) {
        const result = await updateProduct({
          variables: {
            updateTravelproductInput: {
              name: data.name,
              remarks: data.remarks,
              contents: data.contents,
              price: data.price,
              tags: hashtags,
              travelproductAddress: {
                zipcode: data.zipcode,
                address: data.address,
                addressDetail: data.addressDetail,
                lat: 37.5665, // 임시 위도
                lng: 126.978, // 임시 경도
              },
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
              contents: data.contents,
              price: data.price,
              tags: hashtags,
              travelproductAddress: {
                zipcode: data.zipcode,
                address: data.address,
                addressDetail: data.addressDetail,
                lat: 37.5665, // 임시 위도
                lng: 126.978, // 임시 경도
              },
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
          defaultValue={data?.fetchTravelproduct?.contents ?? ""}
        />
        <p className={styles.error}>{errors.contents?.message}</p>
      </div>

      <div className={styles.addressSection}>
        <label className={styles.label}>주소</label>
        <div className={styles.zipcodeContainer}>
          <input
            type="text"
            value={zipcode}
            {...register("zipcode")}
            readOnly
            placeholder="우편번호"
            className={styles.zipcodeInput}
          />
          <button
            type="button"
            onClick={onToggleModal}
            className={styles.zipcodeButton}
          >
            우편번호 검색
          </button>
        </div>

        <input
          type="text"
          value={address}
          {...register("address")}
          readOnly
          placeholder="주소를 입력해 주세요"
          className={styles.addressInput}
        />

        <input
          type="text"
          {...register("addressDetail")}
          onChange={(e) => setAddressDetail(e.target.value)}
          placeholder="상세주소를 입력해 주세요"
          className={styles.addressDetailInput}
        />

        <div className={styles.mapPlaceholder}>
          <p>지도자리</p>
        </div>

        {/* 우편번호 검색 모달 */}
        {isModalOpen && (
          <Modal
            title="주소 검색"
            open={isModalOpen}
            onOk={onToggleModal}
            onCancel={onToggleModal}
            footer={null}
          >
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </Modal>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>해시태그</label>
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          placeholder="해시태그를 입력하세요"
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addHashtag();
            }
          }}
        />
        <button
          type="button"
          onClick={addHashtag}
          className={styles.addTagButton}
        >
          추가
        </button>
        <div className={styles.hashtags}>
          {hashtags.map((tag, index) => (
            <button
              key={index}
              onClick={() => removeHashtag(tag)}
              className={styles.tagButton}
            >
              #{tag} ✕
            </button>
          ))}
        </div>
      </div>

      <div className={styles.boxEnd}>
        <div className={styles.labelContainer2}>
          <label className={styles.label}>사진 첨부</label>
          <div className={styles.photoBoxContainer}>
            <div className={styles.flexbox2}>
              {imageUrl.map((url, index) => (
                <div
                  key={index}
                  className={styles.photoBox}
                  style={{
                    backgroundImage: `url(https://storage.googleapis.com/${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <button
                    className={styles.deleteButton}
                    onClick={() => imgDeleted(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* 추가 이미지 업로드 버튼 */}
              <div className={styles.photoBox} onClick={onClickImage}>
                <div className={styles.addImageIcon}>
                  <Image
                    src="/image/add.png"
                    alt="사진 추가"
                    width={30}
                    height={30}
                  />
                </div>
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  multiple // 여러 파일 선택 허용
                  onChange={onChangeFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          {props.isEdit ? "수정하기" : "등록하기"}
        </button>
        <button type="button" className={styles.cancelButton}>
          취소
        </button>
      </div>
    </form>
  );
}
