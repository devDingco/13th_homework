import styles from "./styles.module.css";

import AddImage from "@/components/commons/add-image";
import SolplaceInputTitle from "./title-input";
import SolplaceInputAddress from "./address-input";
import SolplaceInputContents from "./contents-input";

export default function InputSection() {
  return (
    <div className={styles.main}>
      {/* 이미지 등록 */}
      <AddImage />
      {/* 플레이스 이름 */}
      <SolplaceInputTitle />
      {/* 플레이스 주소 */}
      <SolplaceInputAddress />
      {/* 플레이스 내용 */}
      <SolplaceInputContents />
    </div>
  );
}
