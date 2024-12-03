import HeaderGlobal from "./header";

export default function Layout({ children }) {
  return (
    <>
      <HeaderGlobal />
      <>{children}</>
    </>
  );
}
