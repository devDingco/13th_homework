import { useState } from 'react';

export function useYoutube() {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    // 비디오 선택 시 호출되는 함수
    const handleVideoSelect = (videoId: string) => {
        setSelectedVideoId(videoId);
    };

    return {
        selectedVideoId,
        handleVideoSelect,
    };
}
