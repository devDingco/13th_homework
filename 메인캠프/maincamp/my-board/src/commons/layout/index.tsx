import { ReactNode } from 'react';
import BoardBanner from './banner';
import MainNavigation from './navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function LayoutComponent({ children }: ILayoutProps) {
  return (
    <>
      <MainNavigation />
      <BoardBanner />
      {children}
    </>
  );
}
