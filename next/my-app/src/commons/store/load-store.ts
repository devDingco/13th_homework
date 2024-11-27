'use client';

import { create } from 'zustand';

export const useLoadStore = create((set) => {
    return {
        isLoaded: false, // 처음엔 로드가 안되있을테니까
        setIsLoaded: () =>
            set(() => ({
                // return과 중괄호 사이에 아무것도 없으니 소괄호
                isLoaded: true,
            })),
    };
});
