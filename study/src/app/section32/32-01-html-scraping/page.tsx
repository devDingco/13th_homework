"use client";

import { Button } from "antd";
import { Map } from "react-kakao-maps-sdk";

export default function HtmlScrapingPage() {
  const onClickScraping = async () => {
    const result = await fetch("https://www.naver.com");
    const data = await result.text();

    console.log(data);
  };

  return (
    <>
      <Button onClick={onClickScraping}>정보 가져오기</Button>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "400px" }}
      />
    </>
  );
}
