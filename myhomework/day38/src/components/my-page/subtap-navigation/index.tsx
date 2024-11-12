import React from "react";
import styles from "./styles.module.css";
import { SubTabNavigationProps } from "./types";

export default function SubTabNavigation(props: SubTabNavigationProps) {
  return (
    <div className={styles.tabLayout}>
      <div className={styles.tabContainer}>
        {props.subTabs?.map((subTab) => (
          <button
            key={subTab.id}
            className={`${
              props.activeSubTab === subTab.id
                ? styles.clickedNav
                : styles.unclickedNav
            }`}
            onClick={() => props.onSubTabChange?.(subTab.id)}
          >
            {subTab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
