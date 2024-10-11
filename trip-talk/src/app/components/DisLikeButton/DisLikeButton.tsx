import { DislikeOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function DisLikeButton() {
  return (
    <div>
      <DislikeOutlined />
      <p className={styles.dislike_count}>12</p>
    </div>
  );
}
