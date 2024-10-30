//글로벌 스토어(zustand)임

import { create } from "zustand";

// const useCountStore = create((set) => {
//   return {
//     count: 0,
//     setCount: (newCount) =>
//       set(() => {
//         return {
//           count: newCount,
//         };
//       }),
//   };
// });

export const useCountStore = create((set) => ({
  count: 0,
  setCount: (newCount) => set(() => ({ count: newCount })),
}));

//count, setCount는 마음대로 바꿀수잇지만

// set함수 쓸거라 (set) 이건 못바꿈

//리턴과 중괄호 사이에 아무것도 없으면 소괄호로 바꿀수있다.
// 이 경우에는 소괄호는 생략이 불가능 하다 (리턴이 아니라 화살표함수 시작으로 착각))
