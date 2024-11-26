import { ReactNode } from "react";
import LayoutHeader from "../header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <LayoutHeader />
      {children}
    </div>
  );
}
