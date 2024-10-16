"use client";
import { useState } from "react";
import Child1 from "@/components/14-04-lifting-state-up/Child1";
import Child2 from "@/components/14-04-lifting-state-up/Child2";

export default function Page() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>count: {count}</div>
      <div className="flex gap-5">
        <Child1 count={count} setCount={setCount} />
        <Child2 count={count} setCount={setCount} />
      </div>
    </>
  );
}
