import React, { ReactNode } from 'react';
import BoardListBanner from '../_component/layout/banner/BoardListBanner';
import DefaultLayout from '../_component/layout';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultLayout />
      <div className="contents w-screen">
        <BoardListBanner />
      </div>
      <main className={'w-full max-w-[1280px] mx-auto'} id="root">
        {children}
      </main>
    </>
  );
}
