"use client";

export default function RscWithNoCachePage() {
  const onClickButton = async () => {
    const result = await fetch("https://koreanjson.com/posts/1");
    const data = await result.json();
    console.log(data);
  };

  return <button onClick={onClickButton}>요청하기</button>;
}
