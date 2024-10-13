"use client";

import Box from "@/components/13-04-props-children2-typescript";

export default function 페이지() {
  // 1. Children 넘기기 첫번째 방식
  // return (
  //   <>
  //     <div>=====페이지========</div>
  //     <Box children={<button>버튼1</button>} />
  //     <div>=====페이지========</div>
  //   </>
  // );

  // 2. Children 넘기기 두번째 방식
  return (
    <>
      <div>=====페이지========</div>
      <Box>
        <button>버튼2</button>
      </Box>
      <div>=====페이지========</div>
    </>
  );

  // 3. 만약에 둘다 있을 경우? 덮어씌워져서 버튼2만 보이게 된다.
  // return (
  //   <>
  //     <div>=====페이지========</div>
  //     <Box children={<button>버튼1</button>}>
  //       <button>버튼2</button>
  //     </Box>
  //     <div>=====페이지========</div>
  //   </>
  // );
}
