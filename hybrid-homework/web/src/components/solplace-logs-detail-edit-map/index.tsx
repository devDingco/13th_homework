"use client";

import AddressMap from "../commons/address-map";

export default function SolplaceLogsDetailEditMap() {
  const center = { lat: 37.5665, lng: 126.978 };

  return (
    <main>
      <AddressMap initialCenter={center} isEdit={true} />
    </main>
  );
}
