import { create } from "zustand";
import { ISampleData } from "../solplace-logs/page";

interface SampleDataType {
  data: ISampleData;
  setData: (data: ISampleData) => void;
}

const useSampleDataStore = create<SampleDataType>((set) => ({
  data: {
    id: 0,
    name: "",
    contents: "",
    images: [],
  },
  setData: (data) => set({ data: data }),
}));

export default useSampleDataStore;
