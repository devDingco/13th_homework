"use client";

import React from "react";
import TravelProductWrite from "@/app/_components/travelProduct/travelProduct-write";
import { useParams } from "next/navigation";

export default function EditTravelProductPage() {
  const params = useParams();
  const id = String(params.travelProductId);

  return <TravelProductWrite isEdit={true} id={id} />;
}
