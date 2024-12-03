import AddImage from "@/components/commons/add-image";
import styles from "./styles.module.css";
import { InputAddress, InputNormal } from "@/commons/ui/input";
import { TextareaNormal } from "@/commons/ui/textarea";

export default function PlaceForm({ onClickAddressInput }) {
  return (
    <div className={styles.main}>
      {/* 이미지 등록 */}
      <AddImage />

      {/* 플레이스 이름 */}
      <InputNormal
        label="플레이스 이름"
        name="name"
        type="text"
        placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
        isRequired={true}
      />

      {/* 플레이스 주소 */}
      <InputAddress
        label="플레이스 주소"
        name="address"
        type="text"
        placeholder="플레이스 주소 입력"
        readOnly={true}
        onClick={onClickAddressInput}
      />

      {/* 플레이스 내용 */}
      <TextareaNormal
        name="contents"
        label="플레이스 내용"
        placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
        isRequired={true}
      />
    </div>
  );
}
