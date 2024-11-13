"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import Header from "./header";
import Banner from "./banner";

// TODO: children type error
export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <div className="w-full flex-col">
      <Header></Header>
      <Banner></Banner>
      <div className="">{children}</div>
      <Footer></Footer>
    </div>
  );
}
