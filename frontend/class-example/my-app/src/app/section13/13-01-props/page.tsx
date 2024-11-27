"use client";

import Box from "@/components/13-01-props";

export default function 페이지() {
  // 1. props로 값 넘기기
  //   return (
  //     <>
  //       <div>=====페이지========</div>
  //       <Box apple={3} />
  //       <div>=====페이지========</div>
  //     </>

  // 2. props로 JSX 넘기기
  return (
    <>
      <div>=====페이지========</div>
      <Box apple={<button>버튼</button>} />
      <div>=====페이지========</div>
    </>
  );
}
