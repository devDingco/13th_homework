import { IHeaderBaseProps } from "@/commons/layout/header";
interface IHeaderOption {
  GLOBAL: {
    [key: string]: IHeaderBaseProps;
  };
  LOCAL: {
    [key: string]: IHeaderBaseProps;
  };
}

// prettier-ignore
export const HEADER_OPTION = (params: { Id?: string }) => ({
  GLOBAL: {
    "/solplace-logs/new": { hasBack: true, title: "플레이스 등록", isTransparent: false },
    "/solplace-logs": { hasBack: false, title: "플레이스", isTransparent: false },
  },
  LOCAL:{
    [`/solplace-logs/${params.Id}`]: { hasBack: true, title: "", isTransparent: true },
    [`/solplace-logs/${params.Id}/edit`]: { hasBack: true, title: "플레이스 수정", isTransparent: false },
  }
} as IHeaderOption);
