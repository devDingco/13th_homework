import Image from "next/image";
import styles from "./styles.module.css";
import useBoardsDetailForm from "./hook";

export default function BoardsDetailForm() {
  const { data, handlePage } = useBoardsDetailForm();

  return (
    <div className={styles.게시물상세화면상자}>
      {/* 게시글 제목부분 */}
      <div className={styles.게시물타이틀상자}>
        <p>{data?.fetchBoard.title}</p>
        <div className={styles.작성자등록일자담는상자}>
          <div className={styles.작성자상자}>
            <Image
              src="/images/icons/img.svg"
              alt="프로필사진"
              width={24}
              height={24}
            />
            <span>{data?.fetchBoard.writer}</span>
          </div>
          <span>{data?.fetchBoard.createdAt}</span>
        </div>
      </div>
      <hr />
      <div>
        {/* 링크복사, 위치 아이콘 표시 */}
        <div className={styles.아이콘상자}>
          <Image
            src="/images/icons/Link Icon Weight 300.svg"
            alt="링크복사아이콘"
            width={24}
            height={24}
          />
          <Image
            src="/images/icons/location_on_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.svg"
            alt="위치아이콘"
            width={24}
            height={24}
          />
        </div>
        {/* 게시글 사진, 내용, 동영상, 좋아요싫어요 버튼 상자 */}
        <div className={styles.게시글총내용상자}>
          {/* 사진 */}
          <div>
            <Image
              src="/images/donggle1.jpeg"
              alt="고양이사진"
              width={400}
              height={531}
            />
          </div>
          {/* 게시글 내용 */}
          <pre>{data?.fetchBoard.contents}</pre>
          {/* 게시글 동영상 */}
          <div className={styles.동영상배경상자}>
            <div></div>
          </div>
          {/* 좋아요 싫어요 상자 */}
          <div className={styles.좋싫상자}>
            {/* 싫어요 상자 */}
            <div>
              <Image
                src="/images/icons/bad.svg"
                alt="싫어요버튼"
                width={24}
                height={24}
              />
              <span>24</span>
            </div>
            {/* 좋아요 상자 */}
            <div className={styles.좋아요상자}>
              <Image
                src="/images/icons/good.svg"
                alt="좋아요버튼"
                width={24}
                height={24}
              />
              <span>12</span>
            </div>
          </div>
          {/* 목록, 수정하기 버튼 상자 */}
          <div className={styles.목록수정버튼상자}>
            <button onClick={handlePage} id="boardListPage">
              <Image
                src="/images/icons/Left icon.svg"
                alt="목록버튼"
                width={24}
                height={24}
              />
              목록으로
            </button>
            <button onClick={handlePage}>
              <Image
                src="/images/icons/Left icon (1).svg"
                alt="수정하기버튼"
                width={24}
                height={24}
              />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
