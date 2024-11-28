"use client";

export default function Home() {
  const onClickScraping1 = async () => {
    // 프록시 없이 요청하는 것이므로 CORS 에러가 발생한다.
    const response = await fetch("https://naver.com");
    const result = await response.text();
    console.log(result);
  };

  const onClickScraping2 = async () => {
    // 내가 직접 구현해둔 프록시 서버를 경유하여 요청한다. CORS 에러가 발생하지 않는다.
    const response = await fetch("http://localhost:3000/mynaver2");
    const result = await response.text();
    console.log(result);
  };

  const onClickScraping3 = async () => {
    // next.config.mjs에서 설정해둔 프록시 서버를 경유하여 요청한다. CORS 에러가 발생하지 않는다.
    const response = await fetch("http://localhost:3000/mynaver3");
    const result = await response.text();
    console.log(result);
  };

  return (
    <>
      <button className="bg-black text-white p-4" onClick={onClickScraping1}>
        스크래핑하기(프록시없이)
      </button>
      <br />
      <br />
      <button className="bg-blue-700 text-white p-4" onClick={onClickScraping2}>
        스크래핑하기(프록시경유)
      </button>
      <br />
      <br />
      <button className="bg-red-700 text-white p-4" onClick={onClickScraping3}>
        스크래핑하기(프록시경유) - next.config.mjs 설정
      </button>
    </>
  );
}
