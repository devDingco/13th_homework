"use client";

import React from "react";
import styles from "@/components/product-wrtie/styles.module.css";

import DaumPostcodeEmbed from "react-daum-postcode";
import Image from "next/image";
import add from "/public/icon/add.png";
import deleteIcon from "/public/icon/delete.svg";
import { useProductRegist } from "./hook";
import { Modal } from "antd";
import { IProductRegistProps } from "./types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ProductRegist(props: IProductRegistProps) {
  const {
    onChangeInputs,
    registButton,
    onClickUpdate,
    cancelButton,
    onClickSearchAddress,
    postcodeComplete,
    isActive,
    isOpen,
    zipcode,
    basicAddress,
    inputs,
    onClickImage,
    onChangeFile,
    imageUrl,
    fileRefArray,
    isHover,
    onMouseHover,
    onMouseNoneHover,
    onClickRemovePrevImg,
    onChangeLAT,
    onChangeLNG,
  } = useProductRegist();

  return (
    <div className={styles.layout}>
      <div className={styles.postTitle}>숙박권 판매하기</div>

      <div className={styles.group}>
        <div className={styles.category}>
          상품명<span className={styles.asterisk}>*</span>
        </div>
        <input
          id="productName"
          className={styles.productName}
          type="text"
          placeholder="상품명을 입력해 주세요."
          onChange={onChangeInputs}
          defaultValue={props.data?.fetchTravelproduct.name ?? ""}
        />
      </div>

      <div className={styles.group}>
        <div className={styles.category}>
          한줄 요약<span className={styles.asterisk}>*</span>
        </div>
        <input
          id="remarks"
          className={styles.remarks}
          type="text"
          placeholder="상품을 한줄로 요약해 주세요."
          onChange={onChangeInputs}
          //   disabled={isEdit ? true : false}
        />
      </div>

      <div className={styles.part}>
        <div className={styles.group}>
          <div className={styles.category}>
            상품 설명<span className={styles.asterisk}>*</span>
          </div>
          <ReactQuill
            theme="snow"
            className={styles.typeContents}
            value={inputs.contents}
            // onChange={onChangeInputs}
            placeholder="내용을 입력해 주세요."
          />
        </div>
      </div>

      <div className={styles.content_part}>
        <div className={styles.group}>
          <div className={styles.category}>
            판매 가격<span className={styles.asterisk}>*</span>
          </div>
          <input
            id="price"
            className={styles.price}
            type="text"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
            onChange={onChangeInputs}
            defaultValue={props.data?.fetchTravelproduct.price as number}
          />
        </div>
      </div>

      <div className={styles.content_part}>
        <div className={styles.group}>
          <div className={styles.category}>태그 입력</div>
          <input
            id="tags"
            className={styles.tags}
            type="text"
            placeholder="태그를 입력해 주세요."
            onChange={onChangeInputs}
            defaultValue={props.data?.fetchTravelproduct.tags?.[0]}
          />
        </div>
      </div>

      <div className={styles.address}>
        <div className={styles.group}>
          <div className={styles.category}>
            주소<span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.section}>
            <input
              id={styles.addressNum}
              type="text"
              placeholder="01234"
              defaultValue={zipcode}
              readOnly
            />
            <button
              className={styles.searchAddress}
              type="button"
              onClick={onClickSearchAddress}
            >
              우편번호 검색
            </button>
            {isOpen && (
              <Modal
                open={true}
                onOk={onClickSearchAddress}
                onCancel={onClickSearchAddress}
              >
                <DaumPostcodeEmbed onComplete={postcodeComplete} />
              </Modal>
            )}
          </div>
          <input
            id={styles.addressType}
            type="text"
            placeholder="상세 주소를 입력해주세요."
            defaultValue={basicAddress}
            readOnly
          />
          <div className={styles.latandlng}>
            <div className={styles.latContainer}>
              위도(LAT)
              <input
                id={styles.lat}
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                onChange={onChangeLAT}
              />
            </div>
            <div className={styles.lngContainer}>
              경도(LNG)
              <input
                id={styles.lng}
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                onChange={onChangeLNG}
              />
            </div>
          </div>
        </div>
        <div className={styles.map}>
          상세 위치
          <div className={styles.mapContainer}>주소를 먼저 입력해 주세요.</div>
        </div>
      </div>

      <div className={styles.upload}>
        <div className={styles.group}>
          사진 첨부
          <div className={styles.photoGroup}>
            {Array(3)
              .fill("")
              .map((value, index) => {
                return (
                  <>
                    <div
                      className={styles.photobox}
                      onClick={() => onClickImage(index)}
                      key={index}
                      onMouseOver={() => onMouseHover(index)} // index 전달
                      onMouseOut={() => onMouseNoneHover(index)} // index 전달
                    >
                      {imageUrl[index] === "" ? (
                        <>
                          <Image src={add} alt="plus icon" />
                          <p>클릭해서 사진 업로드</p>
                        </>
                      ) : (
                        <>
                          <Image
                            src={deleteIcon}
                            alt="delete icon"
                            className={isHover[index] ? styles.deleteIcon : ""}
                            style={
                              isHover[index]
                                ? { display: "block" }
                                : { display: "none" }
                            }
                            onClick={(event) =>
                              onClickRemovePrevImg(event, index)
                            }
                          />
                          <Image
                            src={`https://storage.googleapis.com/${imageUrl[index]}`}
                            alt="preview"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={styles.prevImage}
                          />
                        </>
                      )}
                    </div>
                    <input
                      id={String(index)}
                      type="file"
                      onChange={onChangeFile}
                      style={{ display: "none" }}
                      ref={fileRefArray[index]}
                      accept="image/jpeg,image/png"
                      // 지정해준 확장자를 제외하고 다른 파일은 선택 자체가 안 되는 명령어
                      // 1. jpg/jpeg 모두 가능, 2. 띄어쓰기 없이 ','로 구분
                    />
                  </>
                );
              })}
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.cancel} type="button" onClick={cancelButton}>
          취소
        </button>
        <button
          className={styles.regist}
          type="button"
          onClick={props.isEdit === true ? onClickUpdate : registButton}
          style={{
            backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7",
          }}
        >
          {props.isEdit === true ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
}
