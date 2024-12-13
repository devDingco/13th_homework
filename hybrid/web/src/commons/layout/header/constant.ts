'use client';

export const HEADER_OPTIONS = (params) => ({
    GLOBAL: {
        '/solplace-logs': {
            hasLogo: false,
            hasBack: true,
            title: '플레이스',
            isTransparent: false,
            isZIndex: false,
        },
        '/solplace-logs/new': {
            hasLogo: false,
            hasBack: true,
            title: '플레이스 등록',
            isTransparent: false,
            isZIndex: false,
        },
        '/solplace-logs/new/map': {
            hasLogo: false,
            hasBack: true,
            title: '',
            isTransparent: true,
            isZIndex: true,
        },

        [`/solplace-logs/${params.solplaceLogId}`]: {
            hasLogo: false,
            hasBack: true,
            title: '테스트',
            isTransparent: true,
            isZIndex: true,
        },
        [`/solplace-logs/${params.solplaceLogId}/edit`]: {
            hasLogo: false,
            hasBack: true,
            title: '플레이스 수정',
            isTransparent: false,
            isZIndex: true,
        },
        [`/solplace-logs/${params.solplaceLogId}/edit/map`]: {
            hasLogo: false,
            hasBack: true,
            title: '',
            isTransparent: true,
            isZIndex: true,
        },
    },

    LOCAL: {},
});
