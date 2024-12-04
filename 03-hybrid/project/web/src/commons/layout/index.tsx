import { HeaderGlobal } from "./header";
import styles from "./styles.module.css";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className={styles.layout}>
      <HeaderGlobal />
      <>{children}</>
    </div>
  );
}
