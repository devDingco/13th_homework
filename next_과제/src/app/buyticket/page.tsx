import MainSlide from "@/components/main-slide";
import AccommodationList from "@/components/accommodation-list";
import AccommodationRecommended from "@/components/accommodation-recommended";
import AccommodationLineBanner from "@/components/accommodation-line-banner";
import RecentViewProducts from "@/components/accommodation-recent";

export default function BuyTicketPage() {
  return (
    <>
      <MainSlide />
      <div className="mainContent">
        <div className="flex flex-col gap-12">
          <AccommodationRecommended />
          <AccommodationLineBanner />
          <AccommodationList />
        </div>
        <RecentViewProducts />
      </div>
    </>
  );
}
