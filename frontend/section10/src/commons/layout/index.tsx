"use client";
import Banner from "./banner";
import Navigation from "./navigation";
import { usePathname } from "next/navigation";

const HIDDEN_BANNER = ["/boards/new"];

interface ILayout {
  children: React.ReactNode;
}
export default function Layout(props: ILayout) {
  const pathname = usePathname();
  console.log("===========");
  console.log(pathname);
  console.log("===========");

  const isHiddenHeader = HIDDEN_BANNER.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="all">
      <div className="nav flex justify-center w-dvw px-10">
        <Navigation />
      </div>
      <div className="main">
        <div className="banner">{!isHiddenHeader && <Banner />}</div>
        <div className="flex justify-center w-dvw px-10">
          {/* <div className={!isHiddenHeader ? "small_children" : "big_children"}> */}
          {props.children}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
