import { EditorBtns, EditorElement } from "@/context/Editor/EditorProvider";
import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";
import React, { ReactElement, useContext } from "react";

type DragableProps = React.PropsWithChildren<{
  className?: string;
  componentType?: EditorBtns;
  componentDataJsx?: ReactElement;
  componentDataEditorElement?: EditorElement;
}>;

export const Dragable: React.FC<DragableProps> = (props) => {
  const { onDrag, onComponentDrag, setComponentData } = useDragAndDrop();

  const {
    className,
    children,
    componentType,
    componentDataJsx,
    componentDataEditorElement,
    ...rest
  } = props;

  const handleDragStart = (e: React.DragEvent) => {
    if (componentType !== undefined) {
      // onDrag(componentType, e);
      // console.log(componentData);

      if (componentDataJsx) {
        console.log("ELEM", componentDataJsx);

        onComponentDrag(componentType, e, componentDataJsx);
      } else if (componentDataEditorElement) {
        setComponentData({
          elementType: componentDataEditorElement.type,
          elementData: componentDataEditorElement,
          elementStatus: "add",
        });
      } else return;
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
