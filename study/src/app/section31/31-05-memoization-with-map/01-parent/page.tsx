"use client";

import { Button } from "antd";
import { useState } from "react";
import Word from "../02-child/page";
import { v4 as uuidv4 } from "uuid";

export default function MemoizationWithMapParentPage() {
  const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었습니다.");

  const onClickChange = () => {
    setData("영희는 오늘 저녁을 맛없게 먹었습니다.");
  };

  return (
    <>
      {/* 
        1. memo를 사용하게 되면 key 또는 text의 변경된 부분에 대해서만 리렌더링이 일어난다.
        key를 사용하지 않으면, key가 없다는 경고가 뜬다. 또한 key는 변동이 없는 고유값이어야한다.
     
      {data.split(" ").map((text, index) => (
        <Word key={`${text}_${index}`} text={text} />
      ))}
      */}
      <br />

      {/* 
      2. memo를 해도, key값에 uuid적용시 해당 키값이 계속 변경되므로, 5개 모두 리렌더링이 일어나게 된다.
      즉, 변경되지 않는 고유한 key값을 사용해야한다.
       */}
      {data.split(" ").map((text) => (
        <Word key={uuidv4()} text={text} />
      ))}

      <Button onClick={onClickChange}>데이터 변경하기</Button>
    </>
  );
}
