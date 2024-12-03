// prettier-ignore
export const HEADER_OPTIONS = (params) =>({
  GLOBAL : {
    '/solplace-logs/new' : {title : '플레이스 등록', hasBack : true, isTransparent : false},

  },
  LOCAL : {
    [`/solplace-logs/${params.id}`] : {title : '', hasBack : true, isTransparent : true},
  }
})
