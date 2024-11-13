import { Modal } from "antd";

export default function useModal() {
  // Modal
  const showSuccessModal = (
    content: string,
    completionHandler?: () => void
  ) => {
    Modal.success({
      content: content,
      onOk: completionHandler,
    });
  };

  const showErrorModal = (
    title: string,
    content: string,
    completionHandler?: () => void
  ) => {
    Modal.error({
      title: title,
      content: content,
      onOk: completionHandler,
    });
  };
  return {
    showSuccessModal,
    showErrorModal,
  };
}
