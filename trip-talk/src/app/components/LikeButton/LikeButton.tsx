import { LikeOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function LikeButton() {
  return (
    <div>
      <LikeOutlined />
      <p className={styles.like_count}>24</p>
    </div>
  );
}
