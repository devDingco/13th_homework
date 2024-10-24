"use client";
export default function MapElPage() {
  // 1. 기본방법
  ["철수", "영희", "훈이"].forEach((el, index) => {
    console.log("el", el);
    console.log("index", index);
  });

  console.log("========================================");

  // 2. 매개변수 변경 방법
  ["철수", "영희", "훈이"].forEach((aaa, sss) => {
    console.log("el", aaa);
    console.log("index", sss);
  });

  console.log("========================================");

  // 3. 함수선언식 방법
  ["철수", "영희", "훈이"].forEach(function (aaa, sss) {
    console.log("el", aaa);
    console.log("index", sss);
  });

  console.log("========================================");

  // 4. el과 index 바꾸기
  ["철수", "영희", "훈이"].forEach((index, el) => {
    console.log("el", el);
    console.log("index", index);
  });
  return <></>;
}
