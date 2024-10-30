"use client";

import { withLoginCheck } from "../../component/_commons/hocs/withLoginCheck";
import styles from "./style.module.css";
import React from "react";
import UseProductDetail from "./hook";
export default withLoginCheck(function ProductDeatil() {
  const { data, onClickUpdate } = UseProductDetail();
  console.log(data?.fetchTravelproduct?.price);
  return (
    <>
      <div className={styles.css_detaillayout}>
        <div className={styles.css_detailbox}>
          <div className={styles.css_productname}>
            {data?.fetchTravelproduct?.name}
          </div>
          <div className={styles.css_productname}>
            {data?.fetchTravelproduct.contents}
          </div>
          <div className={styles.css_productname}>
            {data?.fetchTravelproduct?.price}
          </div>
          <div className={styles.css_productname}>
            {data?.fetchTravelproduct?.remarks}
          </div>
          <div className={styles.css_productname}>
            {data?.fetchTravelproduct?.travelproductAddress.zipcode}
          </div>
          <button onClick={onClickUpdate}>수정하기</button>
        </div>
      </div>
    </>
  );
});
