'use client';

import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    InMemoryCache,
    fromPromise,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useEffect } from 'react';
import { onError } from '@apollo/client/link/error';
import { useLoadStore } from '../store/load-store';
import { getAccessToken } from '../libraries/get-access-token';
import { useAccessTokenStore } from '../store/access-store';

const 나의영원한캐시 = new InMemoryCache();

interface IApolloSetting {
    children: React.ReactNode;
}
export default function ApolloHeaderAndErrorSettingRefresh(
    props: IApolloSetting
) {
    const { accessToken, setAccessToken } = useAccessTokenStore(); // zustand: 글로벌스테이트라 따로 명시하지 않아도 불러올 수 있음
    const { isLoaded, setIsLoaded } = useLoadStore();

    useEffect(() => {
        getAccessToken()
            .then((newAccessToken) => {
                if (newAccessToken) setAccessToken(newAccessToken); // 신선한 액세스토큰을 setAccessToken의 집어넣는다
                setIsLoaded();
            })
            .finally(() => setIsLoaded()); // === .finally(setIsLoaded); // 실패해도 로드는 끝나는거임
    }, []);

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
        // 1. 에러를 캐치
        if (typeof graphQLErrors !== 'undefined') {
            for (const err of graphQLErrors) {
                // graphQlErrors있는거 하나하나씩 뽑아서 반복한다
                // 1-2. 해당 에러가 토큰만료 에러인지 체크
                if (err.extensions?.code === 'UNAUTHENTICATED') {
                    // 2. refreshToken으로 accessToken 재발급 받기
                    return fromPromise(
                        getAccessToken().then((newAccessToken) => {
                            // 3. 재발급 받은 accessToken을 저장하고, 방금 실패한 쿼리의 정보 수정하고 재시도하기
                            setAccessToken(newAccessToken);
                            operation.setContext({
                                header: {
                                    ...operation.getContext().headers, // Authoriztion: Bearer 만료된 토큰
                                    Authorization: `Bearer ${newAccessToken} `, // 3-2. 토큰만 새걸로 바꿔치기
                                },
                            });
                        })
                    ).flatMap(() => forward(operation)); // 3-3. 바꿔치기된 API 재전송하기
                }
            }
        }
    });

    const upLoadLink = createUploadLink({
        uri: 'https://main-practice.codebootcamp.co.kr/graphql',
        headers: {
            Authorization: `Bearer ${accessToken} `, // 새로고침하면 초기화됨 ㅜㅜ
        },
        credentials: 'include', // 이 항목이 있어야 브라우저와 서버간에 쿠키를 주고받을 수 있다
    });

    const client = new ApolloClient({
        link: ApolloLink.from([errorLink, upLoadLink]),
        // cache: new InMemoryCache(), // => accessToken이 변경돼서 리렌더될 때 새로만들어짐
        cache: 나의영원한캐시, // => 컴포넌트는 새로 만들어져도, globalState는 유지됨
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
