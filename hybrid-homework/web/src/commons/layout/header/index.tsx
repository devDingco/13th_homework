"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { HEADER_OPTIONS } from "./constants";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { webviewlog } from "@/commons/libraries/webview-log";
import { useState } from "react";
import { useLoading } from "@/commons/stores/loading-store";

// 베이스 헤더
const HeaderBase = ({ children, hasExit, hasBack, title, isTransparent }) => {
  // const [notchTopSize, setNotchTopSize] = useState();
  const { fetchApp } = useDeviceSetting();

  // 노치 크기 받아오는 api -> 웹 실행 시 최초 1번만 실행하게 해야함...
  // const aaa = async () => {
  //   const result = await fetchApp({
  //     query: "fetchDeviceSystemForNotchHeightSet",
  //   });
  //   const notchTopSize =
  //     result.data.fetchDeviceSystemForNotchHeightSet.notchTopSize;
  //   webviewlog(notchTopSize);
  //   setNotchTopSize(notchTopSize);
  // };
  // aaa();

  const router = useRouter();

  const onClicklBack = () => {
    router.back();
  };
  const onClickExit = async () => {
    router.back();
    await fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" });
  };
  const isLoading = useLoading((state) => state.isLoading);
  if (isLoading) return <></>;
  return (
    <>
      <header
        className={styles.header}
        style={{
          backgroundColor: isTransparent ? "transparent" : "white",
          // marginTop: notchTopSize,
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
