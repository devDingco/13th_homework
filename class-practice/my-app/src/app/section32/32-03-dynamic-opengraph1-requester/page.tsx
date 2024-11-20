"use client";

// 요청자관점 => 카카오개발자, 슬랙개발자 등
export default function HtmlScrapingPage() {
  const onClickScraping = async () => {
    // 1. 채팅문자열에 주소가 있는지 찾기 (ex, http로 시작하는것)

    // 2. 해당 주소로 스크래핑하기
    const 상품ID = "6734c4469712e0002973f4a8";
    const result = await fetch(
      `http://localhost:3000/section32/32-03-dynamic-opengraph2-provider/${상품ID}`
    );
    const data = await result.text();
    console.log(data);

    // 3. 메타태그에서 오픈그래프(og:~~) 찾기
    const resultOg = data
      .split("<meta")
      .filter((el) => el.includes('property="og:'));
    console.log(resultOg);
  };

  return <button onClick={onClickScraping}>채팅 입력 후 엔터치기</button>;
}
