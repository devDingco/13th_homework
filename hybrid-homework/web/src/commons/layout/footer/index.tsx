import styles from "./styles.module.css";

export function Footer({ children }) {
  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className={styles.footer}>{children}</footer>
    </>
  );
}
