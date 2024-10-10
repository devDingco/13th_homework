"use client";
import BoardList from "@/components/boards-list/list";
import SwiperComponent from "@/components/boards-list/banner";

const Boards = () => {
  // graphql

  return (
    <>
      <SwiperComponent />
      <BoardList />
    </>
  );
};

export default Boards;
