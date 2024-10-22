"use client";

import React, { useEffect } from "react";

import PlanList from "../_components/myapis/myapis-list";
import usePlanPage from "./hook";

export default function MyPlanListPage() {
  const { planList, getPlanList } = usePlanPage();

  useEffect(() => {
    getPlanList();
  }, []);

  return <PlanList data={planList} />;
}
