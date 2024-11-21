"use client";

import React from "react";
import { SubTabNavigationProps } from "../subtap-navigation/types";
import AllPointList from "./all";
import ChargedPointList from "./charged";
import PurchaseDetailsList from "./purchase-details";
import SalesDetailsList from "./sales-details";

export default function PointList({ activeSubTab }: SubTabNavigationProps) {
  const renderContent = () => {
    switch (activeSubTab) {
      case "all":
        return <AllPointList />;
      case "charged":
        return <ChargedPointList />;
      case "purchaseDetails":
        return <PurchaseDetailsList />;
      case "salesDetails":
        return <SalesDetailsList />;
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
}
