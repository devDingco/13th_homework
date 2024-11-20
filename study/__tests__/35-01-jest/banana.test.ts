import { add } from "@/app/section35/35-01-jest/banana";

it("더하기 잘 되는지 테스트 해보기", () => {
  const result = add(1, 4);
  expect(result).toBe(5);
});

// describe("더하기 테스트", () => {
//   it("1 + 2 = 3", () => {
//     const result = add(1, 2);
//     expect(result).toBe(3);
//   });

//   it("2 + 3 = 5", () => {
//     const result = add(2, 3);
//     expect(result).toBe(5);
//   });
// });
