"use client";

import React, { MouseEvent, useState } from "react";
import MyPageNavigation from "../navigation";
import List from "../list";
import {
  all,
  chargeHistory,
  navigationItems,
  purchaseHistory,
  salesHistory,
  sampleAllItems,
  sampleChargeHistoryItems,
  samplePurchaseHistoryItems,
  sampleSalesHistoryItems,
} from "./sample";

export default function PointsUsageHistory() {
  const [selectedNaviItem, setSelectedNaviItem] = useState(0);

  const onChangeNavigationItem = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget?.id;
    setSelectedNaviItem(Number(id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <MyPageNavigation
        items={navigationItems}
        selectedItem={selectedNaviItem}
        onChangeItem={onChangeNavigationItem}
      ></MyPageNavigation>
      {selectedNaviItem === 0 && (
        <List columns={all} items={sampleAllItems} mainColumns={2}></List>
      )}
      {selectedNaviItem === 1 && (
        <List
          columns={chargeHistory}
          items={sampleChargeHistoryItems}
          mainColumns={1}
        ></List>
      )}
      {selectedNaviItem === 2 && (
        <List
          columns={purchaseHistory}
          items={samplePurchaseHistoryItems}
          mainColumns={1}
        ></List>
      )}
      {selectedNaviItem === 3 && (
        <List
          columns={salesHistory}
          items={sampleSalesHistoryItems}
          mainColumns={1}
        ></List>
      )}
    </div>
  );
}
