// prettier-ignore
export const HEADER_OPTIONS = (params) => ({
  GLOBAL: {
    "/solplace-logs": {title: "플레이스", hasLogo: false, hasBack: false, isTransparent: false},
    "/solplace-logs/new": { title: "플레이스 등록", hasLogo: false, hasBack: true, isTransparent: false },
    "/solplace-logs/new/map": {hasLogo: false, hasBack: true, isTransparent: true},
    [`/solplace-logs/${params.solplaceLogId}`]: {hasLog: false, hasBack: true, isTransparent: true },
    [`/solplace-logs/${params.solplaceLogId}/edit`]: { title: "플레이스 수정", hasLogo: false, hasBack: true, isTransparent: false },
    [`/solplace-logs/${params.solplaceLogId}/edit/map`]: { hasLogo: false, hasBack: true, isTransparent: true},
  },
  LOCAL: {}
})
