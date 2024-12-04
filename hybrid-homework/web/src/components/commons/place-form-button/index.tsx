import styles from "./styles.module.css";
import { ButtonPrimaryMFull } from "@/commons/ui/button";

export default function PlaceFormButton({ isEdit }) {
  return (
    <div className={styles.button}>
      <ButtonPrimaryMFull>{isEdit ? "수정" : "로그 등록"}</ButtonPrimaryMFull>
    </div>
  );
}
