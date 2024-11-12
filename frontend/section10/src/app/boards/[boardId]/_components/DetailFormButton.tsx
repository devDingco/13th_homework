"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdMenu } from "react-icons/md";
import { MdOutlineCreate } from "react-icons/md";
import { useRouter } from "next/navigation";
import DetailFormPasswordModal from "./DetailFormPasswordModal";

export default function DetailFormButton({ value }: IDetailButtonProps) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const router = useRouter();

  const handleShowDialog = () => {
    setShowPasswordDialog((prev) => !prev);
  };

  return (
    <div className="flex justify-center gap-5">
      {showPasswordDialog && (
        <DetailFormPasswordModal
          boardId={value}
          handleShowDialog={handleShowDialog}
        />
      )}
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
        onClick={handleShowDialog}
      >
        <MdOutlineCreate />
        수정하기
      </Button>
    </div>
  );
}
