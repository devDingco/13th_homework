import Box from "@/components/13-01-props";

export default function Page() {
  // 1. props로 값 넘기기
  // return (
  //   <>
  //     <div>------ 철수 ------</div>
  //     <Box apple={3} />
  //     <div>------ 영희 ------</div>
  //   </>
  // );

  // 2. props로 JSX 넘기기
  return (
    <>
      <div>------ 철수 ------</div>
      <Box apple={<button className="btn">버튼</button>} />
      <div>------ 영희 ------</div>
    </>
  );
}
