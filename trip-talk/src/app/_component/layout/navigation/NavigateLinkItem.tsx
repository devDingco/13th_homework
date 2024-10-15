'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigateLinkItemPropsType {
  path: string;
  children: string;
}
export default function NavigateLinkItem({
  path,
  children,
}: NavigateLinkItemPropsType) {
  const routePath = usePathname();

  return (
    <Link
      href={`/${path}`}
      className={`${
        routePath.startsWith(`/${path}`) && 'font-bold text-[18px] border-b-2'
      }`}>
      {children}
    </Link>
  );
}
