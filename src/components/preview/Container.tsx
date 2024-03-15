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
import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  //   const { dispatch, state } = useEditor();

  //   const { componentData, onDrop, handleDragOver } = useDragAndDrop();

  return (
    <div className={`py-4 ${type === "__body" ? "min-h-full" : null}`}>
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default Container;
