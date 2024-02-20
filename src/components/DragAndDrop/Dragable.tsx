import { EditorBtns } from "@/context/Editor/EditorProvider";
import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import React, { useContext } from "react";

type DragableProps = React.PropsWithChildren<{
  className?: string;
  componentType?: EditorBtns;
  componentData?: React.FC;
}>;

export const Dragable: React.FC<DragableProps> = (props) => {
  const { onDrag, onComponentDrag } = useContext(DragAndDropContext);

  const { className, children, componentType, componentData, ...rest } = props;

  const handleDragStart = (e: React.DragEvent) => {
    if (componentType !== undefined) {
      onDrag(componentType, e);
      console.log(componentData);

      if (componentData !== undefined)
        onComponentDrag(componentType, e, componentData);
    }
  };
  return (
    <div
      className={`${props.className}`}
      draggable
      onDragStart={(e) => {
        handleDragStart(e);
      }}
      // {...props.key}
      {...rest}
    >
      {props.children}
    </div>
  );
};
