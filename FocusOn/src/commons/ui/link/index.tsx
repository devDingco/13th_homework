import Link from "next/link";
import styles from "./styles.module.css";

// 1. 버튼뼈대 만들기
function LinkBase(props) {
  return (
    <Link className={props.className} href={props.href}>
      {props.children}
    </Link>
  );
}

export function LinkCancel(props) {
  return <LinkBase className={styles.link__cancel} {...props} />;
}
