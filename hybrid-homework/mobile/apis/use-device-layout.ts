import { useState } from "react";

export const useDeviceLayout = (onResponse) => {
  const [layout, setLayout] = useState({
    isNotchTranslucent: false,
    notchContent: "dark",
    notchBackgroundColor: "white", // 노치 투명하게
  });

  const toggleDeviceLayoutForNotchTranslucentSet = () => {
    setLayout((prev) => ({
      ...prev,
      isNotchTranslucent: !prev.isNotchTranslucent,
    }));

    onResponse({
      toggleDeviceLayoutForNotchTranslucentSet: {
        message: "변경완료",
      },
    });
  };

  const setDeviceLayoutForNotchContentSet = (variables) => {
    setLayout((prev) => ({
      ...prev,
      notchContent: variables.notchContent,
    }));

    onResponse({
      toggleDeviceLayoutForNotchTranslucentSet: {
        message: "변경완료",
      },
    });
  };

  return {
    toggleDeviceLayoutForNotchTranslucentSet,
    setDeviceLayoutForNotchContentSet,
    layout,
  };
};
