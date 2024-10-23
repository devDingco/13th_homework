import TableButtonMenu from "@/components/table-button-menu";

export default function Layout({ children }) {
  return (
    <>
      <TableButtonMenu
        menuList={[
          { name: "전체", link: "/mypage/point" },
          { name: "충전내역", link: "/mypage/point/charging-history" },
          { name: "구매내역", link: "/mypage/point/purchase-history" },
          { name: "판매내역", link: "/mypage/point/sales-history" },
        ]}
      />
      {children}
    </>
  );
}
