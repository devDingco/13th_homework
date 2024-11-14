'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLoadStore } from '../store/load-store';
import { useAccessTokenStore } from '../store/access-store';

// 항상 with로그인체크 이름을 사용하기위해서 export만 사용함
export const with로그인체크 =
    (컴포넌트: () => JSX.Element) =>
    <P extends object>(프롭스: P) => {
        const router = useRouter();
        const { isLoaded } = useLoadStore();
        const { accessToken } = useAccessTokenStore();

        useEffect(() => {
            if (!isLoaded) return; // 엑세스토큰 받아오고 있는과정

            if (accessToken) return;
            alert('로그인 후 이용가능하다구요');
            router.push('/');
        }, [isLoaded]);

        return <컴포넌트 {...프롭스} />; //{...프롭스} = name= {props.name}, age = {props.age}
    };
