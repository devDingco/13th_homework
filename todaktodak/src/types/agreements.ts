export interface Agreement {
  id: number;
  label: string;
  required: boolean;
  content: string;
}

export const agreements = [
  {
    id: 1,
    label: "서비스 이용약관",
    required: true,
    content: "서비스 이용약관 상세 내용...",
  },
  {
    id: 2,
    label: "개인정보 처리방침",
    required: true,
    content: "개인정보 처리방침 상세 내용...",
  },
  {
    id: 3,
    label: "마케팅 정보 수신 동의",
    required: false,
    content: "마케팅 정보 수신 동의 상세 내용...",
  },
] as const;
