import Footer from "./footer";
import { HeaderGlobal } from "./header";
import Tabbar from "./tabbar";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div>
      <HeaderGlobal />
      <>{children}</>
      <Footer isFixed={true}>
        <Tabbar />
      </Footer>
    </div>
  );
}
