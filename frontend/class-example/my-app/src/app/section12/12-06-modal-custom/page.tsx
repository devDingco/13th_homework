"use client";

import { Modal } from "antd";
import { useState } from "react";

export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>모달창열기</button>
      <Modal
        title="모달 제목 입력하는 곳"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        비밀번호입력: <input type="password" />
      </Modal>
    </>
  );
}
