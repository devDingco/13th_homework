import React from "react";
import ListBanner from "./_components/ListBanner";
import ListForm from "./_components/ListForm";

export default function BoardsList() {
  return (
    <div className="flex-col items-center">
      <ListBanner />
      <ListForm />
    </div>
  );
}
