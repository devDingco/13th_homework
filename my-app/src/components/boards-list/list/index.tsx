"use client";

import Image from "next/image";
import useBoard from "./hook";
import { IBoardProps } from "./types";

export default function Board(props: IBoardProps) {
  // ------------------------------------------ 페이지네이션

  // const [startPage, setStartPage] = useState(1);
  // //  데이타 중복되어서 이름 지어줌
  // const { data: dataBoard, refetch } = useQuery(FETCH_BOARDS);

  // const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  // const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 5) / 5);
  // console.log("마지막페이지:", lastPage);
  // console.log(dataBoard);

  // const onClickPage = (event) => {
  //   refetch({ mypage: Number(event.currentTarget.id) });
  // };

  // const onClickPrevPage = () => {
  //   if (startPage === 1) return;

  //   setStartPage(startPage - 5);
  //   refetch({ mypage: startPage - 5 });
  // };

  // const onClickNextPage = () => {
  //   if (startPage + 5 <= lastPage) {
  //     setStartPage(startPage + 5);
  //     refetch({ mypage: startPage + 5 });
  //   }
  // };

  // ------------------------------------------ 페이지네이션
  const { keyword } = props; // 프롭스로 받고 나서 구조분해 할당하는 방식

  const { goingBoardDetail, onClickDelete, data } = useBoard();

  return (
    <>
      <div className={props.styles.boardContainer}>
        <div className={props.styles.boardTop}>
          <div className={props.styles.boardTopLeft}>
            <div>번호</div>
            <div>제목</div>
          </div>
          <div className={props.styles.boardTopRight}>
            <div className={props.styles.Author}>작성자</div>
            <div>날짜</div>
          </div>
        </div>
        {/* 여기도 원래 data인데 임시로  dataBoard로 넣어줌 나중에 분리할때 이름 data로 수정해줘야함.*/}
        {/* 현재 상태가 data를 수정해서 삭제후 리패치 적용이 안됨. 페이지네이션 먼저 다 하고 분기처리를 하던 통합을 하던 해서 함께 리패치 되도록 해야할 듯함. */}
        {props.data?.fetchBoards.map((el, index) => (
          <div key={el._id}>
            <div
              className={props.styles.boardContents}
              onClick={(e) => {
                // 이벤트가 전파되는 것을 방지
                e.stopPropagation();
                goingBoardDetail(el._id);
              }}
            >
              <div className={props.styles.boardSide}>
                <div className={props.styles.boardNum}>{index + 1}</div>
                <div className={props.styles.boardTitle}>
                  {el.title
                    .replaceAll(keyword, `#$${keyword}#$`)
                    .split("#$")
                    .map((el, index) => (
                      <span
                        key={`${el}_${index}`}
                        style={{ color: el === keyword ? "#59ce42" : "black" }}
                      >
                        {el}
                      </span>
                    ))}
                  {/* 이곳을 바꾸면되는데  keyword를 어떻게 가져올지가 의문*/}
                </div>
              </div>
              <div className={props.styles.boardSide}>
                <div className={props.styles.boardName}>{el.writer}</div>
                <div className={props.styles.boardDate}>
                  {/* {console.log("el.createdAt:", el.createdAt)} */}
                  {new Date(el.createdAt).toLocaleDateString()}
                  {/* 
                  el.createdAt: "2023-10-08T12:34:56.789Z"으로 전달받음
                  new Date(el.createdAt): JS에 있는 Date객체로 변환했음
                  .toLocaleDateString(): Date 객체의 메서드라서 2024.11.11으로 변환해줌.
                  */}
                </div>
              </div>
              <span onClick={onClickDelete}>
                <Image
                  src="/images/delete.png"
                  alt="삭제하기"
                  className={props.styles.deleteIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                  id={el._id}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* ------------------------------------------ 페이지네이션 */}
      {/* <div className={props.styles.임시페이지내이션}>
        <span onClick={onClickPrevPage}>이전페이지</span>

        {new Array(5).fill("").map((_, index) => (
          <span
            key={index + startPage}
            id={String(index + startPage)}
            onClick={onClickPage}
          >
            {index + startPage}
          </span>
        ))}

        <span onClick={onClickNextPage}>다음페이지</span>
      </div> */}

      {/* ------------------------------------------ 페이지네이션 */}
    </>
  );
}
