"use client";

import MyPlanWrite from "@/app/_components/myapis/myapis-write";
import React, { useEffect } from "react";
import useMyPlanWrite from "../../useMyPlanWrite";

export default function MyPlanEditPage() {
  const { getPlan, plan } = useMyPlanWrite();

  useEffect(() => {
    (async () => {
      await getPlan();
    })();
  }, []);

  return (
    <div>
      <MyPlanWrite isEdit={true} data={plan} />
    </div>
  );
}
