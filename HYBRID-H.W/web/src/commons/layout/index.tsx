import { GlobalHeader } from './header';

interface IProps {
  children: React.ReactNode;
}
export default function LayoutComponent({ children }: IProps) {
  return (
    <>
      <GlobalHeader />
      {children}
    </>
  );
}
