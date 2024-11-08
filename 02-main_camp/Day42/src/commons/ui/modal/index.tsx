import React from "react";
import styles from "./styles.module.css";

interface IModalProps {
  title: string;
  description: string;
  buttonText: string;
  handleCancel?: () => void;
  handleConfirm?: () => void;
}

export default function Modal({
  title,
  description,
  buttonText,
  handleCancel,
  handleConfirm,
}: IModalProps) {
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__background}></div>
      <div className={styles.modal}>
        <div className={styles.title__container}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.buttons__container}>
          <button className={styles.button__cancel} onClick={handleCancel}>
            취소
          </button>
          <button className={styles.button} onClick={handleConfirm}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
