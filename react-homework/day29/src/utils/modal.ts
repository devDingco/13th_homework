import { Modal } from "antd";

export const successModal = (content: string) => {
  Modal.success({
    content: content,
  });
};

export const errorModal = (content: string) => {
  Modal.error({
    content: content,
  });
};
