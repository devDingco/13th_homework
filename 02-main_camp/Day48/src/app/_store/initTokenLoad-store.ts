"use client";

import { create } from "zustand";

interface IInitTokenLoad {
  isInitTokenLoaded: boolean;
  setIsInitTokenLoaded: () => void;
}

export const useInitTokenLoadStore = create<IInitTokenLoad>((set) => ({
  isInitTokenLoaded: false,
  setIsInitTokenLoaded: () => set(() => ({ isInitTokenLoaded: true })),
}));
