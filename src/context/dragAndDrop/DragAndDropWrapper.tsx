// "use client";
import React, { ReactElement, useContext, useState } from "react";
import { v4 } from "uuid";
import { EditorBtns, EditorElement, useEditor } from "../Editor/EditorProvider";
import DragandDropContext, {
  DragAndDropContextProps,
} from "./DragAndDropContext";
import { DragableElementType, containerElements } from "@/utils/constants";
import { useSettings } from "../Settings/SettingsProvider";

type ContextWrapperProps = {
  children: React.ReactNode;
};

// type StackedComponent = {
//   type: "Component" | "Default" | "Structure";
//   code: ReactNode;
//   id: string;
// };
const myComponent: ReactElement = (
  <div className=" 4xl:bg-black sc flex min-h-[40rem] w-full flex-col items-center justify-center sm:bg-green-600 md:flex-row">
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-16 md:w-[60%] md:items-start">
      <h1 className="text-4xl font-bold text-aui_text">
        Welcome to the world of Atlantic UI
      </h1>
      <h2 className="text-lg font-medium text-aui_text_secondary">
        One stop destination to build Tailwind styled components instantly. A
        Developer first model that provides the root customizability to cater
        all your needs.
      </h2>
      <button className="h-12 w-40 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
        Explore Now
      </button>
    </div>
    <div className="flex h-full w-full items-center justify-center md:w-[40%]">
      <img
        src="https://s.cafebazaar.ir/images/upload/screenshot/com.izanaki.itachi.blackwallpapers-screenshots-2.jpg"
        alt="Demo"
        className="w-[16rem] rounded-3xl object-contain"
      />
    </div>
  </div>
);

function isIntrinsicElementType(
  element: string | React.JSXElementConstructor<any>,
): keyof JSX.IntrinsicElements | React.ComponentType<any> | "unknown" {
  if (typeof element === "string") {
    return element as keyof JSX.IntrinsicElements;
  } else {
    return "unknown";
  }
}

const DragAndDropWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [componentData, setComponentData] =
    useState<DragableElementType | null>(null);

  const { state, dispatch } = useEditor();
  const { settingsState } = useSettings();

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
      console.log(JSON.stringify(component));

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
            JSXElementToTree({ component: child as ReactElement }),
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
    component: ReactElement,
  ) => {
    console.log("onComponentData ::::::: ", componentType, component);

    const myval: EditorElement = JSXElementToTree({ component: component });
    if (componentType === "component")
      setComponentData({
        elementType: "component",
        elementData: myval,
        elementStatus: "add",
      });

    console.log("+++++++++++++++++++", myval);
  };

  // const onDrop = () => {};

  const onDrop = (
    e: React.DragEvent,
    tag: string | "unknown" | null,
    parentId: string,
  ) => {
    if (settingsState.previewMode === true) return;
    e.stopPropagation();
    console.log("DRAG END ", tag, parentId, componentData);
    const insertIndex = handlePositionDetection(parentId, e);
    if (componentData && componentData.elementStatus === "add") {
      ElementAdditionAfterDrop(tag, parentId);
    } else if (componentData && componentData.elementStatus === "replace") {
      ElementReplacementAfterDrop(tag, parentId);
    } else {
      return;
    }
  };

  const ElementAdditionAfterDrop = (
    tag: string | "unknown" | null,
    parentId: string,
  ) => {
    //Checking If the container is droppable
    var isContainer: boolean = false;
    if (tag !== undefined && tag !== null && tag !== "unknown") {
      for (var i = 0; i < containerElements.length; i++) {
        if (containerElements[i] === tag) {
          isContainer = true;
          break;
        }
      }
    }
    if (isContainer === false) return;

    //Addition Logic
    switch (componentData?.elementType) {
      case "component":
        if (componentData.elementData) {
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              containerId: parentId,
              elementDetails: componentData.elementData,
            },
          });
        }
        break;
      case "component_element":
        if (componentData.elementData) {
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              containerId: parentId,
              elementDetails: componentData.elementData,
            },
          });
        }
        break;
      default:
        null;
    }
    setComponentData(null);
  };

  const ElementReplacementAfterDrop = (
    tag: string | "unknown" | null,
    parentId: string,
  ) => {
    //Checking If the container is droppable
    var isContainer: boolean = false;
    if (tag !== undefined && tag !== null && tag !== "unknown") {
      for (var i = 0; i < containerElements.length; i++) {
        if (containerElements[i] === tag) {
          isContainer = true;
          break;
        }
      }
    }
    if (isContainer === false) return;

    //Removal logic

    if (!componentData?.elementData?.id) return;
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementId: componentData?.elementData?.id,
      },
    });

    //Addition Logic
    switch (componentData?.elementType) {
      case "component":
        if (componentData.elementData) {
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              containerId: parentId,
              elementDetails: componentData.elementData,
            },
          });
        }
        break;
    }
    setComponentData(null);
  };

  const handlePositionDetection = (
    parentId: string,
    e: React.DragEvent,
  ): number => {
    const ParentElem: EditorElement = reccursiveFinder(
      parentId,
      state.editor.elements,
    );

    // var positionIndex = -1
    // var aboveWhichElem = Infinity
    // var belowWhichElem = -1

    // for(var i = 0; i < ParentElem.content.length; i++){
    //   const { bottom, top } = ParentElem.content[i].elementRef?.current?.getBoundingClientRect();

    //   if(e.clientY  top)

    // }
    return -1;
  };

  const reccursiveFinder = (
    elemId: string,
    content: Array<EditorElement>,
  ): any => {
    for (const item of content) {
      if (item.id === elemId) {
        return item;
      }

      if (item.content && Array.isArray(item.content)) {
        const nestedResult = reccursiveFinder(elemId, item.content);
        if (nestedResult) {
          return nestedResult;
        }
      }
    }

    return null;
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const value: DragAndDropContextProps = {
    componentData,
    setComponentData,
    onComponentDrag,
    onDrag,
    onDrop,
    handleDragOver,
  };
  return (
    <DragandDropContext.Provider value={value}>
      {props.children}
    </DragandDropContext.Provider>
  );
};

export const useDragAndDrop = () => {
  const context = useContext(DragandDropContext);
  if (!context) {
    throw new Error(
      "useDragAndDrop Hook must be used within the DragAndDrop Provider",
    );
  }
  return context;
};

export default DragAndDropWrapper;
