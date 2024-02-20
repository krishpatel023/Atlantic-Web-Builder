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

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();

  const { componentData } = useContext(DragAndDropContext);

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;

    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Text Element" },
              id: v4(),
              name: "Text",
              styles: ["text-aui-primary"],
              type: "text",
              special: [],
            },
          },
        });
        break;
      case "component":
        if (componentData) {
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              containerId: id,
              elementDetails: {
                content: [componentData],
                id: v4(),
                name: "Component",
                styles: ["text-aui-primary"],
                type: "component",
                special: [],
              },
            },
          });
        }
        break;
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  // const handleOnClickBody = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   dispatch({
  //     type: "CHANGE_CLICKED_ELEMENT",
  //     payload: {
  //       elementDetails: element,
  //     },
  //   });
  // };
  return (
    <Selected element={element}>
      <div
        className="py-4"
        onDrop={(e) => handleOnDrop(e, id)}
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
    </Selected>
  );
};

export default Container;
