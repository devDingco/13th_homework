import styles from "./styles.module.css";

export default function PerchaseWrite() {
  return (
    <main className={styles.main}>
      <span className={styles.title}>숙박권 판매하기</span>
      <div className={styles.inputArea}>
        <div className={styles.inputSection}>
          <span className={styles.inputText}>
            상품명<span className={styles.inputStar}>*</span>
          </span>
          <input
            className={styles.input}
            type="text"
            placeholder="상품명을 입력해 주세요."
          />
        </div>
        <div className={styles.underLine}></div>

        <div className={styles.inputSection}>
          <span className={styles.inputText}>
            한줄 요약<span className={styles.inputStar}>*</span>
          </span>
          <input
            className={styles.input}
            type="text"
            placeholder="상품을 한줄로 요약해 주세요."
          />
        </div>
        <div className={styles.underLine}></div>
      </div>

      <div className={styles.editerSection}>
        <span className={styles.inputText}>
          상품 설명<span className={styles.inputStar}>*</span>
        </span>
        <textarea
          className={styles.textarea}
          placeholder="내용을 입력해 주세요."
        ></textarea>
        {/* 임시로 textarea쓰고 나중에 웹 에디터 배울때 그때 교체 예정 */}
        <div className={styles.underLine}></div>
      </div>

      <div className={styles.inputSection}>
        <span className={styles.inputText}>
          태그 입력<span className={styles.inputStar}>*</span>
        </span>
        <input
          className={styles.input}
          type="text"
          placeholder="태그를 입력해 주세요."
        />
      </div>
      <div className={styles.underLine}></div>

      {/* 주소부분 추후에 진도 나가면 수정할 부분 좀 있음 우선 이렇게 퍼블리싱만 해둠. */}
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

      {/* 나머지는 내일 마저 하기 */}
    </main>
  );
}
