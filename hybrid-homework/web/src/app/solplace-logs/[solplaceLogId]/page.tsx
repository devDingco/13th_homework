import SolplaceLogsDetail from "@/components/domains/solplace-logs-detail/detail";
import SolplaceLogsDetailImageSlider from "@/components/domains/solplace-logs-detail/image-slider";

export default function LogsDetailPage() {
  return (
    <main>
      <SolplaceLogsDetailImageSlider />
      <SolplaceLogsDetail />
    </main>
  );
}
