"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MdMenu } from "react-icons/md";
import { MdOutlineCreate } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function DetailFormButton({ value }: IDetailButtonProps) {
  const router = useRouter();
  return (
    <div className="flex justify-center gap-5">
      <Button
        variant="outline"
        size="lg"
        className="flex gap-2 p-3"
        onClick={() => {
          router.push(`/boards/list`);
        }}
      >
        <MdMenu />
        목록으로
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex gap-2 p-3"
        onClick={() => {
          router.push(`/boards/new/${value}`);
        }}
      >
        <MdOutlineCreate />
        수정하기
      </Button>
    </div>
  );
}
