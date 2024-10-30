"use client";
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import ChatBot from "./ChatBot";

interface ILayout {
  children: React.ReactNode;
}

const HIDDEN_LAYOUT = ["/login", "/signup", "/"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  const isHiddenLayout = HIDDEN_LAYOUT.includes(pathname);

  return (
    <div className="flex h-full bg-gray-50">
      {!isHiddenLayout && <SideBar />}
      <div className={`flex-1 ${!isHiddenLayout ? "ml-64" : ""}`}>
        {!isHiddenLayout && <TopBar />}
        <main className={!isHiddenLayout ? "pt-16" : ""}>{children}</main>
        {!isHiddenLayout && <ChatBot />}
      </div>
    </div>
  );
}
