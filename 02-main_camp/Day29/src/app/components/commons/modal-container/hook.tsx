import { useState } from "react";

const useModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const showModal = () => {
    console.log("모달창이 열립니다..");
    onToggleModal();
  };

  const onClickOk = () => {
    console.log("모달창이 닫힙니다..");
    onToggleModal();
  };

  const onClickModalCancel = () => {
    onToggleModal();
  };

  return {
    onToggleModal,
    isModalOpen,
    setIsModalOpen,
    showModal,
    onClickOk,
    onClickModalCancel,
  };
};

export default useModalContainer;
