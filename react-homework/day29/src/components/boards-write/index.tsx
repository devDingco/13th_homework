import styles from "../styles.module.css";
import UploadFile from "@/components/upload";
import Button from "../button";
import { useBoardsWrite } from "./hook";
import { BoardsWriteProps } from "./types";
import FieldWrapper from "../fieldWrapper";
import InputField from "../input";
import ErrorMsg from "../error";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardsWrite(props: BoardsWriteProps) {
  const {
    onChangeInput,
    onClickRegister,
    onClickEdit,
    isDisabled,
    errors,
    onClickEditCancel,
    onClickRegisterCancel,

    isPasswordModalOpen,
    onTogglePasswordModal,
    onChangePassword,
    handleOk,

    isZipCodeModalOpen,
    onToggleZipCodeModal,
    onClickZipCodeSearch,
    handleComplete,
    addressInfo,
    addressDetail,
    onChangeAddressDetail,

    youtubeUrl,
    onChangeYoutubeUrl,
  } = useBoardsWrite();

  return (
    <div className={styles.post_page_body}>
      <div className={styles.post_page}>
        <div className={styles.header}>
          게시물 {props.isEdit ? "수정" : "등록"}
        </div>
        <div className={styles.post_main}>
          <div className={styles.writer_box}>
            {/* 작성자 입력 필드 */}
            <FieldWrapper label="작성자" isRequired={true}>
              <InputField
                name="writer"
                onChange={onChangeInput}
                placeholder="작성자 명을 입력하세요"
                defaultValue={props?.data?.fetchBoard?.writer ?? ""}
                isDisabled={props.isEdit}
              />
              {errors.writer && <ErrorMsg errorMessage={errors.writer} />}
            </FieldWrapper>

            {/* 비밀번호 입력 필드 */}
            <FieldWrapper label="비밀번호" isRequired={true}>
              <InputField
                name="password"
                onChange={onChangeInput}
                placeholder="비밀번호를 입력하세요"
                defaultValue={props.isEdit ? "******" : ""}
                isDisabled={props.isEdit}
              />
              {errors.password && <ErrorMsg errorMessage={errors.password} />}
            </FieldWrapper>
          </div>

          <hr />

          {/* 제목 입력 필드 */}
          <FieldWrapper label="제목" isRequired={true}>
            <InputField
              name="title"
              onChange={onChangeInput}
              placeholder={"제목을 입력하세요"}
              defaultValue={props?.data?.fetchBoard?.title ?? ""}
            />
            {errors.title && <ErrorMsg errorMessage={errors.title} />}
          </FieldWrapper>

          <hr />

          {/* 내용 입력 필드 */}
          <FieldWrapper label="내용" isRequired={true}>
            <InputField
              as="textarea"
              name="contents"
              onChange={onChangeInput}
              placeholder="내용을 입력해 주세요."
              defaultValue={props?.data?.fetchBoard?.contents ?? ""}
            />
            {errors.contents && <ErrorMsg errorMessage={errors.contents} />}
          </FieldWrapper>

          {/* 주소 입력 필드 */}
          <FieldWrapper label="주소">
            <div className={styles.search_group_zip_code}>
              <input
                type="text"
                value={addressInfo.zipcode}
                className={styles.input_box_zip_code}
                placeholder="01234"
                readOnly
              />
              <button
                className={styles.btn_search_zip_code}
                onClick={onClickZipCodeSearch}
              >
                우편번호 검색
              </button>
            </div>
            {/* 우편번호 검색 모달 */}
            {isZipCodeModalOpen && (
              <Modal open={true} onCancel={onToggleZipCodeModal} footer={null}>
                <DaumPostcodeEmbed onComplete={handleComplete} />
              </Modal>
            )}
            <input
              type="text"
              value={addressInfo.address}
              className={styles.input_box}
              placeholder="주소를 입력해 주세요."
              readOnly
            />
            <input
              type="text"
              value={addressDetail}
              onChange={onChangeAddressDetail}
              className={styles.input_box}
              placeholder="상세주소"
            />
          </FieldWrapper>

          <hr />

          {/* 유튜브 링크 입력 필드 */}
          <FieldWrapper label="유튜브 링크">
            <InputField
              placeholder="링크를 입력해 주세요."
              value={youtubeUrl}
              onChange={onChangeYoutubeUrl}
            />
          </FieldWrapper>

          <hr />

          <FieldWrapper label="사진 첨부">
            <div className={styles.upload_group}>
              <UploadFile />
              <UploadFile />
              <UploadFile />
            </div>
          </FieldWrapper>

          <div className={styles.btn_group}>
            <Button
              onClick={props.isEdit ? onClickEditCancel : onClickRegisterCancel}
              variant="cancel"
            >
              취소
            </Button>
            <Button
              onClick={props.isEdit ? onClickEdit : onClickRegister}
              // 수정하기일 땐 blue_active, 등록하기일 땐 blue_active or disabled
              variant={
                props.isEdit || (!props.isEdit && !isDisabled)
                  ? "blue_active"
                  : "disabled"
              }
              disabled={!props.isEdit && isDisabled}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </Button>
            {isPasswordModalOpen && (
              <Modal
                open={true}
                onOk={handleOk}
                onCancel={onTogglePasswordModal}
              >
                <p> 글을 작성할 때 입력하셨던 비밀번호를 입력해 주세요.</p>
                <input
                  className={styles.modal_password_input}
                  onChange={onChangePassword}
                  type="password"
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
