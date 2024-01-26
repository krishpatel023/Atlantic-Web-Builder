"use client";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
} from "@/package/React/data";
import { useEffect, useState } from "react";

export default function OnThisPage({
  variantsData,
}: {
  variantsData: Array<Variants>;
}) {
  // const [variantsData, setVariantsData] = useState<Variants[] | null>(null);

  // useEffect(() => {
  //   const DataObtained: Components | null = FindComponentData(component);

  //   if (DataObtained) {
  //     setVariantsData(FindVariantsOfAComponent(DataObtained?.variants));
  //   }
  // }, []);

  return (
    <div className="w-60">
      <h1 className="font-semibold">On this page</h1>
      <div className="mt-2 flex flex-col gap-1 border-l-[2px] border-gray-300">
        {variantsData?.map((variants, i) => (
          <span className="px-2" key={i}>
            {variants.name}
          </span>
        ))}
      </div>
    </div>
  );
}
