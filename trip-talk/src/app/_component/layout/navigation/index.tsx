'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import NavigateLinkItem from './NavigateLinkItem';

export default function NavigationLayout() {
  return (
    <div className="flex grow items-center gap-4 ">
      <NavigateLinkItem path="boards">트립 토크</NavigateLinkItem>
      <NavigateLinkItem path="user">마이 페이지</NavigateLinkItem>
      <NavigateLinkItem path="purchase">숙박권 구매</NavigateLinkItem>
    </div>
  );
}
