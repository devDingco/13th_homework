"use client";

import { create } from "zustand";
import type { IUseModalType } from "@/components/modal-alert-box/types";

export interface IUseModalStore {
  isModal: {
    [name in IUseModalType]: {
      isModalOpen?: boolean;
      confirm?: (value: string) => Promise<void>;
    };
  };
  setIsModal: ({
    name,
    isModalOpen,
    confirm,
  }: {
    name: IUseModalType;
    isModalOpen?: boolean;
    confirm?: (value: string) => Promise<void>;
  }) => void;
}

export const useModalStore = create<IUseModalStore>((set) => ({
  isModal: {} as IUseModalStore["isModal"],
  setIsModal: ({
    name,
    isModalOpen = true,
    confirm = async () => {},
  }: {
    name: IUseModalType;
    isModalOpen?: boolean;
    confirm?: (value: string) => Promise<void>;
  }) =>
    set((state) => ({
      isModal: {
        ...state.isModal,
        [name]: { isModalOpen, confirm },
      },
    })),
}));

// setIsModal({
//   key: "login_confirm",
//   isModalOpen: true,
//   confirm: async (value) => {
//     console.log(value);
//   },
// })
