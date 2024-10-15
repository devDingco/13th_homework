// store/useModalStore.js
import { promises } from 'dns';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalStateType {
  modalTitle: string;
  modalContent: string | ReactNode;
  isModalVisible: boolean;
  userPromptResult: boolean | string;
  modalType: 'MODAL' | 'CONFIRM' | 'PROMPT';
  resolve: ((result: ModalStateType['userPromptResult']) => void) | null;
  reject: ((reason?: any) => void) | null;

  showModal: (
    modalType: ModalStateType['modalType'],
    modalTitle: ModalStateType['modalTitle'],
    modalContent: ModalStateType['modalContent'],
  ) => Promise<ModalStateType['userPromptResult']>;

  closeModal: (input?: boolean | string | null) => void;
  cancelModal: () => void;
}

const useModalStore = create<ModalStateType>((set) => ({
  modalTitle: '',
  modalContent: '',
  isModalVisible: false,
  userPromptResult: '',
  modalType: 'MODAL',
  resolve: null,
  reject: null,

  showModal: (
    modalType = 'MODAL',
    modalTitle?,
    modalContent?: string | ReactNode,
  ) => {
    return new Promise((resolve, reject) => {
      set({
        userPromptResult: '',
        isModalVisible: true,
        modalContent,
        modalTitle,
        modalType,
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
