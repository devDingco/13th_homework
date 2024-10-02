import Image from "next/image";
import styles from "../boardDetail.module.css";

interface LikeDislikeButtonsProps {
  likes: number;
  dislikes: number;
}

const LikeDislikeButtons: React.FC<LikeDislikeButtonsProps> = ({
  likes,
  dislikes,
}) => (
  <div className={styles.좋싫상자}>
    <div>
      <Image
        src="/images/icons/bad.svg"
        alt="싫어요버튼"
        width={24}
        height={24}
      />
      <span>{dislikes}</span>
    </div>
    <div className={styles.좋아요상자}>
      <Image
        src="/images/icons/good.svg"
        alt="좋아요버튼"
        width={24}
        height={24}
      />
      <span>{likes}</span>
    </div>
  </div>
);

export default LikeDislikeButtons;
