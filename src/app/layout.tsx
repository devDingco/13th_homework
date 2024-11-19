import type { Metadata } from 'next';

import './globals.css';
import LayOutPage from '../commons/layout/index';
import ApolloUploadSetting from '../commons/settings/apollo-setting';
import ApolloHeaderAndErrorSettingRefresh from '../commons/settings/apollo-header-and-error-setting-refresh';

export const metadata: Metadata = {
    title: '여행 플랫폼',
    description: '일단 여행 플랫폼 구현해보자',
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                {/* <ApolloUploadSetting> */}
                <ApolloHeaderAndErrorSettingRefresh>
                    <LayOutPage>{props.children}</LayOutPage>
                </ApolloHeaderAndErrorSettingRefresh>
                {/* </ApolloUploadSetting> */}
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
