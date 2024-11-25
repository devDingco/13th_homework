import { useState } from "react";

export default function useComment() {
  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);

  const openSubMenu = () => {
    setIsSubMenuOpened(true);
  };

  const closeSubMenu = () => {
    setIsSubMenuOpened(false);
  };

  return {
    isSubMenuOpened,
    openSubMenu,
    closeSubMenu,
  };
}
