"use client";

import React, { useEffect } from "react";

import PlanList from "../_components/myapis/myapis-list";
import usePlanPage from "./hook";

export default function MyPlanPage() {
  const { getPlan, plans } = usePlanPage();

  useEffect(() => {
    getPlan();
  }, []);

  return <PlanList data={plans} />;
}
