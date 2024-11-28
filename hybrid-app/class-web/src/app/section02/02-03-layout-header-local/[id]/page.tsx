"use client";

import { Header } from "@/commons/layout/02-03-layout-header-local/header";
import { useEffect, useState } from "react";

export default function LayoutHeaderLocalPage() {
  const [title, setTitle] = useState();

  useEffect(() => {
    setTimeout(() => {
      const result = "Hello World!";
      setTitle(result);
    }, 3000);
  }, []);

  return (
    <>
      <div>
        <Header title={title}>
          <button>[북마크]</button>
        </Header>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum hic quo
          blanditiis voluptatum aliquam nobis, quasi, ipsam, veritatis fugit
          quia pariatur temporibus porro cumque illum quos id minima aspernatur
          accusamus.
        </p>
      </div>
    </>
  );
}
