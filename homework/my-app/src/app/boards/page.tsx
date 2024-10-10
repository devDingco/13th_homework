"use client";

import "react-datepicker/dist/react-datepicker.css";
import BoardList from "@/components/boards-list/list";
import BannerPage from "@/components/boards-list/banner";

const Page = () => {
  return (
    <>
      <BannerPage />
      <BoardList />
    </>
  );
};

export default Page;
