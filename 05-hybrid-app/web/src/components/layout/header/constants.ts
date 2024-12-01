export const HEADER_OPTIONS = (params) => ({
  GLOBAL: {
    "/solplace-logs/new": {
      title: "플레이스 등록",
      hasBack: true, //뒤로가기 있음
      isTransparent: false,
    },
    [`/solplace-logs/${params.solplaceLogId}/edit`]: {
      title: "플레이스 수정",
      hasBack: true,
      isTransparent: false,
    },
    [`/solplace-logs/${params.solplaceLogId}`]: {
      hasBack: true,
      isTransparent: true,
    },
    "/solplace-logs": {
      title: "플레이스",
      hasBack: false,
      isTransparent: false,
    },
  },
  /*   LOCAL: {
    [`/solplace-logs/${params.solplaceLogId}`]: {
      hasBack: true, //뒤로가기 있음
    },
  }, */
});
