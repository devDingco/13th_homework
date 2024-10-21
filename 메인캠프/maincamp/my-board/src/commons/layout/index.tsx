'use client';
import { ReactNode } from 'react';
import BoardBanner from './banner';
import MainNavigation from './navigation';
import { useParams, usePathname } from 'next/navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function LayoutComponent({ children }: ILayoutProps) {
  const pathName = usePathname();
  const { apiId } = useParams();
  const HIDDEN_LAYOUT = ['/openapis', `/openapis/${apiId}`];
  const hiddenPage = HIDDEN_LAYOUT.includes(pathName);

  return (
    <>
      {!hiddenPage && <MainNavigation />}
      {!hiddenPage && <BoardBanner />}
      {children}
    </>
  );
}
