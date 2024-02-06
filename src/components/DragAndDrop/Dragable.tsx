import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import React, { useContext } from "react";

type DragableProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Dragable: React.FC<DragableProps> = (props) => {
  const { onDrag } = useContext(DragAndDropContext);

  return (
    <div className={`${props.className}`} draggable onDragStart={onDrag}>
      {props.children}
    </div>
  );
};

const MyComponent = () => {
  return (
    <div className="w-full bg-black">
      <h1 className="font-bold">Hello</h1>
    </div>
  );
};
