import MyPageSubMenu from "@/components/mypage/mypage-menu/sub-menu";

export default function Layout({ children }) {
  return (
    <>
      <MyPageSubMenu />
      {children}
    </>
  );
}
