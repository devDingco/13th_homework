import IconLeftArrow from "@/components/icon/icon-left_arrow";
import FormSolplace from "@/components/form/form-solplace";
import styles from "./styles.module.css";

export default function SolplaceLogsNewPage() {
  return (
    <>
      <div className={styles.navigation__container}>
        <IconLeftArrow />
        <p>플레이스 등록</p>
      </div>
      <FormSolplace />
    </>
  );
}
