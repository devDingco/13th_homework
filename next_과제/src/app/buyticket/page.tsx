import MainSlide from "@/components/mainSlide";
import AccommodationList from "@/components/accommodation-list";
import AccommodationRecommended from "@/components/accommodation-recommended";
import LineBanner from "@/components/line-banner";

export default function BuyTicketPage() {
  return (
    <>
      <MainSlide />
      <div className="mainContent">
        <div className="flex flex-col gap-12">
          <AccommodationRecommended />
          <LineBanner />
          <AccommodationList />
        </div>
      </div>
    </>
  );
}
