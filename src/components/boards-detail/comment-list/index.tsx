import { useCommentList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
const IMAGE_SRC = {
  profileImage: {
    src: require("@assets/profile_image.png"),
    alt: "프로필이미지",
  },
  starsImage: {
    src: require("@assets/fivestars.png"),
    alt: "평점이미지",
  },
  editImage: {
    src: require("@assets/edit.png"),
    alt: "편집버튼",
  },
  closeImage: {
    src: require("@assets/close.png"),
    alt: "삭제버튼",
  },
};
export default function CommentList() {
  const { data } = useCommentList();

  console.log("commentList 에서 data:::", data);
  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        {data?.fetchBoardComments.map((comment, index) => (
          <div key={comment?._id}>
            <div className={styles.listBody}>
              <div className={styles.listTitle}>
                <div className={styles.forwardTitle}>
                  <Image
                    src={IMAGE_SRC.profileImage.src}
                    alt={IMAGE_SRC.profileImage.alt}
                  />
                  <div className={styles.forwardTitleText}>
                    {comment?.writer}
                  </div>
                  <Rate defaultValue={comment?.rating} />
                </div>
                <div>
                  <div className={styles.backTitle}>
                    <Image
                      src={IMAGE_SRC.editImage.src}
                      alt={IMAGE_SRC.editImage.alt}
                    />
                    <Image
                      src={IMAGE_SRC.closeImage.src}
                      alt={IMAGE_SRC.closeImage.alt}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.commentText}>{comment?.contents}</div>
              <div className={styles.commentDate}>
                {comment?.createdAt.split("T")[0].split("-").join(".")}
              </div>
            </div>
            {/* 마지막 댓글 밑에는 border 가 없음 */}
            {index + 1 !== data?.fetchBoardComments.length && (
              <div className={styles.border}> </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
