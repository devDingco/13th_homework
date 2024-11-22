"use client";

import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useParams, useRouter } from "next/navigation";
import {
  CREATE_TRAVEL_PRODUCT,
  FECTH_TRAVEL_PRODUCT,
  UPDATE_TRAVEL_PRODUCT,
  UPLOAD_FILE,
} from "./queries";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function PerchaseWrite(props) {
  const router = useRouter();
  const params = useParams();
  console.log(params.purchaseId); // 올바른 값이 출력되는지 확인
  // =====================이미지
  const [imageUrls, setImageUrls] = useState([]); // 여러 이미지 URL을 배열로 관리
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (event) => {
    const files = event.target.files; // 선택한 파일들을 배열로 가져옴
    const uploadPromises = Array.from(files).map((file) =>
      uploadFile({ variables: { file } })
    );

    try {
      const results = await Promise.all(uploadPromises);
      const urls = results.map((result) => result.data.uploadFile.url);
      setImageUrls(urls);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  // =====================
  interface FormValues {
    name: string;
    remarks: string;
    contents: string;
    price: number;
    tags: string[];
    images: string[];
    travelproductAddress: {
      zipcode?: string; // 추가
      addressDetail?: string; // 추가
      lat?: number; // 추가
      lng?: number; // 추가
    };
  }
  // 수정하기 일때만 id값을 가져오도록 해야 하는데 if로 묶으면 잘 안됨 나중에 수정

  const { data } = useQuery(FECTH_TRAVEL_PRODUCT, {
    variables: { id: params.purchaseId },
  });

  // ----- 디폴트 벨류 하는 부분
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: props.isEdit ? data?.fetchTravelproduct.name : "",
      remarks: props.isEdit ? data?.fetchTravelproduct.remarks : "",
      contents: props.isEdit ? data?.fetchTravelproduct.contents : "",
      price: props.isEdit ? data?.fetchTravelproduct.price : "",
      tags: props.isEdit ? data?.fetchTravelproduct.tags?.join(", ") : "", // tags는 문자열로 병합
      images: [], // images 필드를 추가하여 초기 배열 값 설정
      //images는 여기에 직접 넣을 수 없어 useEffec에서 setValue 활용해야함.
      travelproductAddress: {
        zipcode: props.isEdit ? data?.fetchTravelproduct.zipcode : "",
        addressDetail: props.isEdit
          ? data?.fetchTravelproduct.addressDetail
          : "",
        lat: props.isEdit ? data?.fetchTravelproduct.lat : "", // 위도 추가
        lng: props.isEdit ? data?.fetchTravelproduct.lng : "", // 경도 추가
      },

      // 필요한 다른 필드도 여기에 추가하기.  -> 다른애들도 이런식으로 디폴트벨류 적용해주기
    },
  });

  useEffect(() => {
    if (props.isEdit && data?.fetchTravelproduct) {
      setValue("name", data.fetchTravelproduct.name);
      setValue("remarks", data.fetchTravelproduct.remarks);
      setValue("contents", data.fetchTravelproduct.contents);
      setValue("price", data.fetchTravelproduct.price);
      setValue("tags", data.fetchTravelproduct.tags?.join(", ")); // 태그 필드 처리

      // 이미지 URL들 업데이트
      setImageUrls(data.fetchTravelproduct.images || []);
      // 주소와 관련된 필드 설정
      setValue("travelproductAddress.zipcode", data.fetchTravelproduct.zipcode);
      setValue(
        "travelproductAddress.addressDetail",
        data.fetchTravelproduct.addressDetail
      );
      setValue("travelproductAddress.lat", data.fetchTravelproduct.lat);
      setValue("travelproductAddress.lng", data.fetchTravelproduct.lng);
    }
  }, [data, props.isEdit, setValue]);

  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);
  const [updateTravelproduct] = useMutation(UPDATE_TRAVEL_PRODUCT);

  // 주소--------------------------------------
  // 인풋 패스워드 검사해서 수정할지말지?
  const [isOpen, setIsOpen] = useState(false); // 주소모달 토글기능

  // 우편번호 조회하는 곳
  const onToggleModal = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsOpen((prev) => !prev);
  };

  // const handleComplete = (data) => {
  //   // console.log(data);
  //   console.log(data?.zonecode);
  //   setZipcode(data?.zonecode); // zonecode 업데이트
  //   console.log(data?.roadAddress);
  //   setAddress(data?.roadAddress); // roadAddress 업데이트
  //   onToggleModal(event);
  // };
  // 주소--------------------------------------
  // 상품 등록 처리 -----------------------------------
  const onClickSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const result = await createTravelproduct({
        variables: {
          name: data.name,
          remarks: data.remarks,
          contents: data.contents,
          price: parseInt(data.price, 10),
          tags: (data.tags || "").split(",").map((tag) => tag.trim()), // undefined일 때 빈 문자열로 대체
          images: imageUrls,
          // 너를 잊지않겠다
          zipcode: data.travelproductAddress.zipcode,
          addressDetail: data.travelproductAddress.addressDetail,
          lat: data.travelproductAddress.lat,
          lng: data.travelproductAddress.lng,
        },
      });

      console.log("상품 생성 성공:", result.data);
      router.push(`/purchase/${result.data.createTravelproduct._id}`);
    } catch (error) {
      console.error("상품 생성 실패:", error);
    }
  };

  // 상품 수정 처리 -----------------------------------
  const onClickUpdate = async (data) => {
    const myvariables = {
      travelproductId: params.purchaseId,
      name: data.name,
      remarks: data.remarks,
      contents: data.contents,
      price: data.price,
      tags: (data.tags || "").split(",").map((tag) => tag.trim()), // undefined일 때 빈 문자열로 대체
      images: imageUrls,
      zipcode: data.travelproductAddress.zipcode,
      addressDetail: data.travelproductAddress.addressDetail,
      lat: data.travelproductAddress.lat,
      lng: data.travelproductAddress.lng,
    };
    try {
      const result = await updateTravelproduct({
        variables: myvariables,
      });
      console.log(result);
      if (result.data) {
        alert("수정 성공");
        router.push(`/purchase/${result.data.updateTravelproduct._id}`); // 수정 후 상세 페이지로 이동
      }
    } catch (error) {
      console.error("상품 수정 실패:", error);
    }
  };

  // 제출 버튼 클릭 시 isEdit을 기준으로 수정모드로 갈지 등록모드로 갈지 나뉨
  const onSubmitHandler = (data) => {
    if (props.isEdit) {
      onClickUpdate(data); // 수정 모드일 때
    } else {
      onClickSubmit(data); // 등록 모드일 때
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <span className={styles.title}>
          숙박권 {props.isEdit ? "수정" : "판매"}하기
        </span>
        <div className={styles.inputArea}>
          <div className={styles.inputSection}>
            <span className={styles.inputText}>
              상품명<span className={styles.inputStar}>*</span>
            </span>
            <input
              className={styles.input}
              type="text"
              placeholder="상품명을 입력해 주세요."
              {...register("name")}
              // 디폴트벨류 47번줄 useForm 참조
            />
            <div style={{ color: "red" }}>{formState.errors.name?.message}</div>
          </div>

          <div className={styles.underLine}></div>

          <section className={styles.inputSection}>
            <span className={styles.inputText}>
              한줄 요약<span className={styles.inputStar}>*</span>
            </span>
            <input
              className={styles.input}
              type="text"
              placeholder="상품을 한줄로 요약해 주세요."
              {...register("remarks")}
              // 디폴트벨류 47번줄 useForm 참조
            />
            <div style={{ color: "red" }}>
              {formState.errors.remarks?.message}
            </div>
          </section>

          <div className={styles.underLine}></div>
        </div>

        <div className={styles.editerSection}>
          <span className={styles.inputText}>
            상품 설명<span className={styles.inputStar}>*</span>
          </span>
          <textarea // => 나중에 웹 에디터로 수정하기
            className={styles.textarea}
            placeholder="  내용을 입력해 주세요."
            {...register("contents")}
            // 디폴트벨류 47번줄 useForm 참조
          ></textarea>
          <div style={{ color: "red" }}>
            {formState.errors.contents?.message}
          </div>
          <div className={styles.underLine}></div>
        </div>

        <div className={styles.inputSection}>
          <span className={styles.inputText}>
            판매 가격<span className={styles.inputStar}>*</span>
          </span>
          <input
            className={styles.input}
            type="number"
            placeholder="판매 가격을 입력해 주세요.(원 단위)"
            {...register("price", { valueAsNumber: true })}
            // 디폴트벨류 47번줄 useForm 참조
          />
          <div style={{ color: "red" }}>{formState.errors.price?.message}</div>
        </div>
        <div className={styles.underLine}></div>

        <div className={styles.inputSection}>
          <span className={styles.inputText}>태그 입력</span>
          <input
            className={styles.input}
            type="text"
            placeholder="태그를 입력해 주세요."
            {...register("tags")}
            // 디폴트벨류 47번줄 useForm 참조
          />
        </div>

        <div className={styles.underLine}></div>

        {/* <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal> */}

        {/* 주소부분 추후에 진도 나가면 수정할 부분 */}
        <div className={styles.addressSection}>
          <div className={styles.addressSectionLeft}>
            <span className={styles.inputText}>
              주소<span className={styles.inputStar}>*</span>
            </span>
            <div className={styles.adressZipcode}>
              <input
                className={styles.adressZipcodeInput}
                type="text"
                placeholder="01234"
                {...register("travelproductAddress.zipcode")}
              />
              <button
                className={styles.adressZipcodeBtn}
                onClick={onToggleModal}
              >
                우편번호 검색
              </button>
            </div>

            <input
              className={styles.addressDetailInput}
              type="text"
              placeholder="상세주소를 입력해 주세요."
              {...register("travelproductAddress.addressDetail")}
            />

            <div className={styles.coordinateArea}>
              <div className={styles.coordinateSection}>
                <span className={styles.inputText}>위도(LAT)</span>
                <input
                  className={styles.coordinateInput}
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                  {...register("travelproductAddress.lat")}
                />
              </div>

              <div className={styles.coordinateSection}>
                <span className={styles.inputText}>경도(LNG)</span>
                <input
                  className={styles.coordinateInput}
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                  {...register("travelproductAddress.lng")}
                />
              </div>
            </div>
          </div>

          <div className={styles.addressSectionRight}>
            <span className={styles.inputText}>상세 위치</span>
            <div className={styles.addressMap}>
              <span>주소를 먼저 입력해 주세요.</span>
            </div>
          </div>
        </div>
        <div className={styles.underLine}></div>

        <div className={styles.imageArea}>
          <span className={styles.inputText}>사진 첨부</span>
          <input type="file" onChange={onChangeFile} multiple />

          <div className={styles.imageSection}>
            {imageUrls.map((url, index) => (
              <img
                className={styles.moreImgBox}
                key={index}
                src={`https://storage.googleapis.com/${url}`}
              />
            ))}
            {/* <div className={styles.moreImgBox}>추가되면 생성될 이미지 자리</div> */}

            <div className={styles.addImageBox}>
              <PlusOutlined className={styles.plusIcon} />
              <span className={styles.addText}>클릭해서 사진 업로드</span>
            </div>
          </div>
        </div>

        <div className={styles.buttonSection}>
          <button className={styles.cancelBtn}>취소</button>
          <button className={styles.submitBtn}>
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </main>
  );
}
