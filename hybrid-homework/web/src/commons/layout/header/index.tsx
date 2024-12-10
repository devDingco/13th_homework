"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { HEADER_OPTIONS } from "./constants";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { webviewlog } from "@/commons/libraries/webview-log";
import { useState } from "react";

// 베이스 헤더
const HeaderBase = ({ children, hasExit, hasBack, title, isTransparent }) => {
  const [notch, setNotch] = useState();
  const { fetchApp } = useDeviceSetting();
  const aaa = async () => {
    const result = await fetchApp({
      query: "fetchDeviceSystemForNotchHeightSet",
    });
    const notchTop = result.data.fetchDeviceSystemForNotchHeightSet.notchTop;
    webviewlog(notchTop);
    setNotch(notchTop);
  };
  aaa();

  const router = useRouter();
  const onClicklBack = () => {
    router.back();
  };
  const onClickExit = () => {
    router.back();
  };
  return (
    <>
      <header
        className={styles.header}
        style={{
          backgroundColor: isTransparent ? "transparent" : "white",
          marginTop: notch,
        }}
      >
        {hasExit && (
          <Image
            className={styles.exit}
            onClick={onClickExit}
            src="/assets/closeIcon.svg"
            width={0}
            height={0}
            alt="exit"
          />
        )}
        {hasBack && (
          <Image
            className={styles.back}
            onClick={onClicklBack}
            src="/assets/left_arrow.svg"
            width={0}
            height={0}
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
