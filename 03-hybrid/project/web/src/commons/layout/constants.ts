export const HEADER_OPTIONS = (id?: string) => ({
  GLOBAL: {
    "/solplace-logs": {
      title: "플레이스",
      hasBack: false,
      isTransparent: false,
    },
    "/solplace-logs/new": {
      title: "플레이스 등록",
      hasBack: true,
      isTransparent: false,
    },
    [`/solplace-logs/${id}/edit`]: {
      title: "플레이스 수정",
      hasBack: true,
      isTransparent: false,
    },
  },
  LOCAL: {
    [`/solplace-logs/${id}`]: {
      title: "",
      hasBack: true,
      isTransparent: true,
    },
  },
});
