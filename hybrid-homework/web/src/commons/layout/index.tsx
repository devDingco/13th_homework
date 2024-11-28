import { HeaderGlobal } from "./header";

interface ILayout {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayout) {
  return (
    <>
      <HeaderGlobal />
      <div>{children}</div>
    </>
  );
}
