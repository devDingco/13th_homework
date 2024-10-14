"use client";
import { useRouter } from "next/navigation";
export function UseLayout() {
  const router = useRouter();
  const onClickMain = () => {
    router.push("../../../../boards");
  };
  return onClickMain;
}
