import AddressBottom from "../commons/address-bottom";
import AddressMap from "../commons/address-map";

export default function SolplaceLogsNewMap() {
  const center = { lat: 37.5665, lng: 126.978 };

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <AddressMap initialCenter={center} />
      <AddressBottom isEdit={false} />
    </main>
  );
}
