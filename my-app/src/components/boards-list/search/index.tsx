import Image from "next/image";
import styles from "./styles.module.css";
import useSearch from "./hooks";

export default function Search(props) {
  const { onChangeSearch, onClickSearch } = useSearch(props);
  return (
    <div className={styles.main}>
      <div className={styles.title}>트립토크게시판</div>
      <div className={styles.search_box}>
        <div className={styles.search}>
          <div className={styles.search_bar}>
            <Image
              src="/img/search.svg"
              alt="searchImg"
              width={24}
              height={24}
            />
            <input
              type="text"
              placeholder="제목을 검색해 주세요."
              onChange={onChangeSearch}
            />
          </div>
          <div className={styles.search_button}>검색</div>
        </div>
        <div className={styles.register_button} onClick={onClickSearch}>
          <Image
            src="/img/left_icon.svg"
            alt="buttonImg"
            width={24}
            height={24}
          />
          <div className={styles.register_text}>트립토크 등록</div>
        </div>
      </div>
    </div>
  );
}
