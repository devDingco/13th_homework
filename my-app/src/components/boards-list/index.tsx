import Image from "next/image";
import useBoard from "./hook";
import { IBoardProps } from "./types";

export default function Board(props: IBoardProps) {
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

        {data?.fetchBoards.map((el, index) => (
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
                <div className={props.styles.boardTitle}>{el.title}</div>
              </div>
              <div className={props.styles.boardSide}>
                <div className={props.styles.boardName}>{el.writer}</div>
                <div className={props.styles.boardDate}>{el.createdAt}</div>
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
        <div className={props.styles.boardContents}>
          <div className={props.styles.boardSide}>
            <div className={props.styles.boardNum}>243</div>
            <div className={props.styles.boardTitle}>
              제주 살이 1일차 - 이건 예비용
            </div>
          </div>
          <div className={props.styles.boardSide}>
            <div className={props.styles.boardName}>홍길동</div>
            <div className={props.styles.boardDate}>2024.12.16</div>
          </div>
          <Image
            src="/images/delete.png"
            alt="삭제하기"
            className={props.styles.deleteIcon}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        <div className={props.styles.boardContents}>
          <div className={props.styles.boardSide}>
            <div className={props.styles.boardNum}>243</div>
            <div className={props.styles.boardTitle}>
              제주 살이 1일차 - 이건 예비용
            </div>
          </div>
          <div className={props.styles.boardSide}>
            <div className={props.styles.boardName}>홍길동</div>
            <div className={props.styles.boardDate}>2024.12.16</div>
          </div>
          <Image
            src="/images/delete.png"
            alt="삭제하기"
            className={props.styles.deleteIcon}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </>
  );
}
