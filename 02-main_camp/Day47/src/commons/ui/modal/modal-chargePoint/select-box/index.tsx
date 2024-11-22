import React from "react";
import { Select } from "antd";
import { useSelectedPointStore } from "@/app/_store/selectedPoint-store";

export default function ModalChargePointSelectBox() {
  const { setSelectedPoint } = useSelectedPointStore();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedPoint(Number(value));
  };

  return (
    <>
      <Select
        defaultValue="포인트를 선택해주세요."
        style={{ width: "100%" }}
        onChange={handleChange}
        options={[
          { value: "100", label: "100" },
          { value: "500", label: "500" },
          { value: "2000", label: "2,000" },
          { value: "5000", label: "5,000" },
          { value: "10000", label: "10,000" },
          { value: "50000", label: "50,000" },
        ]}
      />
    </>
  );
}
