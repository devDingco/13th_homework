// 파일의 이름이 route.ts인 이유는 이 파일이 라우팅을 담당하는 파일이기 때문이다. 반드시 이름이 route여야 한다.

export function GET() {
  console.log("Next 서버에 요청했군요!");
  console.log(
    "저는 지금 백엔드(http://localhost:3000/mynaver1)처럼 작동하고 있습니다."
  );

  // Next서버를 백엔드처럼 사용하여 API로 브라우저에 JSON 데이터 보내기 (JSON.stringify로 문자열로 바꿔서 보내줘야함)
  return new Response(JSON.stringify({ message: "요청에 성공하였습니다!" }), {
    status: 200,
  });
}
