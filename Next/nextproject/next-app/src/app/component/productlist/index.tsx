"use client";

import UseProductListPage from "./hook";
import React from "react";
import PListItem from "./p.listitem";
// import styles from "./style.module.css";
export default function ProductListPage() {
  const { data } = UseProductListPage();

  return (
    <>
      {data?.fetchTravelproducts ? (
        data.fetchTravelproducts.map((el, index) => (
          <PListItem el={el} key={el._id} index={index} />
        ))
      ) : (
        <div>없습니다.</div>
      )}
    </>
  );
}
