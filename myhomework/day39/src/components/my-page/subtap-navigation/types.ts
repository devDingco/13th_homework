"use client";

export interface SubTabNavigationProps {
  subTabs?: readonly SubTabItem[];
  activeSubTab: string;
  onSubTabChange?: (subTabId: string) => void;
}

export interface SubTabItem {
  id: string;
  label: string;
}
