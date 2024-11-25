import React from "react";
import TravelProductMain from "../_components/travelProduct/travelProduct-main";
import styles from "./styles.module.css";

export default function TravelProducts() {
  return (
    <div className={styles.travelProducts__container}>
      <TravelProductMain />
    </div>
  );
}
