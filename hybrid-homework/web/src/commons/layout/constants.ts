// prettier-ignore
export const HEADER_OPTIONS = (params) => ({
  GLOBAL: {
    "/solplace-logs/new": { title: "플레이스 등록", hasLogo: false, hasBack: true, isTransparent: false},
    [`/solplace-logs/${params.solplaceLogId}`]: {hasLog: false, hasBack: true, isTransparent: true}
  },
  LOCAL: {
    [`/solplace-logs/${params.solplaceLogId}`]: {title: "", hasLog: false, hasBack: false}
  }
})
