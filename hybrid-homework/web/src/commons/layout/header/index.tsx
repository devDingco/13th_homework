"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "../constants";

// 베이스 헤더
const HeaderBase = ({ children, hasBack, title, isTransparent }) => {
  const onClicklBack = () => {
    history.back();
  };
  return (
    <>
      <header
        className={styles.header}
        style={{ backgroundColor: isTransparent ? "transparent" : "white" }}
      >
        {hasBack && (
          <Image
            onClick={onClicklBack}
            src="/assets/left_arrow.svg"
            width={24}
            height={24}
            alt="leftArrow"
          />
        )}
        {title ? <div className={styles.title}>{title}</div> : <></>}
        {children ? <>{children}</> : <></>}
      </header>
      {isTransparent ? <></> : <div style={{ height: "3rem" }}></div>}
    </>
  );
};

// 글로벌 헤더

export function HeaderGlobal() {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).GLOBAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

// 로컬 헤더

export function Header({ children, ...rest }) {
  const pathname = usePathname();
  const params = useParams();
  const options = HEADER_OPTIONS(params).LOCAL[pathname];
  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} {...rest}>
        {children}
      </HeaderBase>
    </div>
  );
}
