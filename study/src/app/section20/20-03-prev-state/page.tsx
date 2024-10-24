"use client";
import { Button, Input } from "antd";
import { useState } from "react";

export default function ModalAddressPage() {
  const [count, setCount] = useState(0);

  const countUp = () => {
    // 1. 기본 사용
    // setCount((prev) => prev + 1);
    // 2. 함수 선언식 사용
    // setCount(function (prev) {
    //   return prev + 1;
    // });
    // 3. 함수 표현식 사용
    // setCount((prev) => {
    //   return prev + 1;
    // });

    // 4. 매개변수 변경 사용 : 매개변수의 이름은 내가 정하는데로 쓰는거다
    setCount(function (prev1, prev2) {
      console.log(prev2);
      return prev1 + 1;
    });
  };

  const countDown = () => {
    setCount(function (prev) {
      return prev - 1;
    });
  };

  return (
    <div className="flex gap-2 w-[200px]">
      <Button onClick={countUp} color="default" variant="solid" size="large">
        +1
      </Button>
      <Input type="number" value={count} />
      <Button onClick={countDown} color="default" variant="solid" size="large">
        -1
      </Button>
    </div>
  );
}
