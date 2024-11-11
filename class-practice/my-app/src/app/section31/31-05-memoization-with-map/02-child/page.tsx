"use client";

import { memo } from "react";

function Word(props) {
  console.log("자식요소 랜더링 됨", props.el);
  return <span>{props.el}</span>;
}
export default memo(Word);
