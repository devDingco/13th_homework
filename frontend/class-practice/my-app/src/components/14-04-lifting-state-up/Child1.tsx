"use client";
import React from "react";

const Child1 = (props) => {
  const onClickCountUP = () => {
    props.카운트바꿔주는함수(props.카운트변수 + 1);
  };
  return (
    <div>
      <div>자식1의 카운트: {props.카운트변수}</div>
      <button onClick={onClickCountUP}>카운트 올리기</button> <br />
    </div>
  );
};

export default Child1;
