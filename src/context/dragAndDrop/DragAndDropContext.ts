import React, { ReactElement } from "react";
import { EditorBtns, EditorElement } from "../Editor/EditorProvider";

// export type DragAndDropContextProps = {
//   onDrag: (element: { element: ReactElement }) => void;
//   onDrop: () => void;
// };
export type DragAndDropContextProps = {
  componentData: EditorElement | null;
  setComponentData: Function;
  onDrag: (componentType: EditorBtns, Event: React.DragEvent) => void;
  onComponentDrag: (
    componentType: EditorBtns,
    e: React.DragEvent,
    component: React.FC
  ) => void;
  onDrop: () => void;
};

const DragAndDropContext = React.createContext<DragAndDropContextProps>({
  componentData: {
    content: [],
    id: "",
    name: "Component",
    styles: [],
    type: "component",
    special: [],
    tag: "unknown",
  },
  setComponentData: () => {},
  onComponentDrag: () => {},
  onDrag: () => {},
  onDrop: () => {},
});

export default DragAndDropContext;
