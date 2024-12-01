import DetailContainer from "@/components/solplace-logs-detail/DetailContainer";
import ImageSlide from "@/components/solplace-logs-detail/ImageSlide";

export default function DetailPage() {
  return (
    <>
      {/* 이미지 */}
      <ImageSlide />
      {/* 상세 글들 */}
      <DetailContainer />
    </>
  );
}
