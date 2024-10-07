"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation ($mydelete: ID!) {
    deleteBoard(boardId: $mydelete)
  }
`;

export default function BoardsPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  console.log(data);

  const handlerOnclickList = (id) => {
    router.push(`/boards/${id}`);
    // router.push(`/boards/${data?.fetchBoards._id}`);

    /**게시글을 클릭했을 때 _id가 undefined로 넘어가는 이유는
     * handleOnclickList 함수에서 data?.fetchBoards._id를 사용하고 있기 때문이야.
     * 이 경우 data?.fetchBoards는 배열이므로, 배열 자체에는 _id 속성이 없어.
     * 즉, 배열 안에 있는 각각의 게시글(el)이 _id 값을 가지고 있어.*/
  };

  const handlerDeleteList = (e, id) => {
    e.stopPropagation(); // 이벤트버블링 막기
    deleteBoard({
      variables: {
        mydelete: id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
    alert("삭제함");
  };

  return (
    // <div className={styles.cssContainer}> // globals.css -> body에 전체 css를 줌 헷갈리지 말것
    <div className={styles.css_main}>
      <section className={styles.css_header}>
        <span className={styles.css_headerNumber}>번호</span>
        <span className={styles.css_headerTitle}>제목</span>
        <span className={styles.css_headerWriter}>작성자</span>
        <span className={styles.css_headerDate}>날짜</span>
      </section>
      <section className={styles.css_boardDiv}>
        {data?.fetchBoards.map((el, index) => (
          <div
            key={el._id}
            className={styles.css_boardList}
            onClick={() => handlerOnclickList(el._id)}
          >
            <div className={styles.css_index}>{index}</div>
            <div className={styles.css_title}>{el.title}</div>
            <div className={styles.css_writer}>{el.writer}</div>
            <div className={styles.css_date}>
              {el.createdAt.substring(0, 10)}
            </div>
            <Image
              src="/img/delete.png"
              alt="deleteBtn"
              width={24}
              height={24}
              onClick={(e) => handlerDeleteList(e, el._id)}
            ></Image>
          </div>
        ))}
      </section>
    </div>
    // </div>
  );
}
