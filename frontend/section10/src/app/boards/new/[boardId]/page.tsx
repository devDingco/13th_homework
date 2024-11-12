import React from "react";
import NewForm from "../_components/NewForm";
import "../styles.css";

export default function BoardsNew() {
  return (
    <div className="px-4 w-full max-w-[1280px] mx-auto">
      <NewForm isEdit={true} />
    </div>
  );
}
