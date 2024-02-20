"use client";
import { Dragable } from "@/components/DragAndDrop/Dragable";
import { EditorBtns } from "@/context/Editor/EditorProvider";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
  components,
} from "@/package/React/data";
import {
  CaretDown,
  CaretUp,
  Eye,
  Icon,
  TextT,
  Video,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { ReactElement, useEffect, useState } from "react";
type SingleSetting = {
  name: string;
  icon: ReactElement;
  componentType: EditorBtns;
};
export default function Settings_Defaults() {
  const DefaultData: Array<SingleSetting> = [
    {
      name: "Text",
      icon: <TextT />,
      componentType: "text",
    },
    {
      name: "Video",
      icon: <Video />,
      componentType: "video",
    },
    {
      name: "Container",
      icon: <TextT />,
      componentType: "container",
    },
    {
      name: "Link",
      icon: <TextT />,
      componentType: "link",
    },
  ];
  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="h-16 px-8 flex items-center border-b-2 border-border mb-6">
          <h1>Defaults</h1>
        </div>
        {DefaultData?.map((data, i) => (
          <Component
            name={data.name}
            key={i}
            icon={data.icon}
            componentType={data.componentType}
          />
        ))}
      </div>
    </>
  );
}

const Component = ({ name, icon, componentType }: SingleSetting) => {
  return (
    <>
      <div className="w-full transition-all duration-500">
        <div className="flex flex-col items-center gap-4 mb-6">
          <Dragable
            className="w-[90%] flex flex-col items-end"
            componentType={componentType}
          >
            <div className="w-full bg-secondary min-h-8 rounded-lg px-4 py-2 flex items-center justify-start gap-4">
              {icon}
              <h1>{name}</h1>
            </div>
          </Dragable>
        </div>
      </div>
    </>
  );
};
