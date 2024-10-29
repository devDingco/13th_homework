import styles from "./styles.module.css";
import useBoardForm from "./hook";
import { IBoardFormProps } from "./types";
import Input from "../input";
import Textarea from "../textarea";
import FormField from "../FormField";
import { Button } from "../ui/button";
import ImageUpload from "../ImageUpload";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function BoardForm({ isEdit }: IBoardFormProps) {
  const {
    handleChange,
    handleSubmit,
    formData,
    isButtonEnabled,
    router,
    onClickImage,
    onChangeFile,
    fileRefs,
    isOpen,
    handleComplete,
    onToggleModal,
  } = useBoardForm({ isEdit });

  return (
    <div className="flex justify-center pt-10">
      <div className={styles.게시물등록전체상자}>
        <nav>게시물 {isEdit ? "수정" : "등록"}</nav>
        <form className={styles.게시물등록form} onSubmit={handleSubmit}>
          <div className={styles.작성자입력상자}>
            {/* 작성자 입력 필드 */}
            <FormField label="작성자" required>
              <Input
                type="text"
                name="writer"
                onChange={handleChange}
                placeholder="작성자 명을 입력해 주세요."
                className={styles.중간입력창크기}
                defaultValue={formData.writer ?? ""}
                required
              />
            </FormField>
            {/* 비밀번호 입력 필드 */}
            <FormField label="비밀번호" required>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="비밀번호을 입력해 주세요."
                className={styles.중간입력창크기}
                required={!isEdit} //수정할때
              />
            </FormField>
          </div>
          <hr />
          {/* MARK: 제목 입력 필드 */}
          <FormField label="제목" required>
            <Input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="제목을 입력해 주세요."
              defaultValue={formData.title}
            />
          </FormField>
          <hr />
          {/* MARK: 내용 입력 필드 */}
          <FormField label="내용" required>
            <Textarea
              name="contents"
              onChange={handleChange}
              required
              defaultValue={formData.contents}
              placeholder="내용을 입력해 주세요."
              className={styles.내용입력창크기}
            />
          </FormField>
          <hr />
          {/* MARK: 주소 입력 필드 */}
          <FormField label="주소">
            <div className={styles.우편번호검색상자}>
              <Input
                name="zipcode"
                placeholder="01234"
                value={formData.boardAddress?.zipcode || ""}
                onChange={handleChange}
              />
              <button type="button" onClick={onToggleModal}>
                우편번호 검색
              </button>
              {isOpen && (
                <Modal
                  title="우편번호"
                  open={true}
                  onOk={onToggleModal}
                  onCancel={onToggleModal}
                  okText="확인"
                  centered
                  okButtonProps={{ style: { display: "none" } }}
                  cancelButtonProps={{ style: { display: "none" } }}
                >
                  <DaumPostcodeEmbed onComplete={handleComplete} />
                </Modal>
              )}
            </div>
            <Input
              name="address"
              placeholder="주소를 입력해 주세요."
              value={formData.boardAddress?.address || ""}
              onChange={handleChange}
            />
            <Input
              name="addressDetail"
              placeholder="상세주소"
              value={formData.boardAddress?.addressDetail || ""}
              onChange={handleChange}
            />
          </FormField>

          <hr />
          {/* MARK: 유튜브 링크 입력 필드 */}
          <FormField label="유튜브 링크">
            <Input
              name="youtubeUrl"
              onChange={handleChange}
              defaultValue={formData.youtubeUrl}
              placeholder="유튜브 링크를 입력해 주세요."
            />
          </FormField>
          <hr />
          {/* MARK: 사진 첨부 기능 */}
          <div className="flex gap-4">
            {[0, 1, 2].map((index) => (
              <ImageUpload
                key={index}
                onClickImage={() => onClickImage(index)}
                onChangeFile={(event) => onChangeFile(event, index)}
                fileRef={fileRefs[index]}
                url={formData.images?.[index]}
              />
            ))}
          </div>
          {/* MARK: 취소, 등록/수정 버튼 */}
          <div className={styles.취소등록버튼상자}>
            <Button onClick={() => router.back()}>취소</Button>
            <Button
              type="submit"
              disabled={!isButtonEnabled}
              className={
                isButtonEnabled ? styles.등록하기버튼 : styles.disabled
              }
            >
              {isEdit ? "수정" : "등록"}하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
