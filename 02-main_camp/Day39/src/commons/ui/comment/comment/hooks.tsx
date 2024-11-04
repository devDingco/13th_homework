import { useState } from "react";

export default function useComment() {
  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);
  return {
    isSubMenuOpened,
    setIsSubMenuOpened,
  };
}
