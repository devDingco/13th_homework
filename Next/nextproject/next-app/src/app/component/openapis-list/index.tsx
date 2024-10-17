"use client";
import React from "react";
import UseOpenAPI from "./hook";
import styles from "./style.module.css";
import { Pagination } from "antd";
export default function APILIST() {
  const { imgUrl } = UseOpenAPI();

  return (
    <div>
      {imgUrl?.map((el: string, index: number) => (
        <div className={styles.css_apiImage} key={index}>
          <div>
            <img src={el} />
            {/* {el} */}
          </div>
        </div>
      ))}
      <div>ddd</div>
      <Pagination
        defaultPageSize={1}
        total={20}
        className={styles.css_pagination}
      ></Pagination>
    </div>
  );
}
