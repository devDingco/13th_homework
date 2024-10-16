import React from "react";
import Image from "next/image";
import styles from "../boardDetail.module.css";
import { useRouter } from "next/navigation";
import { ActionButtonsProps } from "@/types/board";

const ActionButtons: React.FC<ActionButtonsProps> = ({ boardId }) => {
  const router = useRouter();

  const handleListClick = () => {
    router.push("/boards");
  };

  const handleEditClick = () => {
    router.push(`/boards/${boardId}/edit`);
  };

  return (
    <div className={styles.목록수정버튼상자}>
      <button onClick={handleListClick}>
        <Image
          src="/images/icons/Left icon.svg"
          alt="목록버튼"
          width={24}
          height={24}
        />
        목록으로
      </button>
      <button onClick={handleEditClick}>
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
};

export default ActionButtons;
