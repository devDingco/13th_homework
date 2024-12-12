import { usePlaceDetail } from "@/commons/hooks/use-place-detail";
import styles from "./styles.module.css";

export default function PlaceContents() {
  const { data } = usePlaceDetail();
  const contents = data?.fetchSolplaceLog?.contents;
  return (
    <div className={styles.contents}>
      <div>{contents}</div>
    </div>
  );
}
