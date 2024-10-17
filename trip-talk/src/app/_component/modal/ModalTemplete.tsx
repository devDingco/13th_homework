// components/ModalTemplete.js
'use client';

import { useState } from 'react';
import { Modal, Input } from 'antd';
import React from 'react';
import useModalStore from '@/app/_store/useModalStore';

export default function ModalTemplete() {
  const {
    isModalVisible,
    modalType,
    closeModal,
    cancelModal,
    modalContent,
    modalTitle,
  } = useModalStore();

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      {isModalVisible && (
        <Modal
          title={modalTitle}
          open={isModalVisible}
          onCancel={cancelModal}
          onOk={() => {
            modalType === 'PROMPT' ? closeModal(inputValue) : closeModal(true);
          }}
          centered
          closable
          keyboard>
          {modalContent}
          {modalType === 'PROMPT' && (
            <Input
              type="password"
              placeholder="Enter your input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
