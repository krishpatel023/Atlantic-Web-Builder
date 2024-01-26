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
import SidebarForComponentsList from "@/components/SidebarForComponentsList";

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
        <>
          <div className="w-[15%] h-[calc(100vh-4rem)] fixed">
            <SidebarForComponentsList active={params.componentName} />
          </div>
          <div className="min-w-[15%]"></div>
          <div className="w-[85%] flex justify-between">
            <div className="w-[calc(100%-8rem)] flex flex-col items-center md:w-full py-6">
              <div className="w-[90%] flex flex-col gap-20">
                {variantsData.map((variant) => (
                  <Preview variant={variant} key={variant.id} />
                ))}
              </div>
            </div>
            <div className="md:hidden min-w-60 py-8 right-0"></div>
            <div className="md:hidden py-8 fixed right-0">
              <OnThisPage variantsData={variantsData} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
