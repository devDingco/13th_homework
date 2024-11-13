"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TabId } from "@/components/my-page/subtap-navigation/hook";

interface TabContextProps {
  currentTabId: TabId;
  setCurrentTabId: (tabId: TabId) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTabId, setCurrentTabId] = useState<TabId>(
    "transaction-and-bookmark"
  );

  return (
    <TabContext.Provider value={{ currentTabId, setCurrentTabId }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};
