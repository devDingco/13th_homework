import Footer from "@/components/layout/footer/Footer";
import FooterPlaceMypageButton from "@/components/solplace-logs-list/Footer-place-mypage-button";
import GridList from "@/components/solplace-logs-list/GridList";
import NewWritePlaceButton from "@/components/solplace-logs-list/New-write-place-button";

export default function ListPage() {
  return (
    <>
      <GridList />
      <NewWritePlaceButton />
      <Footer className="">
        <FooterPlaceMypageButton />
      </Footer>
    </>
  );
}
