interface IHeaderOption {
  GLOBAL: {
    [key: string]: {
      hasBack: boolean;
      title: string;
      hasTransparent: boolean;
    };
  };
}

export const HEADER_OPTION: IHeaderOption = {
  GLOBAL: {
    "/solplace-logs/new": {
      hasBack: true,
      title: "플레이스 등록",
      hasTransparent: false,
    },
  },
};
