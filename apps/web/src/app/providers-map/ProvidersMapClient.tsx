"use client";

import dynamic from "next/dynamic";

const ProvidersMap = dynamic(
  () => import("./ProvidersMap"),
  {
    ssr: false,
  }
);

export default ProvidersMap;