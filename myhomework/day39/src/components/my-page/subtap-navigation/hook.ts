"use client";

import { useEffect, useState } from "react";
import { useMyInfoNavigation } from "../my-info/hook";

// 메인탭별 서브탭 설정
export const TAB_CONFIG = {
  "transaction-and-bookmark": [
    { id: "myItems", label: "나의 상품" },
    { id: "bookmarks", label: "북마크" },
  ],
  "point-list": [
    { id: "all", label: "전체" },
    { id: "charged", label: "충전내역" },
    { id: "purchaseDetails", label: "구매내역" },
    { id: "salesDetails", label: "판매내역" },
  ],
  "password-change": [],
} as const;

export type TabId = keyof typeof TAB_CONFIG;

export const useSubTabNavigation = (initialTabId: TabId) => {
  // 현재 활성화된 메인탭과 서브탭 상태 관리
  const { currentTabId, setCurrentTabId } = useMyInfoNavigation();
  // const [currentTabId, setCurrentTabId] = useState<TabId>(initialTabId);
  const [activeSubTab, setActiveSubTab] = useState<string>(
    TAB_CONFIG[currentTabId]?.[0]?.id || ""
  );

  useEffect(() => {
    // currentTabId가 변경되면 첫 번째 서브탭으로 초기화
    setActiveSubTab(TAB_CONFIG[currentTabId]?.[0]?.id || "");
  }, [currentTabId]);

  // 메인탭 변경 시 호출되는 함수
  const handleTabChange = (tabId: TabId) => {
    setCurrentTabId(tabId);
    // 메인탭 변경 시 해당 탭의 첫 번째 서브탭으로 초기화
    // setActiveSubTab(TAB_CONFIG[tabId][0].id);
  };

  // 서브탭 변경 시 호출되는 함수
  const handleSubTabChange = (subTabId: string) => {
    setActiveSubTab(subTabId);
  };

  // 현재 활성화된 메인탭에 해당하는 서브탭 목록 반환
  const getCurrentSubTabs = () => TAB_CONFIG[currentTabId];

  return {
    currentTabId,
    activeSubTab,
    handleTabChange,
    handleSubTabChange,
    getCurrentSubTabs,
  };
};
