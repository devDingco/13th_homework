"use client";

import Box from "@/components/13-03-props-children2";

export default function 페이지() {
  return (
    <>
      <div>=====페이지========</div>
      {/* 쏙 들어가기! 떙겨오기!*/}
      <Box school="다람쥐초등학교">
        <div>
          <input type="text" />
          <button>버튼2</button>
          <div>안녕하세요</div>
        </div>
      </Box>
      <div>=====페이지========</div>
    </>
  );
}
