export const HEADER_OPTIONS = (id?: string) => ({
  GLOBAL: {
    "/solplace-logs/new": {
      title: "플레이스 등록",
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
