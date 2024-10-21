import styles from "./styles.module.css";
import UploadFile from "@/components/commons/upload";
import Button from "../commons/button";
import { useBoardsWrite } from "./hook";
import { BoardsWriteProps } from "./types";
import FieldWrapper from "../commons/fieldWrapper";
import InputField from "../commons/input";
import ErrorMsg from "../commons/error";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import AddressInputField from "./addressInput";

export default function BoardsWrite(props: BoardsWriteProps) {
  const {
    addressInfo,
    errors,
    allInputFilled,
    isPasswordModalOpen,
    isZipCodeModalOpen,
    onChangeInput,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onChangePassword,
    onClickRegister,
    onClickEditCancel,
    onClickRegisterCancel,
    onTogglePasswordModal,
    onToggleZipCodeModal,
    handleOkPasswordModal,
    handleCompleteZipcodeModal,
  } = useBoardsWrite(props.data);

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
              <AddressInputField value={addressInfo.zipcode} />
              <Button variant="white" onClick={onToggleZipCodeModal}>
                우편번호 검색
              </Button>
            </div>
            {/* 우편번호 검색 모달 */}
            {isZipCodeModalOpen && (
              <Modal open={true} onCancel={onToggleZipCodeModal} footer={null}>
                <DaumPostcodeEmbed onComplete={handleCompleteZipcodeModal} />
              </Modal>
            )}
            <InputField
              type="text"
              value={addressInfo.address}
              placeholder="주소를 입력해 주세요."
              isReadOnly={true}
            />
            <InputField
              type="text"
              onChange={onChangeAddressDetail}
              placeholder="상세주소"
              defaultValue={
                props.data?.fetchBoard.boardAddress?.addressDetail ?? ""
              }
            />
          </FieldWrapper>

          <hr />

          {/* 유튜브 링크 입력 필드 */}
          <FieldWrapper label="유튜브 링크">
            <InputField
              placeholder="링크를 입력해 주세요."
              onChange={onChangeYoutubeUrl}
              defaultValue={props.data?.fetchBoard?.youtubeUrl ?? ""}
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
              variant="white"
            >
              취소
            </Button>
            <Button
              onClick={props.isEdit ? onTogglePasswordModal : onClickRegister}
              // 수정하기일 땐 blue, 등록하기일 땐 blue or disabled
              variant={
                props.isEdit || (!props.isEdit && allInputFilled)
                  ? "blue"
                  : "disabled"
              }
              disabled={!props.isEdit && !allInputFilled}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </Button>
            {isPasswordModalOpen && (
              <Modal
                open={true}
                onOk={handleOkPasswordModal}
                onCancel={onTogglePasswordModal}
              >
                <div className={styles.password_modal_title}>
                  글을 작성할 때 입력하셨던 비밀번호를 입력해 주세요.
                </div>
                <input
                  className={styles.custom_input}
                  placeholder="비밀번호 입력"
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
