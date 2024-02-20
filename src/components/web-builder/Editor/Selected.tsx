import { EditorElement } from "@/context/Editor/EditorProvider";
import { Trash } from "@phosphor-icons/react";
import clsx from "clsx";

type SelectedProps = React.PropsWithChildren<{
  className?: string;
  element: EditorElement;
  // [key: string]: any;
}>;
const Selected: React.FC<SelectedProps> = (props) => {
  return (
    <>
      {/* <div
        className={clsx("relative flex justify-between", {
          hidden: props.element.type === "__body",
        })}
      >
        <span className="px-4 h-6 rounded-t-lg bg-accent text-textComplementary flex justify-center items-center text-sm">
          {props.element.tag !== undefined &&
          typeof props.element.tag === "string"
            ? props.element.tag
            : props.element.name}
        </span>
        <button className="px-4 h-6 rounded-t-lg bg-accent text-textComplementary flex justify-center items-center">
          <Trash size={16} />
        </button>
      </div> */}
      {/* <div className="border-accent border-[1px]">{props.children}</div> */}
      {props.children}
    </>
  );
};

export default Selected;
