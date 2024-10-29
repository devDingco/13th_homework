'use client';

import { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

export default function LayoutComponent({ children }: ILayoutProps) {
  return (
    <div>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
