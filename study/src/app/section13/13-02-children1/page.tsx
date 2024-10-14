import Box from "@/components/13-02-children1";

export default function Page() {
  // 1. children으로 값 넘기기 (추천하지 않음, eslint 경고 발생)
  // return (
  //   <>
  //     <div>-------- 철수 --------</div>
  //     <Box children={<button>버튼</button>} />
  //     <div>-------- 영희 --------</div>
  //   </>
  // );

  // 2. children으로 JSX 넘기기
  // return (
  //   <>
  //     <div>-------- 철수 --------</div>
  //     <Box>
  //       <button className="btn">버튼</button>
  //     </Box>
  //     <div>-------- 영희 --------</div>
  //   </>
  // );

  // 3. children으로 여러 개의 JSX 넘기기
  return (
    <>
      <div>-------- 철수 --------</div>
      <Box>
        <button className="btn">버튼</button>
        <button className="btn">버튼</button>
      </Box>
      <div>-------- 영희 --------</div>
    </>
  );
}
