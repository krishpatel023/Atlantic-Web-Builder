"use client";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
} from "@/package/React/data";
import { useEffect, useState } from "react";

export default function OnThisPage({ component }: { component: string }) {
  const [variantsData, setVariantsData] = useState<Variants[] | null>(null);

  useEffect(() => {
    const DataObtained: Components | null = FindComponentData(component);

    if (DataObtained) {
      setVariantsData(FindVariantsOfAComponent(DataObtained?.variants));
    }
  }, []);

  return (
    <div className="w-60">
      <h1>On this page</h1>
      <div>
        {variantsData?.map((variants, i) => (
          <span>{variants.name}</span>
        ))}
      </div>
    </div>
  );
}
