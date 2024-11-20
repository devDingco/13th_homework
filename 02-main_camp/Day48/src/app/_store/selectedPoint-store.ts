import { create } from "zustand";

interface ISelectedPoint {
  selectedPoint: number;
  setSelectedPoint: (newPoint: number) => void;
}

export const useSelectedPointStore = create<ISelectedPoint>((set) => ({
  selectedPoint: 0,
  setSelectedPoint: (newPoint: number) =>
    set(() => ({ selectedPoint: newPoint })),
}));
