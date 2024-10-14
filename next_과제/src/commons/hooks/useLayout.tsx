"use client";
import { usePathname } from "next/navigation";

const HEADER_HIDE_PATHS = ["/login", "/join"];

export const useLayout = () => {
  const pathName = usePathname();
  const isHeaderHide = HEADER_HIDE_PATHS.includes(pathName);
  return { isHeaderHide };
};
