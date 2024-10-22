import { Modal } from "antd";

export const successModal = (content: string, onOk?: () => void) => {
  Modal.success({
    content: content,
    onOk: onOk || (() => {}),
  });
};

export const errorModal = (content: string) => {
  Modal.error({
    content: content,
  });
};
