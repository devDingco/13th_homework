import type { Metadata } from 'next';

import './globals.css';
import ApolloSetting from '../commons/settings/apollo-setting';
import LayOutPage from '../commons/layout/index';

export const metadata: Metadata = {
    title: '축구하자',
    description: '서울 경기 축구 예약 플랫폼',
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <ApolloSetting>
                    <LayOutPage>{props.children}</LayOutPage>
                </ApolloSetting>
            </body>
        </html>
    );
}

// [Next 실행 순서]

// 1. 주소창에 주소 입력
//   => http://localhost:3000/

// 2. 입력된 주소의 폴더안의 pages.tsx 찾기
//   => app/page.tsx
//       (ex, 주소:  /mypage 라면? app/mypage/pages.tsx 찾기)

// 3. 해당 페이지컴포넌트를 통째로 props에 넣어서 실행하기

/* <RootLayout children={페이지컴포넌트} /> */
