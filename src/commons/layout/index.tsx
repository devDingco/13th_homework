'use client';

import { usePathname } from 'next/navigation';
import LayOutBanner from './banner';
import LayoutNavigation from './navigation';

interface ILayout {
    children: React.ReactNode;
}

const HIDDEN_PAGE = ['/new', '/edit', '/login', '/signup'];

export default function LayOutPage({ children }: ILayout) {
    const pathname = usePathname();

    // some 함수?
    // some 함수는 JavaScript의 배열 메서드 중 하나로,
    // 배열의 요소 중 하나라도 주어진 조건을 만족하는지 확인하는 데 사용됩니다.
    // 이 메서드는 조건을 만족하는 요소가 하나라도 있으면 true를 반환하고,
    // 그렇지 않으면 false를 반환

    // endsWith 함수?
    // endsWith 함수는 JavaScript의 문자열 메서드로,
    // 주어진 문자열이 특정 문자열로 끝나는지를 확인하는 데 사용됩니다.
    // 이 메서드는 대소문자를 구분하며, 조건이 만족되면 true를,
    // 그렇지 않으면 false를 반환
    const isHiddenBanner = HIDDEN_PAGE.some((qqq) => pathname.endsWith(qqq));
    return (
        <>
            {!isHiddenBanner && <LayoutNavigation />}
            {!isHiddenBanner && <LayOutBanner />}
            {children}
        </>
    );
}
