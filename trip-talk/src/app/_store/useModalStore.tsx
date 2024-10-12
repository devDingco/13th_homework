// store/useModalStore.js
import { ReactNode } from 'react';
import { create } from 'zustand';

const useModalStore = create((set) => ({
  modalTitle: '',
  modalContent: '',
  isModalVisible: false,
  userPromptResult: '',
  modalType: 'MODAL',
  resolve: null,
  reject: null,

  showModal: (type = 'MODAL', title?: string, content?: string | ReactNode) => {
    return new Promise((resolve, reject) => {
      set({
        userPromptResult: '',
        isModalVisible: true,
        modalContent: content,
        modalTitle: title,
        modalType: type,
        resolve,
        reject,
      });
    });
  },

  closeModal: (input = true) => {
    set((state: any) => {
      state.resolve?.(input); // Promise를 resolve하여 결과 반환
      return {
        isModalVisible: false,
        userPromptResult: '',
        resolve: null,
        reject: null,
      };
    });
  },

  cancelModal: () => {
    set((state: any) => {
      state.reject?.(); // Promise를 reject하여 취소
      return {
        isModalVisible: false,
        userPromptResult: '',
        resolve: null,
        reject: null,
      };
    });
  },
}));

export default useModalStore;
