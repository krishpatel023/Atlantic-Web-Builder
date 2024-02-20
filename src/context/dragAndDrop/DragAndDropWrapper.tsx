import React, { ReactElement, ReactNode, useState } from "react";
import DragandDropContext, {
  DragAndDropContextProps,
} from "./DragAndDropContext";
import { EditorBtns, EditorElement } from "../Editor/EditorProvider";
import Link from "next/link";
import Image from "next/image";
import { v4 } from "uuid";

type ContextWrapperProps = {
  children: React.ReactNode;
};

// type StackedComponent = {
//   type: "Component" | "Default" | "Structure";
//   code: ReactNode;
//   id: string;
// };
const myComponent: ReactElement = (
  <div className="w-full h-[40rem] bg-aui_primary flex items-center justify-center">
    <div className="w-[60%] h-full flex flex-col justify-center items-start gap-6 px-16">
      <h1 className="font-bold text-4xl text-aui_text">
        Welcome to the world of Atlantic UI
      </h1>
      <h2 className="font-medium text-lg text-aui_text_secondary">
        One stop destination to build Tailwind styled components instantly. A
        Developer first model that provides the root customizability to cater
        all your needs.
      </h2>
      <button className="w-40 h-12 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
        Explore Now
      </button>
    </div>
    <div className="w-[40%] h-full flex justify-center items-center">
      <img
        src="https://s.cafebazaar.ir/images/upload/screenshot/com.izanaki.itachi.blackwallpapers-screenshots-2.jpg"
        alt="Demo"
        className="w-[90%] h-[70%] object-contain rounded-3xl"
      />
    </div>
  </div>
);

function isIntrinsicElementType(
  element: string | React.JSXElementConstructor<any>
): keyof JSX.IntrinsicElements | React.ComponentType<any> | "unknown" {
  if (typeof element === "string") {
    return element as keyof JSX.IntrinsicElements;
  } else {
    return "unknown";
  }
}

const DragAndDropWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [componentData, setComponentData] = useState<EditorElement | null>(
    null
  );

  const onDrag = (componentType: EditorBtns, e: React.DragEvent) => {
    if (componentType) e.dataTransfer?.setData("componentType", componentType);
  };

  const JSXElementToTree = ({ component }: { component: ReactElement }) => {
    const tree: EditorElement = {
      content: [],
      id: v4(),
      name: "Component",
      styles: [],
      type: "component_element",
      special: [],
    };

    if (React.isValidElement(component)) {
      console.log(component);

      // WE WON't NEED THIS AFTER WE REMOVE THE NAME REQUIREMENT
      tree.name =
        typeof component.type === "string" ? component.type : "Unknown";

      tree.tag = isIntrinsicElementType(component.type);

      if (component.props) {
        const childrenDemo =
          typeof component.props === "object" && component.props !== null
            ? (component.props as Record<string, any>).children
            : undefined;

        const { className, children, ...rest } = component.props as {
          className?: string;
          children?: React.ReactNode;
        };
        tree.special = { ...tree.special, ...rest };

        //If className Exists it will push it to the styles
        className ? tree.styles.push(className) : null;

        // console.log(
        //   "ELEM:::::::",
        //   "TYPEOF CHILDREN:",
        //   typeof children,
        //   "NAME",
        //   tree.name,
        //   "TYPEOF COMPONENT.TYPE",
        //   typeof component.type,
        //   "COMPONENT",
        //   component
        // );

        if (
          React.Children.count(children) > 0 &&
          typeof children !== "string"
        ) {
          tree.content = React.Children.map(childrenDemo, (child) =>
            JSXElementToTree({ component: child as ReactElement })
          );
        } else {
          tree.name = "Text";
          tree.special = { ...tree.special, textData: children };
          // Store the text content or non-React content

          // FOR NEXT LINK
          // const isRenderPresent = component.type
          //   ? (component.type as Record<string, any>).render
          //   : undefined;

          // const isHref = component.props
          //   ? (component.props as Record<string, any>).href
          //   : undefined;

          // console.log(
          //   "ISRENDERED",
          //   isRenderPresent ? true : false,
          //   isHref,
          //   isRenderPresent?.name
          // );

          // if (
          //   isHref !== undefined &&
          //   isRenderPresent &&
          //   isRenderPresent?.name === "LinkComponent"
          // ) {
          //   tree.tag = "link";
          // }
        }
      }
    }
    return tree;
  };

  const onComponentDrag = (
    componentType: EditorBtns,
    e: React.DragEvent,
    component: React.FC
  ) => {
    const myval: EditorElement = JSXElementToTree({ component: myComponent });
    if (componentType === "component") setComponentData(myval);

    console.log("+++++++++++++++++++", myval);
  };

  const onDrop = () => {};

  const value: DragAndDropContextProps = {
    componentData,
    setComponentData,
    onComponentDrag,
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
