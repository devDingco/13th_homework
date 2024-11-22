import { ButtonSize } from "../../button/button-base";
import { ButtonPrimary } from "../../button/button-primary";
import { ButtonTertiary } from "../../button/button-tertiary";
import { ChargePointIcon } from "../../icon";
import ModalChargePointSelectBox from "./select-box";
import styles from "./styles.module.css";

interface IModalChargePoint {
  handleCancel: () => void;
  handleConfirm: () => void;
}

export default function ModalChargePoint({
  handleCancel,
  handleConfirm,
}: IModalChargePoint) {
  return (
    <div className={styles.modal__wrapper}>
      <div className={styles.modal__background}></div>
      <div className={styles.modal__container}>
        <div className={styles.main__container}>
          <ChargePointIcon />
          <p>충전하실 금액을 선택해 주세요.</p>
          <ModalChargePointSelectBox />
          <ul></ul>
        </div>
        <div className={styles.button_container}>
          <ButtonTertiary
            label="취소"
            size={ButtonSize.small}
            onClick={handleCancel}
          />
          <ButtonPrimary
            label="충전하기"
            size={ButtonSize.small}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}
