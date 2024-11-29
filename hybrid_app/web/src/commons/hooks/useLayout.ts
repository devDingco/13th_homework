"use client";

import { usePathname } from "next/navigation";

export default function useLayout() {
  const HIDDEN_HEADER = "/place/detail";
  const pathname = usePathname();
  const isHiddenHeader = () => {
    return pathname.includes(HIDDEN_HEADER);
  };

  return isHiddenHeader;
}
