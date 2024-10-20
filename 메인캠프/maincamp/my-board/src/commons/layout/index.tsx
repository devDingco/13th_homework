'use client';
import { ReactNode } from 'react';
import BoardBanner from './banner';
import MainNavigation from './navigation';
import { usePathname } from 'next/navigation';

interface ILayoutProps {
  children: ReactNode;
}

const HIDDEN_LAYOUT = ['/openapis'];

export default function LayoutComponent({ children }: ILayoutProps) {
  const pathName = usePathname();
  const hiddenPage = HIDDEN_LAYOUT.includes(pathName);
  return (
    <>
      {!hiddenPage && <MainNavigation />}
      {!hiddenPage && <BoardBanner />}
      {children}
    </>
  );
}
