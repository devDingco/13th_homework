"use client";

import FieldWrapper from "../commons/fieldWrapper";
import styles from "./styles.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSoftMFull } from "@/commons/ui/input";
import { TextareaSoftMFull } from "@/commons/ui/textarea";
import { schema } from "./schema";
import { useMutation } from "@apollo/client";
import { CREATE_TRAVEL_PRODUCT } from "./queries";
import ButtonBase from "@/commons/ui/button";

export default function ProductsWrite(props) {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);
  const onClickSubmit = async (data) => {
    console.log(data);
    try {
      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
          },
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.post_page_body}>
      <div className={styles.post_page}>
        <div className={styles.header}>숙박권 판매하기</div>
        <FormProvider {...methods}>
          <form
            className={styles.post_main}
            onSubmit={methods.handleSubmit(onClickSubmit)}
          >
            <FieldWrapper label="상품명" isRequired={true}>
              <InputSoftMFull
                type="text"
                keyname="name"
                placeholder="상품명을 입력하세요."
              />
              {/* {methods.formState.errors.name?.message} */}
            </FieldWrapper>

            <hr />

            <FieldWrapper label="한줄요약" isRequired={true}>
              <InputSoftMFull
                type="text"
                keyname="remarks"
                placeholder="상품을 한줄로 요약해 주세요."
              />
              {/* {methods.formState.errors.remarks?.message} */}
            </FieldWrapper>

            <hr />

            {/* 내용 입력 필드 */}
            <FieldWrapper label="상품 설명" isRequired={true}>
              <TextareaSoftMFull
                keyname="contents"
                placeholder="내용을 입력해주세요."
              />
              {/* {methods.formState.errors.contents?.message} */}
            </FieldWrapper>

            {/* 주소 입력 필드 */}
            {/* <FieldWrapper label="주소">
            <div className={styles.search_group_zip_code}>
              <AddressInputField />
              <Button variant="white">
                우편번호 검색
              </Button>
            </div> */}
            {/* 우편번호 검색 모달 */}
            {/* {isZipCodeModalOpen && (
              <Modal open={true} onCancel={onToggleZipCodeModal} footer={null}>
                <DaumPostcodeEmbed onComplete={handleCompleteZipcodeModal} />
              </Modal>
            )}
            <InputField
              type="text"
              placeholder="상세주소"
            />
          </FieldWrapper> */}

            <hr />

            <FieldWrapper label="판매 가격" isRequired={true}>
              <InputSoftMFull
                type="number"
                keyname="price"
                placeholder="판매 가격을 입력해 주세요. (원 단위)"
              />
              {methods.formState.errors.price?.message}
            </FieldWrapper>

            <hr />

            {/* 제목 입력 필드 */}
            <FieldWrapper label="태그 입력">
              <InputSoftMFull keyname="tag" placeholder="태그를 입력하세요." />
            </FieldWrapper>

            {/* <FieldWrapper label="사진 첨부">
            <div className={styles.upload_group}>
              {imageUrl.map((_, index) => (
                <ImageButton
                  key={index}
                  index={index}
                  imageUrl={imageUrl}
                  onClickDelete={onClickDelete}
                  onChangeFile={onChangeFile}
                />
              ))}
            </div>
          </FieldWrapper> */}

            <div className={styles.btn_group}>
              <button type="button">취소</button>
              <ButtonBase formState={methods.formState}>
                {props.isEdit ? "수정" : "등록"}하기
              </ButtonBase>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
