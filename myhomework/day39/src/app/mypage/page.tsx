"use client";

import MyInformation from "@/components/my-page/my-info";
import PasswordChange from "@/components/my-page/password-change";
import TransactionBookmark from "@/components/my-page/transaction-and-bookmark";
import React, { useEffect } from "react";
import SubTabNavigation from "@/components/my-page/subtap-navigation";
import { useSubTabNavigation } from "@/components/my-page/subtap-navigation/hook";
import PointList from "@/components/my-page/point-list";
import { TabProvider, useTabContext } from "@/components/my-page/tabContext";
import { useMyInfoNavigation } from "@/components/my-page/my-info/hook";

export function MyPageContent() {
  const { currentTabId } = useTabContext();
  const { activeSubTab, handleSubTabChange, getCurrentSubTabs } =
    useSubTabNavigation(currentTabId);
  const { setIsClickedBookmark } = useMyInfoNavigation();

  // 초기 렌더 시 setIsClickedBookmark(true) 로 설정
  // useEffect(() => {
  //   setIsClickedBookmark(true);
  // }, [setIsClickedBookmark]);

  const renderContent = () => {
    console.log(`Rendering content for currentTabId: ${currentTabId}`);
    switch (currentTabId) {
      case "transaction-and-bookmark":
        return <TransactionBookmark activeSubTab={activeSubTab} />;
      case "point-list":
        return <PointList activeSubTab={activeSubTab} />;
      case "password-change":
        return <PasswordChange />;
      default:
        return null;
    }
  };

  return (
    <>
      <MyInformation />
      <SubTabNavigation
        subTabs={getCurrentSubTabs()}
        activeSubTab={activeSubTab}
        onSubTabChange={handleSubTabChange}
      />
      {renderContent()}
    </>
  );
}

export default function MyPage() {
  return (
    <TabProvider>
      <MyPageContent />
    </TabProvider>
  );
}
