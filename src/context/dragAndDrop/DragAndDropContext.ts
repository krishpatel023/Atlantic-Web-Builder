import React, { ReactElement } from "react";

// export type DragAndDropContextProps = {
//   onDrag: (element: { element: ReactElement }) => void;
//   onDrop: () => void;
// };
export type DragAndDropContextProps = {
  currentSelectedElement: Object | null;
  setCurrentSelectedElement: Function;
  onDrag: () => void;
  onDrop: () => void;
};

const DragAndDropContext = React.createContext<DragAndDropContextProps>({
  currentSelectedElement: {},
  setCurrentSelectedElement: () => {},
  onDrag: () => {},
  onDrop: () => {},
});

export default DragAndDropContext;
