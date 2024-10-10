'use client';

import { IBoardsRatingProps } from '@/app/types/IBoardsRatingProps';
import { useUserContext } from '@/contexts/UserContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const saveUserRating = (
    userId: string,
    boardId: string,
    rating: string | number
) => {
    localStorage.setItem(`${userId}-${boardId}`, String(rating));
};

const checkUserRating = (userId: string, boardId: string) => {
    return localStorage.getItem(`${userId}-${boardId}`);
};

const labels: { [index: number]: string } = {
    0.5: '헉!',
    1: '지송합니다',
    1.5: '노력하겠습니다',
    2: '이럴수가',
    2.5: '반띵했어요',
    3: '옴마마 ~',
    3.5: '얼쑤 ~~',
    4: '드이어',
    4.5: '고지가 앞이네요',
    5: '우리는 할수있다',
};

// ${value !== 1 ? 's' : ''},

const getLabelText = (value: number) => {
    return ` ${labels[value]}`;
};

export default function useBoardRating({ boardId }: IBoardsRatingProps) {
    const { userId } = useUserContext();

    const [rating, setRating] = useState<number | null>(null);
    const [isRated, setIsRated] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hover, setHover] = useState<number>(-1);

    // 사용자가 이 board에 이미 별점을 남겼는지 확인하는 로직
    useEffect(() => {
        if (!userId) return;
        const userRating = checkUserRating(userId, boardId);
        if (userRating) {
            setRating(Number(userRating));
            setIsRated(true);
        }
    }, [userId, boardId]);

    // 별점을 남기면 상태를 업데이트하고 서버나 로컬 스토리지에 저장
    const handleRatingChange = (
        event: React.SyntheticEvent,
        newValue: number | null
    ) => {
        if (newValue !== null && userId) {
            setRating(newValue);
            setIsRated(true);
            setShowTooltip(true);

            setTimeout(() => {
                setShowTooltip(false);
            }, 2000);

            saveUserRating(userId, boardId, newValue || 0);
        }
    };
    const handleHoverChange = (
        event: React.SyntheticEvent,
        newValue: number | null
    ) => {
        setHover(newValue || 0);
    };

    return {
        boardId,
        userId,
        rating,
        isRated,
        showTooltip,
        hover,
        setHover,
        getLabelText,
        handleRatingChange,
        handleHoverChange,
    };
}
