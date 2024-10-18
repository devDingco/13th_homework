import FormField from "../FormField";
import styles from "../../boards/new/new.module.css";
import useBoardForm from "./hook";
import { IBoardFormProps } from "./types";

export default function BoardForm({ isEdit }: IBoardFormProps) {
  const { handleChange, handleSubmit, formData, isButtonEnabled, router } =
    useBoardForm({ isEdit });

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 {isEdit ? "수정" : "등록"}</nav>
      <form className={styles.게시물등록form} onSubmit={handleSubmit}>
        <div className={styles.작성자입력상자}>
          {/* 작성자 입력 필드 */}
          <FormField
            label="작성자"
            name="writer"
            onChange={handleChange}
            required
            defaultValue={formData.writer ?? ""}
            disabled={isEdit}
          />
          {/* 비밀번호 입력 필드 */}
          <FormField
            label="비밀번호"
            type="password"
            name="password"
            onChange={handleChange}
            required={!isEdit} // 수정 시 선택적으로 변경 가능
            disabled={isEdit}
          />
        </div>
        {/* 제목 입력 필드 */}
        <FormField
          label="제목"
          name="title"
          onChange={handleChange}
          required
          defaultValue={formData.title}
        />
        {/* 내용 입력 필드 */}
        <FormField
          label="내용"
          name="contents"
          onChange={handleChange}
          required
          defaultValue={formData.contents}
        />
        {/* 주소 입력 필드 */}
        <div className={styles.구분상자}>
          <span>주소</span>
          <div className={styles.우편번호검색상자}>
            <input
              type="text"
              placeholder="01234"
              className={styles.작은입력창크기}
            />
            <button type="button">우편번호 검색</button>
          </div>
          <input
            type="text"
            placeholder="주소를 입력해 주세요."
            className={styles.긴입력창크기}
          />
          <input
            type="text"
            placeholder="상세주소"
            className={styles.긴입력창크기}
          />
        </div>
        <hr />
        {/* 유튜브 링크 입력 필드 */}
        <FormField
          label="유튜브 링크"
          name="youtubeUrl"
          onChange={handleChange}
          defaultValue={formData.youtubeUrl}
        />
        {/* 사진 첨부 기능 */}
        {/* 취소, 등록/수정 버튼 */}
        <div className={styles.취소등록버튼상자}>
          <button type="button" onClick={() => router.back()}>
            취소
          </button>
          <button
            type="submit"
            className={isButtonEnabled ? styles.등록하기버튼 : styles.disabled}
            disabled={!isButtonEnabled}
          >
            {isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </div>
  );
}
