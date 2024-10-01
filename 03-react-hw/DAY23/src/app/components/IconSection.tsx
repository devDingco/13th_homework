import Image from "next/image";
import styles from "../boards/[boardId]/styles.module.css";

const IconSection: React.FC = () => (
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
);

export default IconSection;
