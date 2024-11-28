import { HeaderGlobal } from "./header";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div>
      <HeaderGlobal />
      <div>{children}</div>
    </div>
  );
}
