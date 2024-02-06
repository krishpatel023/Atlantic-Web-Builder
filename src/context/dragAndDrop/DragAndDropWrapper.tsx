import React, { ReactElement, ReactNode, useState } from "react";
import DragandDropContext, {
  DragAndDropContextProps,
} from "./DragAndDropContext";

type ContextWrapperProps = {
  children: React.ReactNode;
};

// type StackedComponent = {
//   type: "Component" | "Default" | "Structure";
//   code: ReactNode;
//   id: string;
// };

const DragAndDropWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [currentSelectedElement, setCurrentSelectedElement] =
    useState<Object | null>(null);

  const onDrag = () => {
    console.log("Hello");
  };

  const onDrop = () => {};

  const value: DragAndDropContextProps = {
    currentSelectedElement,
    setCurrentSelectedElement,
    onDrag,
    onDrop,
  };
  return (
    <DragandDropContext.Provider value={value}>
      {props.children}
    </DragandDropContext.Provider>
  );
};

export default DragAndDropWrapper;
