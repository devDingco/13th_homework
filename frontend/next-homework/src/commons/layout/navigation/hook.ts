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
  return { onClickLogo, onClickTripBoards };
};

export default useNavigetionLayout;
