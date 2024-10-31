import { useState } from "react";
import styles from "./styles.module.css";
import { pages } from "next/dist/build/templates/app-page";

export default function BoardsListSearch(props) {
  const [search, setSearch] = useState();

  const onChangeSearch = (event) => {
    setSearch(event.currentTarget.value);
    props.setKeyword(event.currentTarget.value);
  };

  const onClickSearchBtn = () => {
    props.refetchBoardCount({ search: search });
    props.refetch({ search: search });
    console.log("눌렀을때 리패치 : ", props.data);
  };
  //event.currentTarget.value 를 바로 search로 날리면 검색안눌러도 나옴

  return (
    <section className={styles.css_wrapper}>
      <div className={styles.css_spanDiv}>
        <span className={styles.css_span}>트립토크 게시판</span>
      </div>
      <div className={styles.css_searchContainer}>
        <div className={styles.css_choiceContainer}>
          <input type="date" className={styles.css_date}></input>
          <input
            placeholder="제목을 검색해 주세요"
            className={styles.css_searchBar}
            onChange={onChangeSearch}
          ></input>
          <button
            className={styles.css_searchBarBtn}
            onClick={onClickSearchBtn}
          >
            검색
          </button>
        </div>
        <button className={styles.css_submitBtn}>트립토크 등록</button>
      </div>
    </section>
  );
}
