import SolplaceLogsDetail from "@/components/solplace-logs-detail/detail";
import SolplaceLogsDetailImageSlider from "@/components/solplace-logs-detail/image-slider";

export default function LogsDetailPage() {
  return (
    <main>
      <SolplaceLogsDetailImageSlider />
      <SolplaceLogsDetail />
    </main>
  );
}
