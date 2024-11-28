import DetailContents from "./DetailContents";
import DetailHeader from "./DetailHeader";

export default function DetailContainer() {
  return (
    <div className="pt-24 px-20">
      <DetailHeader />
      <DetailContents />
    </div>
  );
}
