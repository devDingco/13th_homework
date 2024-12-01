import Divider from "@/commons/components/Divider/page";
import { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex-1"></div>
      <div className="fixed bottom-0">
        <Divider />
        <footer className="h-[4rem] w-screen flex pt-1">{children}</footer>
      </div>
    </div>
  );
}
