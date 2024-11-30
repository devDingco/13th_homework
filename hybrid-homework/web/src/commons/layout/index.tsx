import { HeaderGlobal } from "./header";
import styles from "./styles.module.css";

interface ILayout {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayout) {
  return (
    <>
      <HeaderGlobal />
      <div className={styles.mainContainer}>{children}</div>
    </>
  );
}
