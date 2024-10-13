"use client";

import { IBoxProps } from "./types";

export default function Box({
  children,
  school,
}: {
  children: React.ReactNode;
  school: string;
}) {
  return (
    <>
      <div>=====박스컨포넌트========</div>
      <div>{school}</div>
      <div>{children}</div>
      <div>=====박스컨포넌트========</div>
    </>
  );
}
