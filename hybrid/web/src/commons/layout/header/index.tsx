'use client';
import { HeaderGlobal, HeaderLocal } from './header';

// 글로벌헤더 + 로컬헤더 + 투명포함
export default function Layout({ children }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                minHeight: '100vh',
            }}
        >
            <HeaderGlobal />
            <div>{children}</div>
        </div>
    );
}
