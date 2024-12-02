import FooterButton from "@/commons/components/FooterButton/page";
import Footer from "@/commons/layout/footer";

export default function PlaceList() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center">등록된 플레이스가 없습니다.</div>
      <Footer>
        <FooterButton name="place" />
        <FooterButton name="my_page" />
      </Footer>
    </div>
  );
}
