"use client";

import Footer from "@/commons/layout/02-05-layout-footer-contents-short-and-long/footer";
import { Fragment, useState } from "react";

export default function LayoutFooterContentsShortAndLongPage() {
  const [isLongContents, setIsLongContents] = useState(false);

  const handleToggleContents = () => {
    setIsLongContents((prev) => !prev);
  };

  return (
    <>
      <div className="flex gap-2">
        제목 :
        <input type="text" name="title" />
      </div>
      <div className="flex gap-2">
        내용 :
        <input type="text" name="title" />
      </div>
      <div className="flex gap-2">
        작성자 :
        <input type="text" name="title" />
      </div>

      {isLongContents &&
        new Array(20).fill(1).map((_, index) => (
          <Fragment key={index}>
            <div className="flex gap-2">
              제목 :
              <input type="text" name="title" />
            </div>
            <div className="flex gap-2">
              내용 :
              <input type="text" name="title" />
            </div>
            <div className="flex gap-2">
              작성자 :
              <input type="text" name="title" />
            </div>
          </Fragment>
        ))}

      <Footer>
        <button
          onClick={handleToggleContents}
          className="bg-black rounded-lg text-white p-3"
        >
          [숏컨텐츠 / 롱컨텐츠 (토글)]
        </button>
      </Footer>
    </>
  );
}
