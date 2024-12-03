import {
  CloseCircleOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";
export default function SolplaceLogsSubmit() {
  return (
    <main className={styles.main}>
      {/* 글로벌헤더가 붙어있음 */}

      <section className={styles.section}>
        <div className={styles.imgSection}>
          <div className={styles.imgUploadBox}>
            <PlusOutlined />
            <span>사진 등록</span>
          </div>
          <div className={styles.choiceImg}>
            <CloseCircleOutlined />
          </div>
          <div className={styles.choiceImg}>
            <CloseCircleOutlined />
          </div>
          <div className={styles.choiceImg}>
            <CloseCircleOutlined />
          </div>
        </div>

        <div className={styles.placesection}>
          <span className={styles.placeTitle}>
            플레이스 이름<span className={styles.redStar}>*</span>
          </span>
          <input
            className={styles.placeInput}
            type="text"
            placeholder="플레이스 이름을 입력해주세요. (1자 이상)"
          />
        </div>

        <div className={styles.placesection}>
          <span className={styles.placeTitle}>플레이스 주소</span>
          <button className={styles.placeAdressBtn}>
            <span>플레이스 주소 입력</span>
            <RightOutlined />
          </button>
        </div>

        <div className={styles.placesection}>
          <span className={styles.placeTitle}>
            플레이스 내용<span className={styles.redStar}>*</span>
          </span>
          <textarea
            className={styles.placeTextarea}
            placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
          ></textarea>
        </div>

        <button className={styles.submitBtn}>로그 등록</button>
      </section>
    </main>
  );
}
