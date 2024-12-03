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
            title: '',
            isTransparent: true,
            isZIndex: true,
        },

        // 아래에 추가히가
        // ...
    },

    LOCAL: {},
});
