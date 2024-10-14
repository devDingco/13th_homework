"use client";
import React from "react";

const List = (props) => {
  return (
    <div>
      {props.data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}
    </div>
  );
};

export default List;
