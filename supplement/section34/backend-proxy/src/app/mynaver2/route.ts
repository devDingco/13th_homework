// 파일의 이름이 route.ts인 이유는 이 파일이 라우팅을 담당하는 파일이기 때문이다. 반드시 이름이 route여야 한다.

export async function GET() {
  console.log("Next 서버에 요청했군요!");
  console.log(
    "저는 지금 백엔드(http://localhost:3000/mynaver1)처럼 작동하고 있습니다."
  );

  const result = await fetch("https://www.naver.com");
  const data = await result.text();

  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
