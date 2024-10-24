"use client";
import Child1 from "@/components/21-03-global-state-with-zustand/Child1";
import Child2 from "@/components/21-03-global-state-with-zustand/Child2";
import { Input } from "antd";
import { useCountStore } from "@/commons/stores/21-03-count-store";

export default function ZustandPage() {
  const { count } = useCountStore();
  return (
    <>
      <div className="flex gap-5">
        <Child1 />
        <Input className="w-[100px]" type="number" value={count} />
        <Child2 />
      </div>
    </>
  );
}
