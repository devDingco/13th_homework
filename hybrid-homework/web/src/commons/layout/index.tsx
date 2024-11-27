import Header from "./header";

interface ILayout {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayout) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
