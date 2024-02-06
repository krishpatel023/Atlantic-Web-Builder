"use client";
import { Dragable } from "@/components/DragAndDrop/Dragable";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
  components,
} from "@/package/React/data";
import { CaretDown, CaretUp, Eye } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Settings_Components() {
  const AllComponents = components;
  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="h-16 px-8 flex items-center border-b-2 border-border mb-6">
          <h1>Components</h1>
        </div>
        {components?.map((data, i) => (
          <Component componentName={data.name} key={i} />
        ))}
      </div>
    </>
  );
}

const Component = ({ componentName }: { componentName: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [variantsData, setVariantsData] = useState<Variants[] | null>(null);

  useEffect(() => {
    const DataObtained: Components | null = FindComponentData(componentName);

    if (DataObtained) {
      setVariantsData(FindVariantsOfAComponent(DataObtained?.variants));
    }
  }, [componentName]);

  console.log(variantsData);

  return (
    <>
      <div className="w-full transition-all duration-500">
        <button
          className="w-full h-10 flex justify-between px-4 items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {componentName}
          {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
        </button>
        <div
          className={clsx(
            "flex flex-col items-end pr-4 gap-4 mb-6",
            { hidden: isOpen === false },
            { block: isOpen === true }
          )}
        >
          {variantsData?.map((variant, i) => (
            <Dragable className="w-[90%] flex flex-col items-end">
              <div
                className="w-full bg-secondary min-h-8 rounded-lg px-4 py-2 flex items-center justify-between"
                key={i}
              >
                <h1>{variant.name}</h1>
                <a href={`/preview/${variant.id}`} target="_blank">
                  <Eye size={16} />
                </a>
              </div>
            </Dragable>
          ))}
        </div>
      </div>
    </>
  );
};
