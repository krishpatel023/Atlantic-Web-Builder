"use client";
// import { Badge } from "@/components/ui/badge";
// import { EditorBtns, defaultStyles } from "@/lib/constants";
import {
  EditorElement,
  useEditor,
  EditorBtns,
  defaultStyles,
} from "@/context/Editor/EditorProvider";
import clsx from "clsx";
import React, { useContext } from "react";
import { v4 } from "uuid";
import Recursive from "./Recursive";
import { Trash } from "lucide-react";
import Selected from "../Selected";
import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();

  const { componentData, onDrop, handleDragOver } = useDragAndDrop();

  // const handleOnDrop = (e: React.DragEvent, type: string) => {
  //   e.stopPropagation();
  //   // const componentType = e.dataTransfer.getData("componentType") as EditorBtns;

  //   switch (componentData?.elementType) {
  //     case "component_element":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: componentData.elementData
  //         },
  //       });
  //       break;
  //     case "component":
  //       if (componentData?.elementData) {
  //         dispatch({
  //           type: "ADD_ELEMENT",
  //           payload: {
  //             containerId: id,
  //             elementDetails: {
  //               content: [componentData.elementData],
  //               id: v4(),
  //               name: "Component",
  //               styles: ["text-aui-primary"],
  //               type: "component",
  //               special: [],
  //             },
  //           },
  //         });
  //       }
  //       break;
  //   }
  // };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      className={`py-4 ${type === "__body" ? "min-h-full" : null}`}
      onDrop={(e: React.DragEvent) => {
        onDrop(e, "body", id);
      }}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
      //   onClick={handleOnClickBody}
      //   onDragStart={(e) => handleDragStart(e, "container")}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {/* {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash size={16} onClick={handleDeleteElement} />
          </div>
        )} */}
    </div>
  );
};

export default Container;
