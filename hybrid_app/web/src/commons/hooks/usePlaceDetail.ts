"use client";

import { useState } from "react";

export default function usePlaceDetail() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleOpenMap = () => {
    return setIsMapOpen((prev) => !prev);
  };

  return { handleOpenMap, isMapOpen };
}
