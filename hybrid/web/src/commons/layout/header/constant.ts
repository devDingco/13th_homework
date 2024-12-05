'use client';

export const HEADER_OPTIONS = (params) => ({
    GLOBAL: {
        '/soloplace-logs/new': {
            hasLogo: false,
            hasBack: true,
            title: '플레이스 등록',
            isTransparent: false,
            isZIndex: false,
        },

        [`/soloplace-logs/${params.solplaceLogId}`]: {
            hasLogo: false,
            hasBack: true,
            title: '테스트',
            isTransparent: true,
            isZIndex: true,
        },
        [`/soloplace-logs/${params.solplaceLogId}/edit`]: {
            hasLogo: false,
            hasBack: true,
            title: '플레이스 수정',
            isTransparent: false,
            isZIndex: true,
        },
    },

    LOCAL: {},
});
