"use client";

import Image from "next/image";
import left_arrow from "../../../../public/images/icons/left_arrow.svg";
import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./constants";

interface IHeaderBaseProps {
  children?: React.ReactNode;
  hasBack: boolean;
  title: string;
  isTransparent: boolean;
}

// 베이스 헤더
const HeaderBase = ({
  children,
  hasBack,
  title,
  isTransparent,
}: IHeaderBaseProps) => {
  return (
    <>
      <header
        className={`flex px-20 py-12 w-screen h-48 fixed z-50 ${
          isTransparent ? "bg-transparent" : "bg-white"
        }`}
      >
        <div className="flex gap-8 justify-start">
          {hasBack && <Image src={left_arrow} alt="뒤로가기" />}
          {title ? (
            <span className="text-black text-lg font-bold leading-normal">
              {title}
            </span>
          ) : (
            <></>
          )}
          {children ? <>{children}</> : <></>}
        </div>
      </header>
      {isTransparent ? <></> : <div className="h-48"></div>}
    </>
  );
};

// 글로벌 헤드
export function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).GLOBAL[pathname];
  return (
    <div className={options ? "block" : "hidden"}>
      <HeaderBase {...options} />
    </div>
  );
}

// 로컬 헤드
export function HeaderLocal({ children, ...rest }) {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).GLOBAL[pathname];
  return (
    <div className={options ? "block" : "hidden"}>
      <HeaderBase {...options} {...rest}>
        {children}
      </HeaderBase>
    </div>
  );
}
