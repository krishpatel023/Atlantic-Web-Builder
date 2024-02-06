import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import React, { useContext } from "react";

type DragableProps = React.PropsWithChildren<{
  className?: string;
  [key: string]: any;
}>;

export const Dragable: React.FC<DragableProps> = (props) => {
  const { onDrag } = useContext(DragAndDropContext);

  const { key, className, children, ...rest } = props;
  return (
    <div
      className={`${props.className}`}
      draggable
      onDragStart={onDrag}
      {...props.key}
      {...rest}
    >
      {props.children}
    </div>
  );
};
