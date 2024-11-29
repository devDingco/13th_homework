"use client";

import { useParams, usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "../constants";
import styles from "./styles.module.css";
import Icon from "@/components/icon";

interface IHeaderBaseProps {
  title: string;
  hasBack: boolean;
  children?: React.ReactNode;
  isTransparent?: boolean;
}

export const HeaderBase = ({
  title,
  hasBack,
  children,
  isTransparent,
}: IHeaderBaseProps) => {
  return (
    <>
      <header
        className={styles.header}
        style={{ backgroundColor: isTransparent ? "transparent" : "white" }}
      >
        {hasBack && <Icon src="left_arrow.svg" />}
        {title ? <p>{title}</p> : <></>}
        {children ? <>{children}</> : <></>}
      </header>
      {isTransparent ? <></> : <div style={{ height: "3rem" }}></div>}
    </>
  );
};

export function HeaderGlobal() {
  const pathname = usePathname();
  const { solplaceLogId } = useParams();

  const options = HEADER_OPTIONS(String(solplaceLogId)).GLOBAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} />
    </div>
  );
}

type IHeaderProps = Pick<IHeaderBaseProps, "children">;

export function Header({ children, ...rest }: IHeaderProps) {
  const pathname = usePathname();
  const { solplaceLogId } = useParams();
  const options = HEADER_OPTIONS(String(solplaceLogId)).LOCAL[pathname];

  return (
    <div style={{ display: options ? "block" : "none" }}>
      <HeaderBase {...options} {...rest}>
        {children}
      </HeaderBase>
    </div>
  );
}
