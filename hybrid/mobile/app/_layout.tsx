import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function RootLayout() {
    const [isLoaded, setIsLoded] = useState(false);

    useEffect(() => {
        setIsLoded(true);
    }, []);

    if (!isLoaded) return <></>;

    return (
        <Stack>
            {/* 모바일 메인 페이지에서 웹뷰만들고, 나머지페이지들은 웹에서 처리하기 */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* 모바일에서 다른 페이지를 만들어야 한다면? 아래에 추가하기 */}
            {/* <Stack.Screen name="프로필페이지" />
            <Stack.Screen name="결제페이지" />
            <Stack.Screen name="게시글 등록 페-이지" /> */}
        </Stack>
    );
}
