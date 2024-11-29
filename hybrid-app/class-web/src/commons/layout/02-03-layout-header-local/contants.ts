export interface IHeaderOption {
  GLOBAL: {
    [key: string]: {
      title: string;
      hasLogo: boolean;
      hasBack: boolean;
    };
  };
  LOCAL: {
    [key: string]: {
      title: string;
      hasLogo: boolean;
      hasBack: boolean;
    };
  };
}

// prettier-ignore
export const HEADER_OPTIONS = (params:{ id:string }) => ({
  GLOBAL: {
    "/section02/02-02-layout-header-global": {title: "게시글 등록",hasLogo: false, hasBack: true },
    // 위와 같은 양식으로 추가하기
  },
  LOCAL: {
    [`/section02/02-03-layout-header-local/${params.id}`]: { title: "게시글 상세", hasLogo: false,  hasBack: true },
    // 위와 같은 양식으로 추가하기
  }
});
