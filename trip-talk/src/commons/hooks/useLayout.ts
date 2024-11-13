import { usePathname } from "next/navigation";

export default function useLayout() {
  const HIDDEN_HEADER = ["/", "/boards/new", "/boards/"];

  const pathname = usePathname();

  const isHiddenHeader = () => {
    if (pathname.length > 30)
      return HIDDEN_HEADER.includes(pathname.slice(0, 8));
    return HIDDEN_HEADER.includes(pathname);
  };

  return isHiddenHeader;
}
