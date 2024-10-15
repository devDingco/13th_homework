"use client";
import { Button } from "@/components/ui/button";
import { MdMenu } from "react-icons/md";
import { MdOutlineCreate } from "react-icons/md";

export default function DetailFormButton() {
  return (
    <div className="flex justify-center gap-5">
      <Button variant="outline" size="lg" className="flex gap-2 p-3">
        <MdMenu />
        목록으로
      </Button>
      <Button variant="outline" size="lg" className="flex gap-2 p-3">
        <MdOutlineCreate />
        수정하기
      </Button>
    </div>
  );
}
