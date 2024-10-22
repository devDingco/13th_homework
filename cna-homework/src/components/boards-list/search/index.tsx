import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export default function Search({ refetch, onChangeSearch, search }: any) {


  const onClickSearch = () => {
    refetch({
      search: search, // 입력한 검색어를 refetch에 전달
      page: 1,
    });
    console.log("검색어:", search); // 검색어 로그 출력
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchArea}>
        <div className={styles.searchBarArea}>
          <input type="text" placeholder="제목을 검색해 주세요." onChange={onChangeSearch} />
          <Image className={styles.searchBarIcon} src="/images/search.png" alt="searchicon" width={17} height={17} />
          <button onClick={onClickSearch}>검색</button>
        </div>
        <Link href={"/boards/new"}>
          <button className={styles.writeBtn}>
            <Image src="/images/write.png" width={19} height={19} alt="writeicon" />
            <p>트립토크 등록</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
