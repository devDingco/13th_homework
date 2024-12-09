'use client';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { HEADER_OPTIONS } from './constants';
import { IBaseHeader } from './types';

const HeaderBase = ({
  title,
  hasBack,
  children,
  isTransparent,
}: IBaseHeader) => {
  return (
    <>
      <header
        className="flex gap-2 p-4 m-6 w-lvw h-12 fixed z-10 "
        style={{ backgroundColor: isTransparent ? 'transparent' : 'white' }}
      >
        {hasBack && (
          <button type="button">
            <Image
              src="/icons/left-icon.png"
              alt="왼쪽화살표"
              width={24}
              height={24}
            />
          </button>
        )}
        {title && <h3>{title}</h3>}
        {children ? <>{children}</> : <></>}
      </header>
      {/* {isTransparent ? <></> : <div style={{ height: '3rem' }}></div>} */}
    </>
  );
};

export function GlobalHeader() {
  const params = useParams();
  const pathname = usePathname();

  console.log('globak에서 params', params);
  console.log('global pathname', pathname);

  const options = HEADER_OPTIONS(params).GLOBAL[pathname];
  return (
    <header style={{ display: options ? 'block' : 'none' }}>
      <HeaderBase {...options} />
    </header>
  );
}

export function LocalHeader({
  children,
  ...rest
}: {
  [x: string]: any;
  children?: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();

  console.log('HEADER_OPTIONS LOCAL:', HEADER_OPTIONS(params).LOCAL);
  console.log(
    'HEADER_OPTIONS LOCAL[pathname]:',
    HEADER_OPTIONS(params).LOCAL[pathname]
  );

  const options = HEADER_OPTIONS(params).LOCAL[pathname];
  return (
    <header style={{ display: options ? 'block' : 'none' }}>
      <HeaderBase {...rest} {...options}>
        {children || null}
      </HeaderBase>
    </header>
  );
}
