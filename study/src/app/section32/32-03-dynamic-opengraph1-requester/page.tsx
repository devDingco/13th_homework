"use client";
// 요청자 관점
export default function OpenGraphRequesterPage() {
  const onClickScraping = async () => {
    // fetch 할 주소가 채팅을 통해 입력한 주소라고 가정한다.
    const travelproductId = "672b18cbaf931d0029555f65";
    const result = await fetch(
      `http://localhost:3000/section32/32-03-dynamic-opengraph2-provider/${travelproductId}`
    );
    const data = await result.text();
    // console.log(data);

    // 메타태그 og 정보를 가져오기
    const resultOg = data.split("<meta").filter((data) => {
      if (data.includes('property="og:"')) {
        console.log(data);
      }
    });
    console.log(resultOg);
  };
  return (
    <>
      <button onClick={onClickScraping}>채팅입력후 엔터치기</button>
    </>
  );
}
