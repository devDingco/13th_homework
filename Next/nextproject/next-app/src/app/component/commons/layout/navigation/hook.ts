"use client";
import { FETCHUSER } from "@/app/component/queires/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

export function UseLayout() {
  const router = useRouter();
  const onClickMain = () => {
    router.push("../../../../boards");
  };

  const { data } = useQuery(FETCHUSER);
  const onClickLogin = () => {
    router.push("../../../../login");
  };

  return { onClickMain, data, onClickLogin };
}
