// 메인 메뉴 설정
export const menuItems = [
  {
    // label: <Link href="/">트립토크</Link>,
    label: "트립토크",
    key: "/",
  },
  {
    // label: <Link href="/products">숙박권구매</Link>,
    label: "숙박권구매",
    key: "/products",
    children: [
      {
        // label: <Link href="/products/new">숙박권등록</Link>,
        label: "숙박권등록",
        key: "/products/new",
      },
    ],
  },
  {
    // label: <Link href="/mypage">마이페이지</Link>,
    label: "마이페이지",
    key: "/mypage",
  },
  {
    label: "게시판 임시",
    key: "",
    children: [
      {
        label: "게시글리스트",
        key: "/boards",
      },
      {
        label: "게시글등록",
        key: "/boards/new",
      },
    ],
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
