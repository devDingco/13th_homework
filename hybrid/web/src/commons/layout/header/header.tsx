'use client';

import { useParams, usePathname } from 'next/navigation';
import { HEADER_OPTIONS } from './constant';
import Image from 'next/image';
import back from '/public/images/left_arrow.png';

// 1. 베이스헤더 (글로벌헤더 + 로컬헤더)

const HeaderBase = ({
    children,
    hasLogo,
    hasBack,
    title,
    isTransparent,
    isZIndex,
}) => {
    return (
        <>
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100vw',
                    height: '3.125rem',
                    padding: '.75rem 1.25rem',
                    gap: '0.315rem',
                    position: 'fixed', // 1. 투명한 영역 아래에 사진, 지도등이 보이기, 2. 게시글 등록 등 헤더 아래로 스크롤하기
                    zIndex: isZIndex ? '100' : '0', // position으로 쌓임맥락을 형성한 다른 컨텐츠가 있더라도, 위로 올리자
                    backgroundColor: isTransparent ? 'transparent' : '#fff',
                }}
            >
                {hasLogo && <div>로고</div>}
                {hasBack && (
                    <div>
                        <Image src={back} alt="back" />
                    </div>
                )}
                {title ? (
                    <div style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                        {title}
                    </div>
                ) : (
                    <></>
                )}
            </header>
        </>
    );
};

// 2. 글로벌헤더
export function HeaderGlobal({ children, ...rest }) {
    const pathname = usePathname(); // pathname = "section02/02-02-layout-header-global"
    console.log(pathname);
    const params = useParams();
    console.log(params);
    // {title: '게시글등록', hasLogo: false, hasBack:true}
    const options = HEADER_OPTIONS(params).GLOBAL[pathname];

    return (
        <div style={{ display: options ? 'block' : 'none' }}>
            <HeaderBase {...options}>{children}</HeaderBase>
        </div>
    );
}
