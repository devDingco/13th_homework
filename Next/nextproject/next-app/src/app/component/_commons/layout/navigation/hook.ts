"use client";
import { FETCHUSER } from "@/app/component/queires/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UseLayout() {
  const router = useRouter();
  const onClickMain = () => {
    router.push("../../../../boards");
  };
  const [isLogin, setIsLogin] = useState(false);
  const { data } = useQuery(FETCHUSER);
  const onClickLogin = () => {
    router.push("../../../../login");
  };

  useEffect(() => {
    if (data?.fetchUserLoggedIn) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return { onClickMain, data, onClickLogin, isLogin };
}
