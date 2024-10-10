"use client";

import { Modal } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data);
    onToggleModal();
  };

  return (
    <>
      {/* <button onClick={showModal}>모달창열기2</button> */}
      {/* 모달 종료 방식 - 1. 모달을 숨기는 방법(ex.게시글,이력서 등)*/}
      {/* <Modal
        // title="모달 제목 입력하는 곳"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        게시글 내용 입력: <input type="text" />
      </Modal> */}

      {/* 모달 종료 방식 - 2. 모달 삭제하는 방법(ex.신용카드, 비밀번혿 등)*/}
      <button onClick={onToggleModal}>모달창열기</button>
      {isOpen && (
        <Modal
          // title="모달 제목 입력하는 곳"
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
