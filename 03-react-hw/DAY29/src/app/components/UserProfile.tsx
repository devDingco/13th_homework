import Image from "next/image";
import styles from "./userProfile.module.css";

interface IUserProfileProps {
  writer: string;
}

export default function UserProfile({ writer }: IUserProfileProps) {
  return (
    <>
      <div className={styles.작성자상자}>
        <Image
          src="/images/icons/img.svg"
          alt="프로필사진"
          width={24}
          height={24}
        />
        <span>{writer}</span>
      </div>
    </>
  );
}
