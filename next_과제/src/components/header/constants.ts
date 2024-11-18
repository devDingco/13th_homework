// 메인 메뉴 설정
export const menuItems = [
  {
    label: "트립토크",
    icon: "triptalk",
    key: "/",
  },
  {
    label: "숙박권구매",
    icon: "store",
    key: "/products",
    children: [
      {
        label: "숙박권등록",
        key: "/products/new",
      },
    ],
  },
  {
    label: "마이페이지",
    icon: "mypage",
    key: "/mypage",
  },
  {
    label: "최근본상품",
    icon: "visibility",
  },
];

// 충전 금액 옵션
export const chargeOptions = [
  {
    value: "100",
    label: "100P",
  },
  {
    value: "500",
    label: "500P",
  },
  {
    value: "2000",
    label: "2,000P",
  },
  {
    value: "5000",
    label: "5,000P",
  },
  {
    value: "10000",
    label: "10,000P",
  },
  {
    value: "50000",
    label: "50,000P",
  },
];
