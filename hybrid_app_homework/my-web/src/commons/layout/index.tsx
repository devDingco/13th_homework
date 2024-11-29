import HeaderGlobal from "./header";

interface IChildrenType {
  children: React.ReactNode;
}

export default function Layout({ children }: IChildrenType) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <HeaderGlobal />
      {children}
    </div>
  );
}
