import { Button } from "antd";
import FieldWrapper from "../commons/fieldWrapper";
import InputField from "../commons/input";
import styles from "./styles.module.css";

export default function ProductsWrite(props) {
  return (
    <div className={styles.post_page_body}>
      <div className={styles.post_page}>
        <div className={styles.header}>숙박권 판매하기</div>
        <div className={styles.post_main}>
          <FieldWrapper label="상품명" isRequired={true}>
            <InputField name="writer" placeholder="상품명을 입력하세요." />
          </FieldWrapper>

          <hr />

          <FieldWrapper label="한줄요약" isRequired={true}>
            <InputField
              name="password"
              placeholder="상품을 한줄로 요약해 주세요."
            />
          </FieldWrapper>

          <hr />

          {/* 내용 입력 필드 */}
          <FieldWrapper label="상품 설명" isRequired={true}>
            <InputField
              as="textarea"
              name="contents"
              placeholder="내용을 입력해주세요."
            />
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

          {/* 유튜브 링크 입력 필드 */}
          <FieldWrapper label="판매 가격" isRequired={true}>
            <InputField placeholder="판매 가격을 입력해 주세요. (원 단위)" />
          </FieldWrapper>

          <hr />

          {/* 제목 입력 필드 */}
          <FieldWrapper label="태그 입력">
            <InputField name="tag" placeholder="태그를 입력하세요." />
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
            <Button>취소</Button>
            <Button>{props.isEdit ? "수정" : "등록"}하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
