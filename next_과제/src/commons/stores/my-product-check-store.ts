import { create } from "zustand";

interface ImyProductCheckStore {
  myProductCheck: boolean;
  setMyProductCheck: (productCheck: boolean) => void;
}
// 내가 등록한 상품인지 체크하는 store - 질문 답변하기 및 상품 수정 및 삭제시 사용
export const useMyProductCheck = create<ImyProductCheckStore>((set) => ({
  myProductCheck: false,
  setMyProductCheck: (productCheck) =>
    set(() => ({ myProductCheck: productCheck })),
}));
