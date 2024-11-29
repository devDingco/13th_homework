"use client";

import { HEADER_OPTION } from "@/commons/layout/contants";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./styles.module.css";

export interface IHeaderBaseProps {
  hasBack: boolean;
  title: string;
  isTransparent?: boolean;
  children?: React.ReactNode;
}

const HeaderBase = ({
  hasBack,
  title,
  isTransparent,
  children,
}: IHeaderBaseProps) => {
  const router = useRouter();

  return (
    <>
      <header
        className={
          styles.header + (isTransparent ? " " + styles.fixedHeader : "")
        }
      >
        {hasBack && (
          <button type="button" onClick={() => router.back()}>
            <IoIosArrowBack size={24} />
          </button>
        )}
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {children ? children : <></>}
      </header>
      {/* {isTransparent ? <div style={{ height: "3.125rem" }}></div> : <></>} */}
    </>
  );
};

export default function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTION(params).GLOBAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

export function Header({ children, ...rest }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTION(params).LOCAL[pathname];

  console.log("options", options);
  return (
    // <div style={{ display: options ? "block" : "none" }}>
    <HeaderBase {...options} {...rest}>
      {children}
    </HeaderBase>
    // </div>
  );
}
