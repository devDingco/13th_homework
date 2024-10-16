"use client";

import { CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { IModalContainer } from "../../../types/components.type";
import Button from "../Button/Button";
import { ChangeEvent, useState } from "react";

export default function ModalContainer(props: IModalContainer) {
  const { isSwitched, children, isPrompt, alertMessage, setUserPassword } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(true);

  const ontoggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword!(event.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.modal_background}>
          <div className={styles.modal_box}>
            <div
              className={styles.header}
              style={{ backgroundColor: isSwitched ? "lightCoral" : "blue" }}
            >
              <div>{children}</div>
              <button onClick={ontoggleModal}>
                <CloseOutlined />
              </button>
            </div>
            <div className={styles.contents_layout}>
              <div>
                <div>{alertMessage}</div>
                {isPrompt && (
                  <input
                    onChange={onChangePassword}
                    type="password"
                    placeholder="password"
                  />
                )}
              </div>
              <div className={styles.button_layout}>
                <Button onClick={ontoggleModal} id="cancel" color="white" />
                <Button id="confirm" color="blue" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
