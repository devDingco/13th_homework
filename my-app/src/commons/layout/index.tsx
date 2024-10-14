"use client";
import LayoutBanner from "./banner";
import LayoutNavigation from "./navigation";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <LayoutNavigation />
      <LayoutBanner />
      <div>{children}</div>
    </>
  );
}
