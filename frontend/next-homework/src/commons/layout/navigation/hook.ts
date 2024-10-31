"use client";

import { useRouter } from "next/navigation";

const useNavigetionLayout = () => {
  const router = useRouter();

  const onClickLogo = () => {
    router.push("/");
  };

  const onClickTripBoards = () => {
    router.push("/boards");
  };

  const onClickLogin = () => {
    router.push("/user/login");
  };
  return { onClickLogo, onClickTripBoards, onClickLogin };
};

export default useNavigetionLayout;
