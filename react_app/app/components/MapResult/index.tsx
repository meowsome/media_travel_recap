import React, { Suspense } from "react";

const MapResult = React.lazy(() => import("./MapResult"));

export default function Page({locations}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapResult locations={locations} />
    </Suspense>
  );
}