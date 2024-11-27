"use client";
import React from "react";

const Child2 = (props) => {
  return (
    <div>
      <div>자식2의 카운트: {props.카운트변수}</div>
      <button onClick={props.카운트올리는기능}>카운트 올리기</button> <br />
    </div>
  );
};

export default Child2;
