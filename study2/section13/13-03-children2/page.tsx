import Box from "@/components/13-03-children2";

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
      <div>-------- 페이지 --------</div>
      <Box school="다람쥐고등학교">
        <p>안녕하세요!!</p>
        <button className="btn">버튼</button>
      </Box>
      <div>-------- 페이지 --------</div>
    </>
  );
}
