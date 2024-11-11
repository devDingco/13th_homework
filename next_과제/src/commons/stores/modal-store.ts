"use client";

import { create } from "zustand";
import type { IUseModalType } from "@/components/modal-alert-box/types";
export interface IUseModalStore {
  isModal: {
    type: IUseModalType["type"] | "";
    isModalOpen?: boolean;
    confirm?: (value: string) => Promise<void>;
  };
  setIsModal: ({
    type,
    isModalOpen,
    confirm,
  }: {
    type: IUseModalType["type"];
    isModalOpen?: boolean;
    confirm?: (value: string) => Promise<void>;
  }) => void;
}

export const useModalStore = create<IUseModalStore>((set) => ({
  isModal: {
    type: "",
    isModalOpen: true,
    confirm: async () => {},
  },
  setIsModal: ({ type, isModalOpen = true, confirm = async () => {} }) =>
    set(() => ({ isModal: { type, isModalOpen, confirm } })),
}));
