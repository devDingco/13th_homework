import HeaderGlobal from "./header";

interface IChildrenType {
  children: React.ReactNode;
}

export default function Layout({ children }: IChildrenType) {
  return (
    <>
      <HeaderGlobal />
      {children}
    </>
  );
}
