"use client";

import { useState } from "react";
import { useTabContext } from "../tabContext";

export const useMyInfoNavigation = () => {
  const { currentTabId, setCurrentTabId } = useTabContext();
  const [isClickedBookmark, setIsClickedBookmark] = useState(false);
  const [isClickedUsageDetails, setIsClickedUsageDetails] = useState(false);
  const [isClickedPasswordChange, setIsClickedPasswordChange] = useState(false);

  const onClickBookmark = () => {
    setCurrentTabId("transaction-and-bookmark");
    setIsClickedBookmark(true);
    setIsClickedUsageDetails(false);
    setIsClickedPasswordChange(false);
  };

  const onClickUsageDetails = () => {
    setCurrentTabId("point-list");
    setIsClickedBookmark(false);
    setIsClickedUsageDetails(true);
    setIsClickedPasswordChange(false);
    // 'point-list' 탭으로 이동하는 로직 추가
  };

  const onClickPasswordChange = () => {
    setCurrentTabId("password-change");
    setIsClickedBookmark(false);
    setIsClickedUsageDetails(false);
    setIsClickedPasswordChange(true);
    // 'password-change' 탭으로 이동하는 로직 추가
  };

  return {
    currentTabId,
    setCurrentTabId,
    onClickBookmark,
    onClickUsageDetails,
    onClickPasswordChange,
    isClickedBookmark,
    isClickedUsageDetails,
    isClickedPasswordChange,
  };
};
