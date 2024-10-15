"use client";
import React from "react";
import { IListProps } from "./types";

const List = (props: IListProps) => {
  return (
    <div>
      {props.data?.fetchBoards?.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}
    </div>
  );
};

export default List;
