"use client";
export default function Box({ children, school }) {
  return (
    <>
      <div>=====박스컨포넌트========</div>
      <div>{school}</div>
      <div>{children}</div>
      <div>=====박스컨포넌트========</div>
    </>
  );
}
