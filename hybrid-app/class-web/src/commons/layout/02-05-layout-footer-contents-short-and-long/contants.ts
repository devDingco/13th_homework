export interface IHeaderOption {
  GLOBAL: {
    [key: string]: {
      title: string;
      hasLogo: boolean;
      hasBack: boolean;
      isTransparent?: boolean;
    };
  };
  LOCAL: {
    [key: string]: {
      title: string;
      hasLogo: boolean;
      hasBack: boolean;
      isTransparent?: boolean;
    };
  };
}

// prettier-ignore
export const HEADER_OPTIONS = (params: { id: string }) => ({
  GLOBAL: {
    "/section02/02-02-layout-header-global": {title: "게시글 수정",hasLogo: false, hasBack: true },
    "/section02/02-04-layout-header-transparent": {title: "사진 상세",hasLogo: false, hasBack: true, isTransparent: true },
    "/section02/02-04-layout-header-untransparent": {title: "게시글 등록",hasLogo: false, hasBack: true , isTransparent: false},
    "/section02/02-05-layout-footer-contents-short-and-long": {title: "게시글 등록",hasLogo: false, hasBack: true , isTransparent: false},
    // 위와 같은 양식으로 추가하기
  },
  LOCAL: {
    [`/section02/02-03-layout-header-local/${params.id}`]: { title: "게시글 상세", hasLogo: false,  hasBack: true },
    // 위와 같은 양식으로 추가하기
  }
} as IHeaderOption);
