"use client";

import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { DocumentData } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MyPlanDetailPage() {
  const params = useParams();
  const [plan, setPlan] = useState<DocumentData>({});

  const { fetchDocument } = FirebaseAPI();

  const getPlan = async () => {
    const result = await fetchDocument(
      CollectionList.plan,
      String(params.myapisid)
    );
    console.log(result);
    setPlan(result ?? {});
  };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div>
      MyPlanDetailPage
      <div>
        <div>일정명: {plan.title}</div>
        <div>출발일: {plan.startDate}</div>
        <div>도착일: {plan.endDate}</div>
        <div>출발지: {plan.departureLocation}</div>
        <div>목적지: {plan.destination}</div>
        <div>동행자: {plan.companions}</div>
        <div>타임라인: {plan.timeline}</div>
      </div>
    </div>
  );
}
