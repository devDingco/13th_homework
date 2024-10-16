"use client";
import { Button, Input } from "antd";
import { useState } from "react";

export default function ModalAddressPage() {
  const [count, setCount] = useState(0);

  const countUp = () => {
    // 다섯번 선언했지만 한번만 증가합니다.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    // 이전값을 참고하여 증감하므로 아래는 5씩 증가합니다.
    // setCount((prevCount) => prevCount + 1);
    // setCount((prevCount) => prevCount + 1);
    // setCount((prevCount) => prevCount + 1);
    // setCount((prevCount) => prevCount + 1);
    // setCount((prevCount) => prevCount + 1);
  };

  const countDown = () => {
    setCount(count - 1);
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
