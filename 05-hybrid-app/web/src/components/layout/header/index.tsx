import { HeaderGlobal } from "./header";

export default function Layout({ children }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <HeaderGlobal />
      <>{children}</>
    </div>
  );
}
