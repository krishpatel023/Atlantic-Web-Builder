import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import { useContext } from "react";

type DropableProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Dropable: React.FC<DropableProps> = (props) => {
  //   const { onDrag } = useContext(DragAndDropContext);

  const handleDrop = () => {
    console.log("Dropped");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      className={`${props.className}`}
      onDrop={() => handleDrop()}
      onDragOver={(e) => handleDragOver(e)}
    >
      {props.children}
    </div>
  );
};
