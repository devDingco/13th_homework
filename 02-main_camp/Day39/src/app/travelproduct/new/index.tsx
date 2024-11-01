import Divider from "@/app/_components/commons/divider";
import { InputForm } from "@/app/_components/commons/input";
import React from "react";

export default function NewTravelProductPage() {
  return (
    <div>
      <h3>숙박권 판매하기</h3>
      <InputForm type="text" placeholder="상품명을 입력해 주세요.">
        상품명
      </InputForm>
      <Divider />
      <InputForm type="text" placeholder="상품을 한 줄로 요약해 주세요.">
        한줄 요약
      </InputForm>
    </div>
  );
}
