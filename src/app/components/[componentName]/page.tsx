"use client";
import OnThisPage from "@/components/OnThisPage";
import Preview from "@/components/Preview";
import { useEffect, useState } from "react";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
} from "@/package/React/data";

export default function Components({
  params,
}: {
  params: { componentName: string };
}) {
  const [variantsData, setVariantsData] = useState<Variants[] | null>(null);

  useEffect(() => {
    const DataObtained: Components | null = FindComponentData(
      params.componentName
    );

    if (DataObtained) {
      setVariantsData(FindVariantsOfAComponent(DataObtained?.variants));
    }
  }, []);

  console.log(variantsData);

  return (
    <>
      {variantsData ? (
        <div className="w-[calc(100vw-15rem)] flex justify-between">
          <div className="w-[calc(100%-8rem)] flex flex-col items-center">
            <div className="w-[90%]">
              {variantsData.map((variant) => (
                <Preview variant={variant} key={variant.id} />
              ))}
            </div>
          </div>
          <div className="lg:block sm:hidden">
            <OnThisPage variantsData={variantsData} />
          </div>
        </div>
      ) : null}
    </>
  );
}
