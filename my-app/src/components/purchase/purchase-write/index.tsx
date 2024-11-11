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
  FETCH_TRAVEL_PRODUCT,
  UPDATE_TRAVEL_PRODUCT,
} from "./\bqueries";
import { useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

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
  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: {
      purchaseId: params.purchaseId,
    },
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);
  const [updateTravelproduct] = useMutation(UPDATE_TRAVEL_PRODUCT);

  // 상품 등록 처리 -----------------------------------
  const onClickSubmit = async (data) => {
    try {
      const result = await createTravelproduct({
        variables: {
          name: data.name,
          remarks: data.remarks,
          contents: data.contents,
          price: parseInt(data.price, 10),
          tags: (data.tags || "").split(",").map((tag) => tag.trim()), // undefined일 때 빈 문자열로 대체
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
              defaultValue={props.isEdit ? data?.fetchTravelproduct.name : ""}
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
              defaultValue={props.isEdit ? data?.remarks : ""}
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
            defaultValue={props.isEdit ? data?.contents : ""}
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
            defaultValue={props.isEdit ? data?.price : ""}
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
            defaultValue={props.isEdit ? data?.tags?.join(", ") : ""}
          />
        </div>

        <div className={styles.underLine}></div>

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
              />
              <button className={styles.adressZipcodeBtn}>우편번호 검색</button>
            </div>

            <input
              className={styles.addressDetailInput}
              type="text"
              placeholder="상세주소를 입력해 주세요."
            />

            <div className={styles.coordinateArea}>
              <div className={styles.coordinateSection}>
                <span className={styles.inputText}>위도(LAT)</span>
                <input
                  className={styles.coordinateInput}
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                />
              </div>

              <div className={styles.coordinateSection}>
                <span className={styles.inputText}>경도(LNG)</span>
                <input
                  className={styles.coordinateInput}
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
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
