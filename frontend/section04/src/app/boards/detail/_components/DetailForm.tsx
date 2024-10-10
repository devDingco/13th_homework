"use client";
import { Button } from "@/components/ui/button";
import DetailFormInfo from "./DetailFormInfo";
import DetailFormContent from "./DetailFormContent";
import DetailFormLike from "./DetailFormLike";
import DetailFormButton from "./DetailFormButton";

export default function DetailForm() {
  return (
    <div className="flex-col py-10 gap-x-10">
      <div className="prose-b_28_36">
        살어리 살어리랏다 쳥산애 살어리랏다 멀위랑 다래랑먹고 청산에
        ㄷ살어리랏다 얄리얄리 얄랑셩 얄라리 얄라
      </div>
      <DetailFormInfo />
      {/* <DetailFormContent /> */}
      <br />
      <Button>Button</Button>
    </div>
  );
}
