import Image from "next/image";
import styles from "../boardDetail.module.css";

const ActionButtons: React.FC = () => (
  <div className={styles.목록수정버튼상자}>
    <button>
      <Image
        src="/images/icons/Left icon.svg"
        alt="목록버튼"
        width={24}
        height={24}
      />
      목록으로
    </button>
    <button>
      <Image
        src="/images/icons/Left icon (1).svg"
        alt="수정하기버튼"
        width={24}
        height={24}
      />
      수정하기
    </button>
  </div>
);

export default ActionButtons;
