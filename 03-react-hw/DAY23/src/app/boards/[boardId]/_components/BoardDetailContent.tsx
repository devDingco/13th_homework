import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "../boardDetail.module.css";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { ActionButtons } from "./ActionButtons";

interface BoardContentProps {
  contents: string;
  likes: number;
  dislikes: number;
}

const BoardDetailContent: React.FC<BoardContentProps> = ({
  contents,
  likes,
  dislikes,
}) => {
  const params = useParams();

  return (
    <div className={styles.게시글총내용상자}>
      <div>
        <Image
          src="/images/donggle1.jpeg"
          alt="고양이사진"
          width={400}
          height={531}
        />
      </div>
      <pre>{contents}</pre>
      <div className={styles.동영상배경상자}>
        <div></div>
      </div>
      <LikeDislikeButtons likes={likes} dislikes={dislikes} />
      <ActionButtons boardId={params.boardId as string} />
    </div>
  );
};

export default BoardDetailContent;
