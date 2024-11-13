import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function useLayoutHeader() {
  const router = useRouter();
  const path = usePathname();

  const [mainPage, setMainPage] = useState(true);
  const [purchasePage, setPurchasePage] = useState(false);
  const [myPage, setMyPage] = useState(false);

  const onClickMoveMainPage = () => {
    if (path === "/") window.location.reload();
    router.push("/");
  };

  const onClickTripTalk = () => {
    setMainPage(true);
    setPurchasePage(false);
    setMyPage(false);
  };

  const onClickMovePurchasePage = () => {
    setMainPage(false);
    setPurchasePage(true);
    setMyPage(false);
  };

  const onClickMoveMyPage = () => {
    setMainPage(false);
    setPurchasePage(false);
    setMyPage(true);
  };

  return {
    onClickTripTalk,
    onClickMoveMainPage,
    onClickMovePurchasePage,
    onClickMoveMyPage,
    mainPage,
    purchasePage,
    myPage,
  };
}
