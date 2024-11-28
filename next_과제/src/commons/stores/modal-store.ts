"use client";

import { create } from "zustand";

interface IUseModalStore {
  isModal: {
    [name in string]: {
      contents: string | JSX.Element;
      confirm?: (value?: string) => Promise<void>;
    };
  };
  setIsModal: ({
    name,
    contents,
    confirm,
  }: {
    name?: string;
    contents?: string | JSX.Element;
    confirm?: (value?: string) => Promise<void>;
  }) => void;
  removeModal: (name: string) => void;
}

export const useModalStore = create<IUseModalStore>((set) => ({
  isModal: {} as IUseModalStore["isModal"],
  setIsModal: ({ name, contents, confirm }) =>
    set((state) => ({
      isModal: {
        ...state.isModal,
        ...(name ? { [name]: { contents: contents || "", confirm } } : {}),
      },
    })),
  removeModal: (name: string) =>
    set((state) => {
      const { [name]: _, ...rest } = state.isModal; // eslint-disable-line @typescript-eslint/no-unused-vars
      return { isModal: rest };
    }),
}));
