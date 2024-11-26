export const HEADER = {
  REGISTER: "플레이스 등록",
  EDIT: "플레이스 수정",
  DEFAULT: "플레이스",
} as const;

export const BUTTON = {
  LOG: "로그 등록",
  EDIT: "수정",
  LOCATION_EDIT: "이 위치로 수정",
  ADDRESS: "플레이스 주소 입력"
};

export const PLACE_HOLDER = (label: string) =>
  `플레이스 ${label}을 입력해 주세요. (1자 이상)`;

export const LABEL = (label: string) => `플레이스 ${label}`;
