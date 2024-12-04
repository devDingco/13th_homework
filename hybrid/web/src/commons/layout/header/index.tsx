'use client';
import { HeaderGlobal, HeaderLocal } from './header';

// 글로벌헤더 + 로컬헤더 + 투명포함
export default function LayoutTransparent({ children }) {
    return (
        <>
            <HeaderGlobal />
            <div>{children}</div>
        </>
    );
}
