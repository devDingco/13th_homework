import styles from "./layout.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.loginWrap}>
      <div className="flex flex-col gap-6 text-center items-center px-10 max-md:px-5 w-full">
        {children}
      </div>
      <div className={styles.loginBg}></div>
    </div>
  );
}
