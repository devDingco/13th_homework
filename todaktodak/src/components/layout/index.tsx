"use client";
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import ChatBot from "./ChatBot";

interface ILayout {
  children: React.ReactNode;
}

const HIDDEN_LAYOUT = [
  "/diary/new",
  "/diary/edit/",
  "/auth/login",
  "/auth/signup",
];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  const isHiddenLayout = HIDDEN_LAYOUT.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {!isHiddenLayout && <SideBar />}
      <div className={`flex-1 ${!isHiddenLayout ? "ml-64" : ""}`}>
        {!isHiddenLayout && <TopBar />}
        <main className={!isHiddenLayout ? "pt-16" : ""}>{children}</main>
        {!isHiddenLayout && <ChatBot />}
      </div>
    </div>
  );
}
